import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import './scss/index.scss'

@observer
export default class RobotGirl extends React.Component {
  @observable lookState = 'none'
  @observable pozLeft = window.innerWidth / 2
  @observable pozTop = window.innerHeight / 2

  couldDrap = false
  dragPozX = window.innerWidth / 2
  dragPozY = window.innerHeight / 2

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

    const coordX = e.clientX - this.pozLeft
    const coordY = this.pozTop - e.clientY
    let angle = Math.atan(coordY / coordX) / Math.PI * 180
    const gap = 22.5

    if (coordX < 0 && coordY > 0) {
      angle = 180 + angle
    } else if (coordX < 0 && coordY < 0) {
      angle = 180 + angle
    } else if (coordX > 0 && coordY < 0) {
      angle = 360 + angle
    }
    // console.log(angle)

    if (this.props.singing) {
      this.lookState = 'none'
      return
    }

    if (angle >= gap * 15 || angle < gap) {
      this.lookState = 'look-right'
    } else if (angle >= gap && angle < gap * 3) {
      this.lookState = 'look-up-right'
    } else if (angle >= gap * 3 && angle < gap * 5) {
      this.lookState = 'look-up'
    } else if (angle >= gap * 5 && angle < gap * 7) {
      this.lookState = 'look-up-left'
    } else if (angle >= gap * 7 && angle < gap * 9) {
      this.lookState = 'look-left'
    } else if (angle >= gap * 9 && angle < gap * 11) {
      this.lookState = 'look-down-left'
    } else if (angle >= gap * 11 && angle < gap * 13) {
      this.lookState = 'look-down'
    } else if (angle >= gap * 13 && angle < gap * 15) {
      this.lookState = 'look-down-right'
    } else {
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
          <div className={'hair ' + this.lookState} />
          <div className='clothes'>
            <div className='jumper' />
          </div>
          <div className={'neck ' + this.lookState} />
          <div className={'head ' + this.lookState} >
            <div className='bangs' />
            <div className='mouse' />
          </div>
        </div>
      </div>
    )
  }
}
