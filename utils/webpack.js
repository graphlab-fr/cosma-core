const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

/**
 * @returns {Promise<webpack.StatsCompilation>}
 */

module.exports = {
  execute: function (mode) {
    const configWebpackProd = { ...webpackConfig, mode };

    return new Promise((resolve, reject) => {
      webpack(configWebpackProd, (err, stats) => {
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
      });
    });
  },
  startServer: function () {
    return new Promise(async (resolve, reject) => {
      const compiler = await webpack({ ...webpackConfig, mode: 'development' }),
        server = new webpackDevServer(webpackConfig.devServer, compiler);

      try {
        await server.start();
      } catch (error) {
        await server.stop();
        reject(error);
      }

      resolve(server);
    });
  },
};
