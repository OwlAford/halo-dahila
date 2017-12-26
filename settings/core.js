const path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    lint: false,
    isMobile: false,
    assets: {
      root: path.join(__dirname, '../dist'),
      subDir: '',
      htmlFileName: 'index.html',
      cssDir: 'css',
      jsDir: 'js'
    },
    extJS: [
      'https://cdn.bootcss.com/es5-shim/4.5.10/es5-shim.min.js',
      'https://cdn.bootcss.com/es6-shim/0.35.3/es6-shim.min.js',
      'http://plug.qiniudn.com/TweenLite.min.js',
      'http://plug.qiniudn.com/EasePack.min.js'
    ],
    extCSS: [],
    jsHashType: 'chunkhash:8',
    cssHashType: 'contenthash:8',
    publicPath: '/halo/',
    projectName: 'HALO - Carpe Diem',
    sourceMap: false,
    gzip: false,
    gzipExtensions: ['js', 'css'],
    distServerPort: 3030,
    distServerPath: 'dist',
    checkVersions: true
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    isMobile: false,
    lint: true,
    port: 8080,
    openBrowser: true,
    assets: {
      subDir: ''
    },
    extJS: [
      'https://cdn.bootcss.com/es5-shim/4.5.10/es5-shim.min.js',
      'https://cdn.bootcss.com/es6-shim/0.35.3/es6-shim.min.js',
      'http://plug.qiniudn.com/TweenLite.min.js',
      'http://plug.qiniudn.com/EasePack.min.js'
    ],
    extCSS: [],
    publicPath: '/',
    projectName: 'HALO - Carpe Diem',
    checkVersions: true,
    proxyTable: {
      '/inmanage': {
        target: 'https://flameapp.cn',
        changeOrigin: true
      }
    }
  },
  test: {
    env: {
      NODE_ENV: '"testing"'
    },
    lint: false
  }
}
