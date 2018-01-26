import React from 'react'
import { observable, computed, action } from 'mobx'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import Toast from '^/Toast'
import WithToast from '^/WithToast'
import { initImage, downloadCanvasImage } from '~/libs/tools'
import './scss/board.scss'

@observer
@WithToast
export default class Board extends React.Component {
  @observable imgPath = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  @observable bgColor = null
  @observable beforeProgress = 9
  @observable currentProgress = 9
  @observable lineColor = '#000'
  @observable boxVisibility = false

  stack = []
  pointer = -1

  rWidth = 810
  rHeight = 420

  penPress = false
  progressPress = false
  progressStartPos = 0

  componentDidMount () {
    this.ctx = this.$canvas.getContext('2d')
    this.initStack()
    window.addEventListener('mouseup', this.ProgressDragEnd, false)
  }

  stackSave () {
    const canvas = this.$canvas
    const ctx = this.ctx
    const width = canvas.width
    const height = canvas.height
    if (this.pointer < this.stack.length - 1) {
      this.stack = this.stack.slice(0, this.pointer + 1)
    }
    this.pointer++
    this.stack.push([ctx.getImageData(0, 0, width, height), [width, height]])
  }

  setFrame (index) {
    const data = this.stack[index]
    this.$canvas.width = data[1][0]
    this.$canvas.height = data[1][1]
    this.ctx.putImageData(data[0], 0, 0)
  }

  stackBack () {
    if (this.pointer > 0) {
      this.pointer--
      this.setFrame(this.pointer)
    }
  }

  stackNext () {
    if (this.pointer < this.stack.length - 1) {
      this.pointer++
      this.setFrame(this.pointer)
    }
  }

  @computed
  get lineWidthPixel () {
    return ~~(this.currentProgress / 9)
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

  initStack () {
    this.stack = []
    this.pointer = -1
    this.stackSave()
  }

  clearCanvas () {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.rWidth, this.rHeight)
    this.$canvas.height = this.rHeight = 420
  }

  resetCanvas () {
    this.clearCanvas()
    this.initStack()
  }

  setCanvasBgColor (color) {
    const ctx = this.ctx
    ctx.fillStyle = this.bgColor = color
    ctx.fillRect(0, 0, this.rWidth, this.rHeight)
    this.stackSave()
  }

  setBgColor (color) {
    this.clearCanvas()
    this.setCanvasBgColor(color)
  }

  setLineColor (color) {
    this.lineColor = color
  }

  async getImageInfo () {
    this.clearCanvas()
    const img = this.$oimage
    const canvas = this.$canvas
    await initImage(img)
    const nWidth = img.naturalWidth
    const nHeight = img.naturalHeight

    const rWidth = this.rWidth = 810
    const rHeight = this.rHeight = nHeight * rWidth / nWidth
    canvas.height = rHeight
    this.ctx.drawImage(img, 0, 0, nWidth, nHeight, 0, 0, rWidth, rHeight)
    this.stackSave()
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
      this.showMessage('文件格式错误！', 2000)
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
    ctx.lineWidth = this.lineWidthPixel
    ctx.strokeStyle = this.lineColor
    const last = this.getPos(e)
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
  }

  drawing = e => {
    if (!this.penPress) {
      return
    }
    const ctx = this.ctx
    const poz = this.getPos(e)
    ctx.lineTo(poz.x, poz.y)
    ctx.lineCap = 'round'
    ctx.stroke()
    e.preventDefault()
  }

  endDraw = e => {
    this.penPress = false
    this.stackSave()
    e.preventDefault()
  }

  ProgressDragStart = e => {
    this.progressPress = true
    this.progressStartPos = e.pageX
  }

  ProgressDraging = e => {
    if (this.progressPress) {
      let dis = e.pageX - this.progressStartPos
      let newProg = this.beforeProgress + dis
      if (newProg < 0) {
        this.currentProgress = 9
      } else if (newProg > 180) {
        this.currentProgress = 180
      } else {
        this.currentProgress = newProg
      }
    }
  }

  downloadDraw () {
    downloadCanvasImage(this.$canvas, `qrcode-${Date.now()}.png`, 'image/png')
  }

  ProgressDragEnd = e => {
    this.progressPress = false
    this.beforeProgress = this.currentProgress
  }

  showProgressBox () {
    this.brushTimer && clearTimeout(this.brushTimer)
    this.boxVisibility = true
  }

  hideProgressBox (e) {
    this.brushTimer && clearTimeout(this.brushTimer)
    this.brushTimer = setTimeout(() => {
      this.boxVisibility = false
      clearTimeout(this.brushTimer)
    }, 300)
    e.stopPropagation()
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

    const brushColor = [
      '#fff',
      '#ccc',
      '#000',
      '#ff0000',
      '#ffff00',
      '#00ff00',
      '#00ffff',
      '#0000ff',
      '#ff00ff',
      '#009944',
      '#00a0e9',
      '#1d2088',
      '#e4007f'
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
              <div className='imgBg' title='点击上传背景图片'>
                <span className='iconfont'>&#xe61f;</span>
                <input
                  type='file'
                  onChange={this.pathHandle}
                  ref={node => { this.$path = node }}
                />
                {
                  this.showToast && <Toast>{this.toastMesg}</Toast>
                }
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
              <div
                className='brush'
                onMouseOver={e => { this.showProgressBox() }}
              >
                <span className='iconfont'>&#xe8b4;</span>
                <div
                  className={classNames({
                    'size-box': true,
                    'show': this.boxVisibility
                  })}
                  onMouseOut={e => { this.hideProgressBox(e) }}
                  onMouseMove={this.ProgressDraging}
                >
                  <div className='progress-bar'>
                    <div
                      className='inner'
                      style={{ width: `${this.currentProgress}px` }}
                    >
                      <i
                        className='dot'
                        onMouseDown={this.ProgressDragStart}
                      />
                    </div>
                  </div>
                  <div className='num'>{this.lineWidthPixel}px</div>
                </div>
              </div>
              {
                brushColor.map((e, i) => (
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
          <div
            className={classNames({
              'board-wrap': true,
              'thin': this.lineWidthPixel < 5
            })}
          >
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
          <div className='control-panel'>
            <button
              className='reset-btn'
              onClick={e => { this.resetCanvas() }}
            >
              清空重置
            </button>
            <button
              className='fn-btn bubbly-button'
              onClick={e => { this.stackBack() }}
            >
              上一步
            </button>
            <button
              className='fn-btn bubbly-button'
              onClick={e => { this.stackNext() }}
            >
              下一步
            </button>
            <button
              className='fn-btn bubbly-button'
              onClick={e => { this.downloadDraw() }}
            >
              下载
            </button>
          </div>
        </div>
      </div>
    )
  }
}
