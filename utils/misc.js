const fetch = require('node-fetch');

module.exports = {
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
    }
}