import React from 'react'
import { createPortal } from 'react-dom'

export default class RootPortal extends React.Component {
  componentWillMount () {
    this.node = document.createElement('div')
    document.body.appendChild(this.node)
  }

  componentWillUnmount () {
    document.body.removeChild(this.node)
  }

  render () {
    return createPortal(
      this.props.children,
      this.node
    )
  }
}
