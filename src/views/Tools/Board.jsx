import React from 'react'
import { observable, action } from 'mobx'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { initImage } from '~/libs/tools'
import './scss/board.scss'

@observer
export default class Board extends React.Component {
  @observable imgPath = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  @observable bgColor = null
  @observable lineColor = '#00367C'
  @observable lineWidth = 1

  rWidth = 810
  rHeight = 420

  penPress = false
  last = null

  componentDidMount () {
    this.ctx = this.$canvas.getContext('2d')
  }

  getFileUrl () {
    let url
    if (navigator.userAgent.indexOf('MSIE') >= 1) {
      // IE
      url = this.$path.value
    } else if (navigator.userAgent.indexOf('Firefox') > 0) {
      // Firefox
      url = window.URL.createObjectURL(this.$path.files.item(0))
    } else if (navigator.userAgent.indexOf('Chrome') > 0) {
      // Chrome
      url = window.URL.createObjectURL(this.$path.files.item(0))
    }
    return url
  }

  clearCanvas () {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.rWidth, this.rHeight)
  }

  setCanvasBgColor (color) {
    const ctx = this.ctx
    ctx.fillStyle = this.bgColor = color
    ctx.fillRect(0, 0, this.rWidth, this.rHeight)
  }

  setBgColor (color) {
    this.clearCanvas()
    this.setCanvasBgColor(color)
  }

  setLineColor (color) {
    this.lineColor = color
  }

  async getImageInfo () {
    const img = this.$oimage
    const canvas = this.$canvas
    await initImage(img)
    const nWidth = img.naturalWidth
    const nHeight = img.naturalHeight

    const rWidth = this.rWidth = 810
    const rHeight = this.rHeight = nHeight * rWidth / nWidth
    canvas.height = rHeight
    this.clearCanvas()
    this.ctx.drawImage(img, 0, 0, nWidth, nHeight, 0, 0, rWidth, rHeight)
  }

  @action
  pathHandle = e => {
    const url = this.getFileUrl()
    const reg = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/
    if (reg.test(this.$path.value)) {
      this.imgPath = url
      this.getImageInfo()
    } else {
      this.$path.value = ''
      this.clearCanvas()
      console.log('文件格式错误！')
    }
  }

  getPos (event) {
    let x, y, ext
    ext = document.getElementById('musciBox').offsetHeight
    ext = ext || 72
    x = event.pageX - event.target.offsetLeft
    y = event.pageY - event.target.offsetTop - ext
    return { x, y }
  }

  startDraw = e => {
    this.penPress = true
    const ctx = this.ctx
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.lineColor
    this.last = this.getPos(e)
  }

  drawing = e => {
    if (!this.penPress) {
      return
    }
    const ctx = this.ctx
    const poz = this.getPos(e)
    const last = this.last
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(poz.x, poz.y)
    ctx.stroke()
    this.last = poz
    e.preventDefault()
  }

  endDraw = e => {
    this.penPress = false
    this.last = null
    e.preventDefault()
  }

  render () {
    const bgColor = [
      '#fff',
      '#eee',
      '#ccc',
      '#000',
      '#00367C',
      '#F48D00',
      '#940034',
      '#3CC6ED',
      '#FDCE83',
      '#FFBDC6'
    ]

    return (
      <div className='tools-card full'>
        <div className='title'>
          <div className='inner'>
            <i className='iconfont'>&#xed6b;</i>
            <span>画图板</span>
          </div>
        </div>
        <div className='draw-board'>
          <div className='panel'>
            <div className='group'>
              <div className='label'>背景</div>
              <div className='imgBg'>
                <span className='iconfont'>&#xe61f;</span>
                <input
                  type='file'
                  onChange={this.pathHandle}
                  ref={node => { this.$path = node }}
                />
              </div>
              {
                bgColor.map((e, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: e }}
                    className={classNames({
                      'bgDot': true,
                      'active': e === this.bgColor
                    })}
                    onClick={ev => { this.setBgColor(e) }}
                  />
                ))
              }
            </div>
            <div className='group'>
              <div className='label'>画笔</div>
              <div className='brush'>
                <span className='iconfont'>&#xe8b4;</span>
              </div>
              {
                bgColor.map((e, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: e }}
                    className={classNames({
                      'brushDot': true,
                      'active': e === this.lineColor
                    })}
                    onClick={ev => { this.setLineColor(e) }}
                  />
                ))
              }
            </div>
          </div>
          <div className='board-wrap'>
            <canvas
              ref={node => { this.$canvas = node }}
              width='810'
              height='420'
              onMouseDown={this.startDraw}
              onMouseMove={this.drawing}
              onMouseUp={this.endDraw}
            />
          </div>
          <img
            src={this.imgPath}
            className='origin-image'
            alt='draw-image'
            ref={node => { this.$oimage = node }}
          />
        </div>
      </div>
    )
  }
}
