import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Base64 } from 'js-base64'

@observer
export default class Tools extends React.Component {
  @observable base64Encode = ''

  @action
  cleanBaseInputHandle = e => {
    this.$base64Ipt.value = this.base64Encode = ''
  }

  @action
  handleBase64Encode = e => {
    this.base64Encode = e.target.value.trim()
  }

  render () {
    return (
      <div className='tools-card'>
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
    )
  }
}
