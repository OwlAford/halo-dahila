const path = require('path')
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
        require('autoprefixer')({
          browsers: packageConfig.browserslist
        }),
        require('postcss-flexibility'),
        require('cssnano')({
          preset: 'advanced',
          reduceIdents: false
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
