/**
 * @file Define link pattern
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
     * @static
     */

    static validLinkStrokes = new Set(['simple', 'double', 'dotted', 'dash']);

    /**
     * @param {number} id
     * @param {string} type
     * @param {Shape} shape
     * @param {string | null} color
     * @param {number} source
     * @param {number} target
     */

    constructor(id, type, shape, color, source, target) {
        this.id = id;
        this.type = type;
        this.shape = shape;
        this.color = color;
        this.source = Number(source);
        this.target = Number(target);
    }
}