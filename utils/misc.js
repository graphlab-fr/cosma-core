const fs = require('fs')
    , path = require('path');

const fetch = require('node-fetch');
const axios = require('axios');

module.exports = {
    /**
     * @param {string} url 
     * @returns {Promise<string>}
     */

    fetchFileText: function(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    response.text()
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    },

    /**
     * @param {string} url
     * @param {string} pathTarget
     * @returns {Promise}
     */

    downloadFile: function (url, pathTarget) {
        return new Promise((resolve, reject) => {
            axios({
                url,
                responseType: 'stream'
            })
            .then(({ data }) => {
                data.pipe(fs.createWriteStream(pathTarget))
                    .on('finish', resolve)
                    .on('error', reject);
            })
            .catch(reject)
        })
    },

    /**
     * Verif by file extension and bytes that the image is valid
     * @param {string} imagePath
     * @returns {boolean}
     * ```
     * isAnImagePath(path.join(__basename, 'image.jpg'));
     * ```
     */

    isAnImagePath: function (imagePath) {
        if (fs.existsSync(imagePath) === false) {
            return false;
        }
        const validExtnames = new Set(['.jpg', '.jpeg', '.png']);
        const imageExtname = path.extname(imagePath);
        if (validExtnames.has(imageExtname) === false) {
            return false;
        }
        const imageFileContent = fs.readFileSync(imagePath);
        // read about this genious idea https://stackoverflow.com/a/67128272/13491646
        let validHexaSchema, imageHexaSchema;
        switch (imageExtname) {
            case '.jpg':
            case '.jpeg':
                validHexaSchema = 'ffd8';
                imageHexaSchema = Buffer.from(imageFileContent, 'hex').toString('hex', 0, 2)
                break;
            case '.png':
                validHexaSchema = '89504e47';
                imageHexaSchema = Buffer.from(imageFileContent, 'hex').toString('hex', 0, 4)
                break;
        }
        if (validHexaSchema !== imageHexaSchema) {
            return false;
        }
        return true;
    }
}