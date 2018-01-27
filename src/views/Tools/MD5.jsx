import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import md5 from 'md5'

@observer
export default class MD5 extends React.Component {
  @observable md5Encode = ''

  @action
  cleanInputHandle = e => {
    this.$md5Ipt.value = this.md5Encode = ''
  }

  @action
  handleMD5Encode = e => {
    this.md5Encode = e.target.value.trim()
  }

  render () {
    return (
      <div className='tools-card'>
        <div className='title'>
          <div className='inner'>
            <i className='iconfont'>&#xe908;</i>
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
    )
  }
}
