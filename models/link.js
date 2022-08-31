/**
 * @file Link (link in graph) pattern
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

/**
 * @typedef Shape
 * @type {object}
 * @property {'simple' | 'double' | 'dotted' | 'dash'} stroke Display as a title
 * @property {string | null} dashInterval Display as a body text
 */

module.exports = class Link {
    /**
     * List of valid values for the links stroke
     * Apply to config form
     * @type {Set}
     * @static
     */

    static validLinkStrokes = new Set(['simple', 'double', 'dotted', 'dash']);

    /** @type {Shape} */

    static baseShape = { stroke: 'simple', dashInterval: null };


    /**
     * @param {string} link
     * @returns {LinkNormalized | undefined}
     * @exemple
     * ```
     * normalizeLinks('20220813164349');
     * normalizeLinks('g:20220813164349');
     * ```
     */

    static normalizeLinks (link) {
        link = link.split(':', 2);

        if (link.length === 2) {
            const [type, id] = link;
            link = { type, target: {id: Number(id) } };
        } else {
            const [id] = link;
            link = { type: 'undefined', target: {id: Number(id) } };
        }
        if (isNaN(link.target.id)) {
            return undefined;
        }

        return link;
    }

    /**
     * @param {File.metas.id} fileId
     * @param {File.content} fileContent
     * @returns {Link[]}
     * @exemple
     * ```
     * getWikiLinksFromFileContent(1, "Lorem [[20210531145255]] ipsum")
     * ```
     */

    static getWikiLinksFromFileContent(fileId, fileContent) {
        /** @type {Link[]} */
        const links = [];
        const paraphs = fileContent.match(/[^\r\n]+((\r|\n|\r\n)[^\r\n]+)*/g);

        if (paraphs === null) { return []; }

        for (const paraph of paraphs) {
            // get links from their paragraph = their context
            let linksFromContent = new Set(paraph.match(/(?<=\[\[\s*).*?(?=\s*\]\])/gs));
            if (linksFromContent.size === 0) { continue; }
            linksFromContent = Array.from(linksFromContent);

            for (const linkFromContent of linksFromContent) {
                const linkNormalized = Link.normalizeLinks(linkFromContent);
                if (linkNormalized === undefined) { continue; }

                const { type, target } = linkNormalized;

                links.push(new Link(
                    undefined,
                    paraph,
                    type,
                    undefined,
                    undefined,
                    undefined,
                    fileId,
                    target.id
                ));
            } 
        }
        return links;
    }

    /**
     * 
     * @param {object} configOpts 
     * @param {string} linkType 
     * @returns {object}
     */

    static getLinkStyle (configOpts, linkType) {
        const linkTypeConfig = configOpts.link_types[linkType];
        let stroke, color;

        if (linkTypeConfig) {
            stroke = linkTypeConfig.stroke;
            color = linkTypeConfig.color;
        } else {
            stroke = 'simple';
            color = null;
        }

        switch (stroke) {
            case 'simple':
                return { shape: { stroke: stroke, dashInterval: null }, color: color };
                
            case 'double':
                return { shape: { stroke: stroke, dashInterval: null }, color: color };
    
            case 'dash':
                return { shape: { stroke: stroke, dashInterval: '4, 5' }, color: color };
    
            case 'dotted':
                return { shape: { stroke: stroke, dashInterval: '1, 3' }, color: color };
        }
    
        // default return
        return { shape: { stroke: 'simple', dashInterval: null }, color: color };
    }

    /**
     * @param {number} nodeId
     * @param {Link[]} links
     * @param {Node[]} nodes
     * @returns {Reference[]}
     * @static
     */

    static getReferencesFromLinks(nodeId, links, nodes) {
        const linksFromNodeReferences = links
            .filter(({ source }) => source === nodeId)
            .map(({ context, type, source: sourceId, target: targetId }) => {
                const nodeTarget = nodes.find(n => n.id === targetId);
                const nodeSource = nodes.find(n => n.id === sourceId);
                if (!nodeTarget || !nodeSource) { return undefined; }
                const { label: targetLabel, type: targetType } = nodeTarget;
                const { label: sourceLabel, type: sourceType } = nodeSource;
                return {
                    context,
                    type,
                    source: {
                        id: sourceId,
                        title: sourceLabel,
                        type: sourceType
                    },
                    target: {
                        id: targetId,
                        title: targetLabel,
                        type: targetType
                    }
                }
            })
            .filter(link => link !== undefined);
        const backlinksToNodeReferences = links
            .filter(({ target }) => target === nodeId)
            .map(({ context, type, source: sourceId, target: targetId }) => {
                const nodeTarget = nodes.find(n => n.id === targetId);
                const nodeSource = nodes.find(n => n.id === sourceId);
                if (!nodeTarget || !nodeSource) { return undefined;  }
                const { label: targetLabel, type: targetType } = nodeTarget;
                const { label: sourceLabel, type: sourceType } = nodeSource;
                return {
                    context,
                    type,
                    source: {
                        id: sourceId,
                        title: sourceLabel,
                        type: sourceType
                    },
                    target: {
                        id: targetId,
                        title: targetLabel,
                        type: targetType
                    }
                }
            })
            .filter(link => link !== undefined);
        return {
            linksReferences: linksFromNodeReferences,
            backlinksReferences: backlinksToNodeReferences
        }
    }

    /**
     * @param {Record[]} records
     * @returns {Link[]}
     */

    static getLinksFromRecords(records) {
        const linksFromRecord = [];
        let id = 0;
        for (const { links, config } of records) {
            const { opts } = config;
            for (const { context, type, source, target } of links) {
                const { shape, color } = Link.getLinkStyle(opts, type);
                linksFromRecord.push(new Link(
                    id,
                    context,
                    type,
                    shape,
                    color,
                    opts['graph_highlight_color'],
                    source.id,
                    target.id
                ));
                id++;
            }
        }
        return linksFromRecord;
    }

    /**
     * @param {number} id
     * @param {string} context
     * @param {string} type
     * @param {Shape} [shape = Link.baseShape]
     * @param {string} color
     * @param {string} colorHighlight
     * @param {number} source
     * @param {number} target
     */

    constructor(id, context, type, shape = Link.baseShape, color, colorHighlight, source, target) {
        this.id = id;
        this.context = context;
        this.type = type;
        this.shape = shape;
        this.color = color;
        this.colorHighlight = colorHighlight;
        this.source = Number(source);
        this.target = Number(target);

        this.report = [];
    }

    verif() {
        if (!this.title) { this.report.push('Invalid title'); }
        if (!this.shape || Link.validLinkStrokes.has(this.shape) === false) { this.report.push('Invalid shape'); }
        if (!this.source || isNaN(this.source)) { this.report.push('Invalid source'); }
        if (!this.target || isNaN(this.target)) { this.report.push('Invalid target'); }
    }

    /**
     * @returns {boolean}
     */

    isValid() {
        return this.report.length === 0;
    }
}