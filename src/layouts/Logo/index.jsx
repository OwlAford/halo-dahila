import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import './scss/index.scss'

export default ({ size, style, run }) => {
  const allStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundSize: `${size}px ${size}px`,
    ...style
  }
  return (
    <Link
      to='/home/profile'
      className={classNames({
        'app-logo': true,
        'running': run
      })}
      style={allStyle}
    />
  )
}
