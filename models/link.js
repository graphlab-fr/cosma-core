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
     * @param {number} id
     * @param {string} title
     * @param {string} type
     * @param {Shape} [shape = Link.baseShape]
     * @param {string | null} color
     * @param {number} source
     * @param {number} target
     */

    constructor(id, title, type, shape = Link.baseShape, color, source, target) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.shape = shape;
        this.color = color;
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