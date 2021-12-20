const path = require('path')
const webpack = require('webpack');

module.exports = function override (config, env) {
  const wasmExtensionRegExp = /\.wasm$/
  config.module.rules.forEach(rule => {
    (rule.oneOf || []).forEach(oneOf => {
      if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
        oneOf.exclude.push(wasmExtensionRegExp)
      }
    })
  })

  config.module.rules.push({
    test: wasmExtensionRegExp,
    include: path.resolve(__dirname, 'src'),
    use: [{ loader: require.resolve('wasm-loader'), options: {} }]
  })

    config.resolve.extensions.push('.wasm');
    config.experiments = {
      asyncWebAssembly: false,
      lazyCompilation: true,
      syncWebAssembly: true,
      topLevelAwait: true,
    };
    config.resolve.fallback = {
        buffer: require.resolve('buffer/')
    }
    config.module.rules.forEach((rule) => {
        (rule.oneOf || []).forEach((oneOf) => {
            if (oneOf.type === "asset/resource") {
                oneOf.exclude.push(wasmExtensionRegExp);
            }
        });
    });
    config.plugins.push(new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }));


  return config
}

