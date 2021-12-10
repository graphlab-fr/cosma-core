/**
 * @file Generate the Cosmoscope's source code
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

const fs = require('fs')
    , path = require('path')
    , nunjucks = require('nunjucks')
    , mdIt = require('markdown-it')()
    , mdItAttr = require('markdown-it-attrs')
    , moment = require('moment')
    , yamlEditor = require('js-yaml');

// markdown-it plugin
mdIt.use(mdItAttr, {
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: []
});

const Graph = require('./graph');
const Config = require('./config');

const translation = yamlEditor.safeLoad(
    fs.readFileSync(path.join(__dirname, '../lang.yml'), 'utf8')
);

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
    
            const associatedMetas = file.links.find(function(i) {
                return i.target.id === link; });
    
            // link is not registred into file metas
            if (associatedMetas === undefined) { return extract; }
    
            link = associatedMetas;

            if (linkSymbol) { extract = linkSymbol; }
    
            // return '[[***]]' string into a Markdown link with openRecord function & class
            return `[${extract}](#${link.target.id}){title="${link.target.title}" onclick=openRecord(${link.target.id}) .record-link}`;
        });
    }

    static markLinkContext(file, fileLinks, linkSymbol) {
        return fileLinks.map((link) => {
            linkSymbol = linkSymbol || `[[${link.target.id}]]`;

            if (link.context === null) { return link; }

            link.context = link.context.replaceAll('[[' + link.target.id + ']]', `<mark>${linkSymbol}</mark>`);

            return link;
        });
    }

    /**
     * Get data from graph and make a web app
     * @param {object} graph - Graph class
     */

    constructor (graph) {
        this.config = new Config();

        this.types = {};
        this.tags = {};

        graph.files = graph.files.map((file) => {
            const linkSymbol = (this.config.opts.link_symbol || null);

            file.content = Template.convertLinks(file, file.content, linkSymbol);

            file.content = mdIt.render(file.content); // Markdown to HTML

            file.links = Template.markLinkContext(file, file.links, linkSymbol);

            file.backlinks = Template.markLinkContext(file, file.backlinks, linkSymbol);

            this.registerType(file.metas.type, file.metas.id);
            this.registerTags(file.metas.tags, file.metas.id);
            
            return file;
        });

        this.custom_css = null;

        if (this.config.opts.custom_css === true && this.config.opts['custom_css_path'] !== '') {
            this.custom_css = fs.readFileSync(this.config.opts['custom_css_path'], 'utf-8');
        }

        nunjucks.configure(path.join(__dirname, '../'), { autoescape: true });

        this.html = nunjucks.render('template.njk', {

            publishMode: (graph.params.includes('publish') === true),

            records: graph.files.map(function (file) {

                return {
                    id: file.metas.id,
                    title: file.metas.title,
                    type: file.metas.type,
                    tags: file.metas.tags.join(', '),
                    lastEditDate: file.metas.lastEditDate,
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
                title: this.config.opts.metas_title,
                author: this.config.opts.metas_author,
                description: this.config.opts.metas_description,
                keywords: this.config.opts.metas_keywords
            },

            focusIsActive: !(this.config.opts.focus_max <= 0),

            // stats

            nblinks: graph.data.links.length,

            date: moment().format()
        });

        // try {
        //     if (graph.params.includes('minify')) {
        //         const minify = require('html-minifier').minify;
        //         this.html = minify(this.html, { minifyCSS: true, minifyJS: true });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }

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