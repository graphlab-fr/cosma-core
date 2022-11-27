export default class View {
  static highlightedNodes = [];

  static focusMode = false;

  /** @type {string|number|undefined} */

  static openedRecordId = undefined;

  static position = { x: 0, y: 0, zoom: 1 };

  static reset() {
    console.log('reset view');
    // if (View.openedRecordId) { closeRecord(); }
    // zoomReset();
    // activeAllFilters();
    // if (focus.isActive) { focus.disable(); }
    // unactiveAllTags();
    // displayAllFromIndex();
    // unactiveLastView();
  }
}
