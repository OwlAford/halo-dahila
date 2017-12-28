import React from 'react'
import { withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import './scss/banner.scss'
import throttle from 'lodash/throttle'
import StackBlur from 'stackblur-canvas'
import { initImage } from '~/libs/tools'
import imageThumb from './images/bg-city-thumb.jpg'
import originImage from './images/bg-city.jpg'

@withRouter

@inject(stores => {
  return {
    isNearBottomHandle: state => stores.home.isNearBottomHandle(state),
    is2rdScreenHandle: state => stores.home.is2rdScreenHandle(state)
  }
})

@observer
class Banner extends React.Component {
  constructor (props) {
    super(props)
    this.scrollPage = this.scrollPage.bind(this)
  }

  componentWillMount () {
    this.clientH = document.documentElement.clientHeight
    this.clientW = document.documentElement.clientWidth
    window.addEventListener('resize', () => {
      this.props.history.push('/')
    })
  }

  scrollPage () {
    const docEl = document.documentElement
    const scrollTop = docEl.scrollTop || document.body.scrollTop
    let percent = (~~(scrollTop / this.clientH * 2 * 10000)) / 10000
    if (percent > 1) {
      percent = 1
    }

    scrollTop > this.clientH
      ? this.props.is2rdScreenHandle(true)
      : this.props.is2rdScreenHandle(false)

    scrollTop > this.clientH * 2
      ? this.props.isNearBottomHandle(true)
      : this.props.isNearBottomHandle(false)

    this.$thumbCanvas.style.opacity = percent
  }

  async componentDidMount () {
    const { $banner, $originImage, $imageThumb, $originCanvas, $thumbCanvas } = this

    const genSize = wh => {
      const origin = wh
      const view = [
        this.clientW,
        this.clientH
      ]
      const originRatio = origin[0] / origin[1]
      const viewRatio = view[0] / view[1]

      let clipPoz = [0, 0]
      let clipSize = [].concat(origin)

      if (originRatio > viewRatio) {
        clipSize[1] = origin[1]
        clipSize[0] = origin[1] * viewRatio
        clipPoz[1] = 0
        clipPoz[0] = (origin[0] - clipSize[0]) / 2
      } else {
        clipSize[0] = origin[0]
        clipSize[1] = origin[0] / viewRatio
        clipPoz[0] = 0
        clipPoz[1] = (origin[1] - clipSize[1]) / 2 * 0.3
      }

      return {
        origin,
        originRatio,
        view,
        viewRatio,
        clipPoz,
        clipSize
      }
    }

    const size = genSize([2048, 1365])
    const thumbSize = genSize([320, 213])

    const drawCanvas = (img, canvas, size) => {
      const view = size.view

      canvas.width = view[0]
      canvas.height = view[1]

      const ctx = canvas.getContext('2d')
      ctx.drawImage(
        img,

        size.clipPoz[0],
        size.clipPoz[1],

        size.clipSize[0],
        size.clipSize[1],

        0, 0,

        view[0],
        view[1]
      )
    }

    const fullCSS = `width: 100%; height: ${size.view[1]}px`
    $banner.style.cssText = fullCSS

    await initImage($imageThumb)
    drawCanvas($imageThumb, $thumbCanvas, thumbSize)
    StackBlur.canvasRGB($thumbCanvas, 0, 0, thumbSize.view[0], thumbSize.view[1], 20)

    await initImage($originImage)
    $thumbCanvas.style.opacity = 0
    $thumbCanvas.style.webkitTransition = $thumbCanvas.style.transition = 'opacity 30ms linear'
    drawCanvas($originImage, $originCanvas, size)

    this.optScroller = throttle(this.scrollPage, 30)
    window.addEventListener('scroll', this.optScroller, false)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.optScroller, false)
  }

  render () {
    return (
      <div className='home-banner' ref={node => { this.$banner = node }}>
        <canvas
          className='originCanvas'
          ref={node => { this.$originCanvas = node }}
        />
        <canvas
          className='thumbCanvas'
          ref={node => { this.$thumbCanvas = node }}
        />
        <img
          className='imageThumb'
          src={imageThumb}
          ref={node => { this.$imageThumb = node }}
        />
        <img
          className='originImage'
          src={originImage}
          ref={node => { this.$originImage = node }}
        />
      </div>
    )
  }
}

export default Banner
