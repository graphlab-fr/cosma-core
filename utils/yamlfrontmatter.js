const yml = require('js-yaml');

// Thanks to https://github.com/dworthen/js-yaml-front-matter/blob/master/src/index.js
const regex = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/;

module.exports = {
  /**
   * Read head of markdown files as YAML content
   * Get result as JSON
   * @param {string} fileContent
   * @param {object} options https://github.com/nodeca/js-yaml#load-string---options-
   * @returns {{head: object, content: string}} JSON
   */

  read: function (fileContent, options = {}) {
    const [, withDash, withoutDash, content] = regex.exec(fileContent);

    let ymlResult = {};

    if (!!fileContent) {
      ymlResult = yml.load(withoutDash, options);
    }

    return {
      head: ymlResult,
      content,
    };
  },
};
