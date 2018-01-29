import React from 'react'
import classNames from 'classnames'
import Portal from '^/Portal'
import './scss/index.scss'

export default ({ type, children, style }) => (
  <Portal>
    <div
      className={classNames({
        'app-toast': true,
        'warning': type === 'warning'
      })}
      style={style || {}}
    >
      <div className='context'>{children}</div>
    </div>
  </Portal>
)
