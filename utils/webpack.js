const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

/**
 * @returns {Promise<webpack.StatsCompilation>}
 */

module.exports = {
    execute: function (mode) {
        const configWebpackProd = { ...webpackConfig, mode };

        return new Promise((resolve, reject) => {
            webpack(
                configWebpackProd,
                (err, stats) => {
                    if (!stats) {
                        return reject('Err. no infos');
                    }
    
                    const info = stats.toJson();
                    if (stats.hasErrors()) {
                        return reject(info.errors);
                    }
                    if (stats && stats.hasWarnings()) { 
                        return console.warn(info.warnings);
                    }
    
                    resolve(info);
                }
            );
        })
    }
}