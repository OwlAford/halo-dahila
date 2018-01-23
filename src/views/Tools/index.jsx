import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { Base64 } from 'js-base64'
import md5 from 'md5'
import QRCode from 'qrcode'
import Time from './Time'
import './scss/index.scss'

@observer
export default class Tools extends React.Component {
  @observable md5Encode = ''
  @observable base64Encode = ''
  @observable QRCodeString = ''

  genQRcode = e => {
    const url = this.QRCodeString = this.$qrcodeIpt.value.trim()
    url && QRCode.toCanvas(this.$qrcode, url, {
      width: 300,
      margin: 1
    })
  }

  downloadFile = e => {
    if (this.QRCodeString) {
      const content = this.$qrcode.toDataURL('image/png')
      const aLink = document.createElement('a')
      const blob = new Blob([content])
      aLink.download = `qrcode-${md5(this.QRCodeString)}.png`
      aLink.href = URL.createObjectURL(blob)
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
    }
  }

  @action
  cleanInputHandle = e => {
    this.$md5Ipt.value = this.md5Encode = ''
  }

  @action
  cleanBaseInputHandle = e => {
    this.$base64Ipt.value = this.base64Encode = ''
  }

  @action
  handleMD5Encode = e => {
    this.md5Encode = e.target.value.trim()
  }

  @action
  handleBase64Encode = e => {
    this.base64Encode = e.target.value.trim()
  }

  render () {
    return (
      <div className='home-tools'>
        <Time />
        <div className='row-double'>
          <div className='row-single'>
            <div className='tools-card narrow'>
              <div className='title'>
                <div className='inner'>
                  <i className='iconfont'>&#xebc7;</i>
                  <span>二维码生成</span>
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
                    placeholder='请输入二维码生成内容'
                  />
                  <button className='iconfont trans-btn' onClick={this.genQRcode}>&#xe653;</button>
                </div>
                <button
                  className={classNames({
                    'download-btn': true,
                    'disabled': !this.QRCodeString
                  })}
                  onClick={this.downloadFile}
                >
                  点击下载
                </button>
              </div>
            </div>
          </div>
          <div className='row-double wrap' style={{ width: '850px' }}>
            <div className='tools-card' style={{ height: '225px' }}>
              <div className='title'>
                <div className='inner'>
                  <i className='iconfont'>&#xe60e;</i>
                  <span>MD5在线加密</span>
                </div>
              </div>
              <div className='fn-area'>
                <div className='in-string'>
                  <input
                    type='text'
                    onChange={this.handleMD5Encode}
                    placeholder='请输入加密字符'
                    ref={node => { this.$md5Ipt = node }}
                  />
                  <button className='iconfont trans-btn' onClick={this.cleanInputHandle}>&#xe615;</button>
                </div>
                <div className='result'>
                  <textarea name='ecodeString' value={this.md5Encode ? md5(this.md5Encode) : ''} />
                </div>
              </div>
            </div>
            <div className='tools-card' style={{ height: '225px' }}>
              <div className='title'>
                <div className='inner'>
                  <i className='iconfont'>&#xe60e;</i>
                  <span>Base64在线加密</span>
                </div>
              </div>
              <div className='fn-area'>
                <div className='in-string'>
                  <input
                    type='text'
                    onChange={this.handleBase64Encode}
                    placeholder='请输入加密字符'
                    ref={node => { this.$base64Ipt = node }}
                  />
                  <button className='iconfont trans-btn' onClick={this.cleanBaseInputHandle}>&#xe615;</button>
                </div>
                <div className='result'>
                  <textarea name='ecodeString' value={Base64.encode(this.base64Encode)} />
                </div>
              </div>
            </div>
            <div className='tools-card full' style={{ height: '257px' }}>
              <div className='title'>
                <div className='inner'>
                  <i className='iconfont'>&#xe60e;</i>
                  <span>未来天气预测</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
