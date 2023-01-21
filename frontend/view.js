/**
 * @typedef GraphPosition
 * @type {object}
 * @property {number} x
 * @property {number} y
 * @property {number} zoom
 */

class View {
  #openedRecordId = undefined;
  /** @type {GraphPosition} */
  #position = { x: 0, y: 0, zoom: 1 };
  #highlightedNodes = [];

  get openedRecordId() {
    return this.#openedRecordId;
  }

  set openedRecordId(n) {
    const recordElt = document.getElementById(n);
    if (!recordElt) {
      throw new Error('Record does not exist');
    }

    if (n === undefined) {
      document.body.dispatchEvent(new CustomEvent('recordClose'), {
        detail: { recordElt },
      });
      this.#openedRecordId = n;
      return;
    }

    this.#openedRecordId = n;
    document.body.dispatchEvent(
      new CustomEvent('recordChange', {
        detail: { openedRecordId: this.openedRecordId, recordElt },
      })
    );
  }

  get position() {
    return this.#position;
  }

  /** @param {GraphPosition} position */
  set position(position) {
    this.#position = position;
    document.body.dispatchEvent(
      new CustomEvent('graphPositionChange', {
        detail: { openedRecordId: this.position },
      })
    );
  }

  get highlightedNodes() {
    return this.#highlightedNodes;
  }

  set highlightedNodes(n) {
    this.#highlightedNodes = n;
  }
}

const currentView = new View();

export default currentView;
export { View };
