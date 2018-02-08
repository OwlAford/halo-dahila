import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import './scss/avatar.scss'

@observer
export default class Avatar extends React.Component {
  @observable current = ''

  avatarList = [
    'woman',
    'man',
    'dog',
    'bear',
    'owl',
    'rabbit',
    'fox',
    'cat',
    'tree',
    'raccoon',
    'shark',
    'elk'
  ]

  @action
  clickHandle (item) {
    const { select } = this.props
    this.current = item
    select && select(item)
  }

  render () {
    return (
      <div className='chat-avatar'>
        {
          this.avatarList.map((item, i) => (
            <div
              key={i}
              className={classNames('avatar-wrap', {
                'active': this.current === item
              })}
            >
              <i
                alt={item}
                className={classNames('round-avatar', item, {
                  'active': this.current === item
                })}
                onClick={e => { this.clickHandle(item) }}
              />
              <i className='iconfont'>&#xe633;</i>
            </div>
          ))
        }
      </div>
    )
  }
}
