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

const Link = require('./link');
const Config = require('./config');

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
        return content.replace(/(\[\[\s*).*?(\]\])/g, function(extract) { // get '[[***]]' strings
            // extract link id, without '[[' & ']]' caracters
            let link = extract.slice(0, -2).slice(2);
    
            link = Link.normalizeLinks(link).target.id;
    
            if (link === NaN) { return extract; } // link is not a number

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
     * Get data from graph and make a web app
     * @param {Graph} graph - Graph class
     * @param {Bibliography} bibliography - Bibliography class
     * @param {string[]} params
     */

    constructor (graph, bibliography, params = []) {
        this.params = new Set(
            params.filter(param => Template.validParams.has(param))
        );
        this.config = new Config(graph.config.opts);
        const {
            lang,
            link_symbol: linkSymbol,
            views,
            title,
            author,
            description,
            keywords,
            focus_max: focusMax
        } = this.config.opts;

        this.types = {};
        this.tags = {};

        moment.locale(lang);

        const templateEngine = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path.join(__dirname, '../'))
        );

        templateEngine.addFilter('markdown', (input) => {
            return mdIt.render(input);
        })

        graph.records = graph.records.map((record) => {
            const { id, type, tags } = record;
            this.registerType(type, id);
            this.registerTags(tags, id);
            record.content = Template.convertLinks(record, record.content, linkSymbol || undefined);
            record.links = Template.markLinkContext(record.links, (link, idInContext) => idInContext === link.target.id);
            record.backlinks = Template.markLinkContext(record.backlinks, (link, idInContext) => idInContext === link.source.id);
            
            return record;
        });

        if (bibliography && bibliography.bibliographicRecords) {
            graph.records = graph.records.map((record) => {
                const { quotes, bibliography: footerBibliography } = bibliography.bibliographicRecords.find(({ idRecord }) => idRecord === record.id);
                record['bibliography'] = footerBibliography;
                for (const [markToReplace, { mark }] of Object.entries(quotes)) {
                    record.content = record.content.replaceAll(markToReplace, mark);
                }
                return record;
            });
        }

        this.custom_css = null;
        if (this.params.has('css_custom') === true && this.config.canCssCustom() === true) {
            this.custom_css = fs.readFileSync(this.config.opts['css_custom'], 'utf-8'); }

        this.html = templateEngine.render('template.njk', {

            publishMode: this.params.has('publish') === true,

            records: graph.records.map(function ({id, title, type, tags, content, links, backlinks, bibliography}) {
                return {
                    id,
                    title,
                    type,
                    tags,
                    lastEditDate: moment().format('LLLL'),
                    content,
                    links,
                    backlinks,
                    bibliography
                }
            }).sort(function (a, b) { return a.title.localeCompare(b.title); }),

            graph: {
                config: this.config.opts,
                data: JSON.stringify(graph.data),
                minValues: Config.minValues
            },

            translation: translation,
            lang: lang,

            colors: this.colors(),

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

            focusIsActive: !(focusMax <= 0),

            guiContext: (Config.getContext() === 'electron' && graph.params.has('publish') === false),

            // stats

            nblinks: graph.data.links.length,

            date: moment().format(),

            app: app // app version, description, license…
        });

    }
    
    registerType (fileTypes, fileId) {
        if (typeof fileTypes === 'string') {
            fileTypes = [fileTypes];
        }
        for (const fileType of fileTypes) {
            // create associate object key for type if not exist
            if (this.types[fileType] === undefined) {
                this.types[fileType] = []; }
            // push the file id into associate object key
            this.types[fileType].push(fileId);
        }
    }
    
    registerTags (recordTagList, recordId) {
        for (const tag of recordTagList) {
            // create associate object key for tag if not exist
            if (this.tags[tag] === undefined) {
                this.tags[tag] = []; }
            // push the record id into associate object key
            this.tags[tag].push(recordId);
        }
    }

    colors() {
        const replacementColor = 'grey';
        let types;
    
        const typesRecord = Object.keys(this.config.opts.record_types)
            .map(function(key) { return {prefix: 'n_', name: key, color: this.config.opts.record_types[key] || replacementColor}; }, this);
    
        const typesLinks = Object.keys(this.config.opts.link_types)
            .map(function(key) { return {prefix: 'l_', name: key, color: this.config.opts.link_types[key].color || replacementColor}; }, this);
    
        types = typesRecord.concat(typesLinks);
    
        // map the CSS syntax
    
        let colorsStyles = types
            .map(type => `.${type.prefix}${type.name} {color:var(--${type.prefix}${type.name}); fill:var(--${type.prefix}${type.name}); stroke:var(--${type.prefix}${type.name});}`, this)
    
        // add specifics parametered colors from config
        types.push({prefix: '', name: 'highlight', color: this.config.opts.graph_highlight_color});
    
        let globalsStyles = types.map(type => `--${type.prefix}${type.name}: ${type.color};`)
    
        globalsStyles = globalsStyles.join('\n'); // array to sting…
        colorsStyles = colorsStyles.join('\n'); // …by line breaks
    
        globalsStyles = ':root {\n' + globalsStyles + '\n}';
    
        return '\n' + globalsStyles + '\n\n' + colorsStyles;
    }

}