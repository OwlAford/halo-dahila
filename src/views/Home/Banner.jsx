import React from 'react'
import './scss/banner.scss'
import StackBlur from 'stackblur-canvas'
import { initImage, waiter } from '~/libs/tools'
import originImage from './images/bg.jpg'
import thumbImage from './images/bg-xs.jpg'

class Banner extends React.Component {
  componentWillMount () {
  }

  async componentDidMount () {
    const { $banner, $thumb, $thumbImage, $originImage, $origin } = this
    let size = {
      thumb: [480, 320],
      origin: [6720, 4480],
      view: [document.documentElement.clientWidth, document.documentElement.clientHeight]
    }

    if (size.view[0] / size.thumb[0] > size.view[1] / size.thumb[1]) {
      size.real = [size.view[0], size.view[0] * (size.thumb[1] / size.thumb[0])]
    } else {
      size.real = [size.view[1] * (size.thumb[0] / size.thumb[1]), size.view[1]]
    }

    const resizeW = size.real[0]
    const resizeH = size.real[1]
    const canvasStyle = `width: ${resizeW}px; height: ${resizeH}px; margin: -${resizeH / 2}px 0 0 -${resizeW / 2}px`

    $banner.style.height = `${size.view[1]}px`

    await initImage($thumbImage)
    StackBlur.image($thumbImage, $thumb, 10)
    $thumb.style.cssText = canvasStyle

    await initImage($originImage)
    const ctx = $origin.getContext('2d')
    $origin.width = resizeW
    $origin.height = resizeH
    $origin.style.cssText = canvasStyle
    ctx.drawImage($originImage, 0, 0, size.origin[0], size.origin[1], 0, 0, resizeW, resizeH)

    await waiter(300)
    $origin.style.opacity = 1
  }

  render () {
    return (
      <div className='home-banner' ref={node => { this.$banner = node }}>
        <canvas ref={node => { this.$thumb = node }} className='bgCanvas thumb' />
        <canvas ref={node => { this.$origin = node }} className='bgCanvas origin' />
        <img src={thumbImage} ref={node => { this.$thumbImage = node }} className='bgImg' />
        <img src={originImage} ref={node => { this.$originImage = node }} className='bgImg' />
      </div>
    )
  }
}

export default Banner
