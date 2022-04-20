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

const Graph = require('./graph');
const Config = require('./config');

const translation = require('./lang').i;

/**
 * Class to get the Cosmoscope source code
 */

module.exports = class Template {

    /**
     * Convert valid wikilinks text to Markdown hyperlinks
     * The content of the Markdown hyperlink is the link id or the linkSymbol if it is defined
     * The link is valid if it can be found from one file
     * For each link we get the type and the name from the targeted file
     * @param {object} file - File object from Graph class.
     * @param {string} linkSymbol - String from config option 'link_symbol'.
     * @return {object} - File with an updated content
     * @static
     */

    static convertLinks(file, content, linkSymbol) {
        return content.replace(/(\[\[\s*).*?(\]\])/g, function(extract) { // get '[[***]]' strings
            // extract link id, without '[[' & ']]' caracters
            let link = extract.slice(0, -2).slice(2);
    
            link = Graph.normalizeLinks(link).target.id;
    
            if (link === NaN) { return extract; } // link is not a number

            const associatedMetas = file.links.find(i => i.target.id === link);
    
            // link is not registred into file metas
            if (associatedMetas === undefined) { return extract; }
    
            link = associatedMetas;

            if (linkSymbol) { extract = linkSymbol; }
    
            // return '[[***]]' string into a Markdown link with openRecord function & class
            return `[${extract}](#${link.target.id}){title="${link.target.title}" onclick=openRecord(${link.target.id}) .record-link}`;
        });
    }

    /**
     * Match and transform links from context
     * @param {Array} fileLinks Array of link objets
     * @param {String} linkSymbol Symbol to remplace all context links
     * @param {Function} fxToHighlight Function return a boolean
     * @returns {String}
     */

    static markLinkContext(fileLinks, linkSymbol, fxToHighlight) {
        return fileLinks.map((link) => {
            console.log(link.target);
            link.context = link.context.replaceAll(/\[\[((\w:[0-9]{14})|([0-9]{14}))\]\]/g, (match) => {
                // extract link id, without '[[' & ']]' caracters
                const idInMatch = match.slice(0, -2).slice(2);

                const matchAsNumber = Graph.normalizeLinks(idInMatch).target.id;

                if (fxToHighlight(link, matchAsNumber) === true) {
                    return `*&#91;&#91;${linkSymbol || idInMatch}&#93;&#93;*{.id-context data-target-id=${idInMatch}}`
                }

                return linkSymbol || match;

            });

            return link;
        });
    }

    /**
     * Get data from graph and make a web app
     * @param {object} graph - Graph class
     */

    constructor (graph) {
        this.config = new Config(graph.config.opts);

        this.types = {};
        this.tags = {};

        moment.locale(this.config.opts.lang);

        const templateEngine = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path.join(__dirname, '../'))
        );

        templateEngine.addFilter('markdown', (input) => {
            return mdIt.render(input);
        })

        graph.files = graph.files.map((file) => {
            const linkSymbol = (this.config.opts.link_symbol || undefined);

            file.content = Template.convertLinks(file, file.content, linkSymbol);
            file.links = Template.markLinkContext(file.links, linkSymbol, (link, idInContext) => idInContext === link.target.id);
            file.backlinks = Template.markLinkContext(file.backlinks, linkSymbol, (link, idInContext) => idInContext === link.source.id);

            this.registerType(file.metas.type, file.metas.id);
            this.registerTags(file.metas.tags, file.metas.id);
            
            return file;
        });

        this.custom_css = null;
        if (graph.params.has('css_custom') === true && this.config.canCssCustom() === true) {
            this.custom_css = fs.readFileSync(this.config.opts['css_custom'], 'utf-8'); }

        this.html = templateEngine.render('template.njk', {

            publishMode: (graph.params.has('publish') === true),

            records: graph.files.map(function (file) {

                return {
                    id: file.metas.id,
                    title: file.metas.title,
                    type: file.metas.type,
                    tags: file.metas.tags.join(', '),
                    lastEditDate: moment(file.lastEditDate).format('LLLL'),
                    content: file.content,
                    links: file.links,
                    backlinks: file.backlinks,
                    bibliography: file.bibliography
                }
            }).sort(function (a, b) { return a.title.localeCompare(b.title); }),

            graph: {
                config: this.config.opts,
                data: JSON.stringify(graph.data),
                minValues: Config.minValues
            },

            translation: translation,
            lang: this.config.opts.lang,

            colors: this.colors(),

            customCss: this.custom_css,

            // from config

            views: this.config.opts.views || [],

            types: Object.keys(this.types).map(function(type) {
                return { name: type, nodes: this.types[type] };
            }, this),

            tags: Object.keys(this.tags).map(function(tag) {
                return { name: tag, nodes: this.tags[tag] };
            }, this).sort(function (a, b) { return a.name.localeCompare(b.name); }),

            usedQuoteRef: graph.getUsedCitationReferences(),

            metadata: {
                title: this.config.opts.title,
                author: this.config.opts.author,
                description: this.config.opts.description,
                keywords: this.config.opts.keywords
            },

            focusIsActive: !(this.config.opts.focus_max <= 0),

            guiContext: (Config.getContext() === 'electron' && graph.params.has('publish') === false),

            // stats

            nblinks: graph.data.links.length,

            date: moment().format(),

            app: app // app version, description, license…
        });

    }
    
    registerType (fileType, fileId) {
        // create associate object key for type if not exist
        if (this.types[fileType] === undefined) {
            this.types[fileType] = []; }
        // push the file id into associate object key
        this.types[fileType].push(fileId);
    }
    
    registerTags (fileTagList, fileId) {
        for (const tag of fileTagList) {
            // create associate object key for tag if not exist
            if (this.tags[tag] === undefined) {
                this.tags[tag] = []; }
            // push the file id into associate object key
            this.tags[tag].push(fileId);
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