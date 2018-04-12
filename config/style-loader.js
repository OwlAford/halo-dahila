const packageConfig = require('../package.json')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

const styleLoader = (loader, options) => {
  options = options || {}

  let loaders = [{
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      minimize: isProduction,
      sourceMap: !isProduction
    }
  }, {
    loader: 'postcss-loader',
    options: {
      sourceMap: !isProduction,
      ident: 'postcss',
      plugins: loader => [
        require('postcss-import')({
          root: loader.resourcePath
        }),
        require('postcss-custom-properties')(),
        require('postcss-custom-media')(),
        require('postcss-media-minmax')(),
        require('postcss-custom-selectors')(),
        require('postcss-calc')(),
        require('postcss-nesting')(),
        require('postcss-nested')(),
        require('postcss-color-function')(),
        require('pleeease-filters')(),
        require('pixrem')(),
        require('postcss-selector-matches')(),
        require('postcss-selector-not')(),
        require('postcss-flexbugs-fixes')(),
        require('autoprefixer')({
          browsers: packageConfig.browserslist
        }),
        require('postcss-flexibility'),
        require('cssnano')({
          preset: 'advanced',
          reduceIdents: false,
          safe: true
        })
      ]
    }
  }]

  if (loader) {
    loaders.push({
      loader: loader,
      options: Object.assign({}, options, {
        sourceMap: !isProduction
      })
    })
  }

  if (isProduction) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'style-loader'
    })
  } else {
    return ['style-loader'].concat(loaders)
  }
}

module.exports = styleLoader
