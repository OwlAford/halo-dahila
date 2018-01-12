import React from 'react'
import './scss/index.scss'

export default class LazyImage extends React.Component {
  img2base64 (img, cb) {
    const tmpImg = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const src = img.src

    tmpImg.crossOrigin = 'Anonymous'

    tmpImg.onload = function () {
      canvas.width = tmpImg.width
      canvas.height = tmpImg.height
      ctx.drawImage(tmpImg, 0, 0)
      img.src = canvas.toDataURL('image/png')
      img.onload = () => {
        cb && cb(img)
      }
    }
    tmpImg.src = src
    if (tmpImg.complete || tmpImg.complete === undefined) {
      tmpImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
      tmpImg.src = src
    }
  }

  getStyle (el, key) {
    const computedStyle = window.getComputedStyle(el)
    return parseFloat(computedStyle[key] || 0)
  }

  originLoaded () {
    this.$canvas.classList.add('hide')
  }

  componentDidMount () {
    this.img2base64(this.$thumb, img => {
      const wHeight = this.getStyle(this.$wrap, 'height')
      const wWidth = this.getStyle(this.$wrap, 'width')
      const nWidth = img.naturalWidth
      const nHeight = img.naturalHeight
      const ctx = this.$canvas.getContext('2d')
      this.$canvas.width = wWidth
      this.$canvas.height = wHeight
      ctx.drawImage(img, 0, 0, nWidth, nHeight, 0, 0, wWidth, wHeight)
      StackBlur.canvasRGB(this.$canvas, 0, 0, wWidth, wHeight, 20)
    })
  }

  render () {
    const { originImage, thumbImage, title } = this.props
    return (
      <div className='app-lazy-image' ref={node => { this.$wrap = node }}>
        <img
          src={originImage}
          alt={'origin-' + title}
          className='origin'
          ref={node => { this.$origin = node }}
          onLoad={e => { this.originLoaded() }}
        />
        <img
          src={thumbImage}
          alt={'thumb' + title}
          className='thumb'
          ref={node => { this.$thumb = node }}
        />
        <canvas
          className='thumb'
          ref={node => { this.$canvas = node }}
        />
      </div>
    )
  }
}
