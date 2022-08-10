/**
 * @file Define node pattern
 * @author Guillaume Brioudes <https://myllaume.fr/>
 * @copyright GNU GPL 3.0 ANR HyperOtlet
 */

module.exports = class Node {
    /**
     * @param {number} id
     * @param {string} label
     * @param {string} type
     * @param {number} size
     * @param {array} focus
     */

    constructor(id, label, type, size, focus) {
        this.id = Number(id);
        this.label = label;
        this.type = type;
        this.size = Number(size);
        this.focus = focus;
    }
}