import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import md5 from 'md5'
import QRCode from 'qrcode'
import { downloadCanvasImage } from '~/libs/tools'

@observer
export default class QRCodeComponent extends React.Component {
  @observable QRCodeString = ''

  @action
  genQRcode = e => {
    const url = this.$qrcodeIpt.value.trim()
    if (url) {
      QRCode.toCanvas(this.$qrcode, url, {
        width: 300,
        margin: 1
      }).then(() => {
        this.QRCodeString = url
      })
    }
  }

  downloadImage = e => {
    if (this.QRCodeString) {
      downloadCanvasImage(this.$qrcode, `qrcode-${md5(this.QRCodeString)}.png`, 'image/png')
    }
  }

  render () {
    return (
      <div className='tools-card narrow'>
        <div className='title'>
          <div className='inner'>
            <i className='iconfont'>&#xebc7;</i>
            <span>二维码生成器</span>
          </div>
        </div>
        <div className='canvas-wrap'>
          <canvas ref={node => { this.$qrcode = node }} width='300' height='300' />
        </div>
        <div className='fn-area'>
          <div className='in-string'>
            <input
              type='text'
              ref={node => { this.$qrcodeIpt = node }}
              placeholder='请输入二维码要生成的内容'
            />
            <button className='iconfont trans-btn' onClick={this.genQRcode}>&#xe653;</button>
          </div>
          <button
            className={classNames({
              'download-btn': true,
              'disabled': !this.QRCodeString
            })}
            ref={node => { this.$dwBtn = node }}
            onClick={this.downloadImage}
          >
            点击下载二维码
          </button>
        </div>
      </div>
    )
  }
}
