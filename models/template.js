/**
 * @file Generate the Cosmoscope's source code
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const fs = require('fs')
    , path = require('path')
    , nunjucks = require('nunjucks')
    , mdIt = require('markdown-it')({
        html: true,
        linkify: true,
        breaks: true
    })
    , mdItAttr = require('markdown-it-attrs')
    , moment = require('moment');

const app = require('../package.json');

// markdown-it plugin
mdIt.use(mdItAttr, {
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: []
});

const Link = require('./link')
    , Config = require('./config')
    , Bibliography = require('./bibliography');

const { isAnImagePath } = require('../utils/misc');
const translation = require('./lang').i;

/**
 * Class to get the Cosmoscope source code
 */

module.exports = class Template {
    static validParams = new Set([
        'publish',
        'css_custom',
        'citeproc'
    ]);

    /**
     * Convert valid wikilinks text to Markdown hyperlinks
     * The content of the Markdown hyperlink is the link id or the linkSymbol if it is defined
     * The link is valid if it can be found from one record
     * For each link we get the type and the name from the targeted record
     * @param {object} record - File object from Graph class.
     * @param {string} linkSymbol - String from config option 'link_symbol'.
     * @return {object} - File with an updated content
     * @static
     */

    static convertLinks(record, content, linkSymbol) {
        return content.replace(/(\[\[\s*).*?(\]\])/g, function (extract) { // get '[[***]]' strings
            // extract link id, without '[[' & ']]' caracters
            let link = extract.slice(0, -2).slice(2);

            link = Link.normalizeLinks(link);

            if (link === undefined) {
                return extract;
            }

            link = link.target.id;

            // if (link === NaN) { return extract; } // link is not a number

            const associatedMetas = record.links.find(i => i.target.id === link);

            // link is not registred into record metas
            if (associatedMetas === undefined) { return extract; }

            link = associatedMetas;

            if (linkSymbol) { extract = linkSymbol; }

            // return '[[***]]' string into a Markdown link with openRecord function & class
            return `[${extract}](#${link.target.id}){title="${link.target.title}" onclick=openRecord(${link.target.id}) .record-link}`;
        });
    }

    /**
     * Match and transform links from context
     * @param {Array} recordLinks Array of link objets
     * @param {Function} fxToHighlight Function return a boolean
     * @returns {String}
     */

    static markLinkContext(recordLinks, fxToHighlight) {
        return recordLinks.map((link) => {
            link.context = link.context.replaceAll(/\[\[((\w:[0-9]{14})|([0-9]{14}))\]\]/g, (match) => {
                // extract link id, without '[[' & ']]' caracters
                const idInMatch = match.slice(0, -2).slice(2);

                const matchAsNumber = Link.normalizeLinks(idInMatch).target.id;

                if (fxToHighlight(link, matchAsNumber) === true) {
                    return `*&#91;&#91;${idInMatch}&#93;&#93;*{.id-context data-target-id=${idInMatch}}`
                }

                return match;

            });

            return link;
        });
    }

    /**
     * Convert a path to an image to the base64 encoding of the image source
     * @param {string} imgPath
     * @returns {string|boolean} False if error
     */


    static imagePathToBase64(imgPath) {
        if (isAnImagePath(imgPath) === false) { return ''; }
        const imgFileContent = fs.readFileSync(imgPath);
        const imgType = path.extname(imgPath).substring(1);
        const imgBase64 = Buffer.from(imgFileContent).toString('base64');
        return `data:image/${imgType};base64,${imgBase64}`;
    }

    /**
     * Update markdown-it image source, from a path to a base64 encoding
     * @param {string} imagesPath
     * @param {Function} state
     * @returns {String}
     * @exemple
     * ```
     * mdIt.inline.ruler2.push('image_to_base64', state => Template.mdItImageToBase64(imagesPath, state));
     * ```
     */

    static mdItImageToBase64(imagesPath, state) {
        for (let i = 0; i < state.tokens.length; i++) {
            const token = state.tokens[i];
            const { type, attrs } = token;
            if (type === 'image') {
                const { src, ...rest } = Object.fromEntries(attrs);
                const imgPath = path.join(imagesPath, src);
                const imgBase64 = Template.imagePathToBase64(imgPath);
                if (imgBase64) {
                    state.tokens[i].attrs = Object.entries({
                        src: imgBase64,
                        ...rest
                    })
                }
            }
        }
    }

    /**
     * Get data from graph and make a web app
     * @param {Graph} graph - Graph class
     * @param {string[]} params
     */

    constructor(graph, params = []) {
        this.params = new Set(
            params.filter(param => Template.validParams.has(param))
        );
        this.config = new Config(graph.config.opts);

        if (this.config.isValid() === false) {
            throw "Can not template : config invalid";
        }

        const {
            images_origin: imagesPath,
            css_custom: cssCustomPath,
            lang,
            link_symbol: linkSymbol,
            views,
            title,
            author,
            description,
            keywords,
            focus_max: focusMax,
            record_types: recordTypes
        } = this.config.opts;

        if (this.params.has('citeproc')) {
            const { bib, cslStyle, xmlLocal } = Bibliography.getBibliographicFilesFromConfig(this.config);
            const bibliography = new Bibliography(
                bib,
                cslStyle,
                xmlLocal
            );
            for (const record of graph.records) {
                record.replaceBibliographicText(bibliography);
            }
        }

        this.types = {};
        this.tags = {};
        const thumbnailsFromTypesRecords = Array.from(this.config.getTypesRecords())
            .filter(type => this.config.getFormatOfTypeRecord(type) === 'image')
            .map(type => {
                return {
                    name: recordTypes[type]['fill'],
                    path: path.join(imagesPath, recordTypes[type]['fill'])
                };
            })
        const thumbnailsFromRecords = graph.records
            .filter(({ thumbnail }) => typeof thumbnail === 'string')
            .map(({ thumbnail }) => {
                return {
                    name: thumbnail,
                    path: path.join(imagesPath, thumbnail)
                }
            });

        moment.locale(lang);

        const templateEngine = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path.join(__dirname, '../'))
        );

        mdIt.inline.ruler2.push('image_to_base64', state => Template.mdItImageToBase64(imagesPath, state));

        templateEngine.addFilter('markdown', (input) => {
            return mdIt.render(input);
        });
        templateEngine.addFilter('timestampToLocal', (input) => {
            return moment.unix(input).format('L');
        });
        templateEngine.addFilter('imgPathToBase64', Template.imagePathToBase64);

        graph.records = graph.records.map((record) => {
            const { id, type, tags } = record;
            this.registerType(type, id);
            this.registerTags(tags, id);
            record.content = Template.convertLinks(record, record.content, linkSymbol || undefined);
            record.links = Template.markLinkContext(record.links, (link, idInContext) => idInContext === link.target.id);
            record.backlinks = Template.markLinkContext(record.backlinks, (link, idInContext) => idInContext === link.source.id);

            return record;
        });

        this.custom_css = null;
        if (this.params.has('css_custom') === true && this.config.canCssCustom() === true) {
            this.custom_css = fs.readFileSync(cssCustomPath, 'utf-8');
        }

        this.html = templateEngine.render('template.njk', {

            publishMode: this.params.has('publish') === true,

            records: graph.records.map(({
                id,
                title,
                type,
                tags,
                content,
                metas,
                links,
                backlinks,
                bibliography,
                thumbnail
            }) => {
                return {
                    id,
                    title,
                    type,
                    tags,
                    lastEditDate: moment().format('LLLL'),
                    content,
                    metas,
                    links,
                    backlinks,
                    bibliography,
                    thumbnail: !!thumbnail ? path.join(imagesPath, thumbnail) : undefined
                }
            }).sort(function (a, b) { return a.title.localeCompare(b.title); }),

            graph: {
                config: this.config.opts,
                data: JSON.stringify(graph.data),
                minValues: Config.minValues
            },

            chronos: graph.chronos,

            translation: translation,
            lang: lang,

            customCss: this.custom_css,

            views: views || [],
            types: Object.entries(this.types).map(([type, nodesId]) => {
                return { name: type, nodes: nodesId };
            }),
            tags: Object.entries(this.tags)
                .filter(([tag, _]) => tag !== '')
                .map(([tag, nodesId]) => {
                    return { name: tag, nodes: nodesId };
                }),

            usedQuoteRef: undefined, //graph.getUsedCitationReferences(),

            metadata: {
                title,
                author,
                description,
                keywords
            },

            nodeThumbnails: [
                ...thumbnailsFromTypesRecords,
                ...thumbnailsFromRecords
            ].filter(({ path }) => isAnImagePath(path)),

            focusIsActive: !(focusMax <= 0),

            guiContext: (Config.getContext() === 'electron' && graph.params.has('publish') === false),

            faviconPath: path.join(__dirname, '../icons/cosmafavicon.png'),

            // stats

            nblinks: graph.data.links.length,

            date: moment().format(),

            app: app // app version, description, license…
        });

    }

    registerType(fileTypes, fileId) {
        if (typeof fileTypes === 'string') {
            fileTypes = [fileTypes];
        }
        for (const fileType of fileTypes) {
            // create associate object key for type if not exist
            if (this.types[fileType] === undefined) {
                this.types[fileType] = [];
            }
            // push the file id into associate object key
            this.types[fileType].push(fileId);
        }
    }

    registerTags(recordTagList, recordId) {
        for (const tag of recordTagList) {
            // create associate object key for tag if not exist
            if (this.tags[tag] === undefined) {
                this.tags[tag] = [];
            }
            // push the record id into associate object key
            this.tags[tag].push(recordId);
        }
    }
}