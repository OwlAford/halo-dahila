import React from 'react'
import classNames from 'classnames'
import RootPortal from '^/RootPortal'
import './scss/index.scss'

export default ({ type, children, style }) => (
  <RootPortal>
    <div
      className={classNames({
        'app-toast': true,
        'warning': type === 'warning',
        'success': type === 'success'
      })}
      style={style || {}}
    >
      <div className='context'>{children}</div>
    </div>
  </RootPortal>
)
