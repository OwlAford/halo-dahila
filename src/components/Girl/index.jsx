import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import './scss/index.scss'

@observer
export default class Girl extends React.Component {
  @observable lookState = 'none'
  @observable pozLeft = window.innerWidth / 2
  @observable pozTop = window.innerHeight / 2

  couldDrap = false
  dragPozX = window.innerWidth / 2
  dragPozY = window.innerHeight / 2

  actions = {
    none: '',
    r: 'look-right',
    l: 'look-left',
    d: 'look-down',
    u: 'look-up',
    dr: 'look-down-right',
    dl: 'look-down-left',
    ur: 'look-up-right',
    ul: 'look-up-left'
  }

  componentWillMount () {
    this.moveHandle = e => {
      this.mouseMoveHandle(e)
      this.direction(e)
    }

    window.addEventListener('mousemove', this.moveHandle, false)
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.moveHandle)
  }

  mouseDownHandle (e) {
    this.startPozX = e.clientX
    this.startPozY = e.clientY
    this.couldDrap = true
  }

  mouseUpHandle () {
    this.dragPozX = this.pozLeft
    this.dragPozY = this.pozTop
    this.couldDrap = false
  }

  @action
  mouseMoveHandle (e) {
    if (this.couldDrap) {
      const distX = e.clientX - this.startPozX
      const distY = e.clientY - this.startPozY
      this.pozLeft = this.dragPozX + distX
      this.pozTop = this.dragPozY + distY
    }
  }

  @action
  direction (e) {
    if (this.couldDrap) {
      return
    }
    const cX = e.clientX
    const cY = e.clientY
    const iW = this.pozLeft * 2
    const iH = this.pozTop * 2

    if (this.props.singing) {
      this.lookState = 'none'
      return
    }

    // look left
    if (cX <= iW / 2) {
      this.lookState = 'l'
    }

    // look right
    if (cX >= (iW - (iW / 2))) {
      this.lookState = 'r'
    }
    // look down
    if (cY >= (iH - (iH / 2.5))) {
      this.lookState = 'd'
    }

    // look up
    if (cY <= ((iH / 2.5))) {
      this.lookState = 'u'
    }

    // look down right
    if (cY >= (iH - (iH / 2.5)) && cX >= (iW - (iW / 3))) {
      this.lookState = 'dr'
    }

    // look down left
    if (cY >= (iH - (iH / 2.5)) && cX <= iW / 3) {
      this.lookState = 'dl'
    }

    // look up right
    if (cY <= ((iH / 2.5)) && cX >= (iW - (iW / 3))) {
      this.lookState = 'ur'
    }

    // look up left
    if (cY <= ((iH / 2.5)) && cX <= iW / 3) {
      this.lookState = 'ul'
    }

    if (cX > iW / 3 && cX < (iW - (iW / 3)) && cY > iH / 2.5 && cY < (iH - (iH / 2.5))) {
      this.lookState = 'none'
    }
  }

  menuHandle (e) {
    const { contextMenuHandle } = this.props
    contextMenuHandle && contextMenuHandle(e, this.zoomHandle)
    e.preventDefault()
  }

  render () {
    let customStyle = this.props.style || {}

    let reduce = {
      transform: `scale(${this.props.zoom || 1})`
    }

    const poz = {
      left: this.pozLeft + 'px',
      top: this.pozTop + 'px',
      ...reduce,
      ...customStyle
    }

    return (
      <div
        className='girl-wrap'
        style={poz}
        onMouseDown={e => { this.mouseDownHandle(e) }}
        onMouseUp={e => { this.mouseUpHandle(e) }}
        onContextMenu={e => { this.menuHandle(e) }}
      >
        <div className={this.props.singing ? 'me sing' : 'me'}>
          <div className={'hair ' + this.actions[this.lookState]} />
          <div className='clothes'>
            <div className='jumper' />
          </div>
          <div className={'neck ' + this.actions[this.lookState]} />
          <div className={'head ' + this.actions[this.lookState]} >
            <div className='bangs' />
            <div className='mouse' />
          </div>
        </div>
      </div>
    )
  }
}
