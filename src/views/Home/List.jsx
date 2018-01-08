import React from 'react'
import classNames from 'classnames'
import './scss/list.scss'

export default class List extends React.Component {
  $items = []
  $canvas = []

  mouseoverHandle (i) {
    const $item = this.$items[i]
    $item.className = 'item in-right'
  }

  mouseoutHandle (i) {
    const $item = this.$items[i]
    $item.className = 'item out-right'
  }

  loadHandle (e, i) {
    const $img = e.target
    const $cav = this.$canvas[i]
    const ctx = $cav.getContext('2d')
    ctx.drawImage($img, 0, 0, 600, 600, 0, 0, 160, 160)
    StackBlur.canvasRGB($cav, 0, 0, 160, 160, 15)
  }

  render () {
    const { list, index, play, switchMusic, changeMode, readMode } = this.props
    return (
      <div
        className={
          classNames({
            'home-list': true,
            'hide': readMode
          })
        }
      >
        <div className='list-wrap'>
          {
            list.map((item, i) => (
              <div key={i} className='item-wrap'>
                <div
                  className='item'
                  ref={node => { this.$items[i] = node }}
                  onMouseOver={e => { this.mouseoverHandle(i) }}
                  onMouseLeave={e => { this.mouseoutHandle(i) }}
                >
                  <div className='album'>
                    <div className='cover'>
                      <img
                        src={item.cover}
                        alt={item.name}
                        crossOrigin='anonymous'
                        onLoad={e => { this.loadHandle(e, i) }}
                      />
                    </div>
                    <div className='title'>
                      <canvas width='160' height='160' ref={node => { this.$canvas[i] = node }} />
                      <div
                        className={classNames({
                          'iconfont': true,
                          'pause': index === i && play
                        })}
                        onClick={e => { switchMusic(i) }}
                      />
                    </div>
                  </div>
                </div>
                <div className='info'>
                  <div className='name'>{item.name}</div>
                  <div className='singer'>{item.singer}</div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='hideButton' onClick={e => { changeMode(true) }}>切换至阅读模式</div>
      </div>
    )
  }
}
