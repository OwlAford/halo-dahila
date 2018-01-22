const path = require('path')
const str = s => JSON.stringify(s)

module.exports = {
  build: {
    env: {
      NODE_ENV: str('production')
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
      // 'https://cdn.bootcss.com/axios/0.17.1/axios.min.js',
      'https://cdn.wilddog.com/sdk/js/2.5.17/wilddog-sync.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
      'https://cdn.bootcss.com/stackblur-canvas/1.4.0/stackblur.min.js',
      'http://plug.qiniudn.com/TweenLite.min.js',
      'http://plug.qiniudn.com/EasePack.min.js',
      'https://cdn.bootcss.com/wavesurfer.js/2.0.0-beta01/wavesurfer.min.js',
      'https://cdn.bootcss.com/dynamics.js/1.1.5/dynamics.min.js',
      'http://pv.sohu.com/cityjson?ie=utf-8'
    ],
    extCSS: [
      'https://cdn.bootcss.com/normalize/7.0.0/normalize.min.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
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
      NODE_ENV: str('development')
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
      // 'https://cdn.bootcss.com/axios/0.17.1/axios.min.js',
      'https://cdn.wilddog.com/sdk/js/2.5.17/wilddog-sync.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
      'https://cdn.bootcss.com/stackblur-canvas/1.4.0/stackblur.min.js',
      'http://plug.qiniudn.com/TweenLite.min.js',
      'http://plug.qiniudn.com/EasePack.min.js',
      'https://cdn.bootcss.com/wavesurfer.js/2.0.0-beta01/wavesurfer.min.js',
      'https://cdn.bootcss.com/dynamics.js/1.1.5/dynamics.min.js',
      'http://pv.sohu.com/cityjson?ie=utf-8'
    ],
    extCSS: [
      'https://cdn.bootcss.com/normalize/7.0.0/normalize.min.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
    publicPath: '/',
    projectName: 'HALO - Carpe Diem',
    checkVersions: true,
    proxyTable: {
      // '/inmanage': {
      //   target: 'https://flameapp.cn',
      //   changeOrigin: true
      // },
      '/music': {
        target: 'http://yuis.qiniudn.com',
        changeOrigin: true
      }
    }
  },
  test: {
    env: {
      NODE_ENV: str('testing')
    },
    lint: false
  }
}
