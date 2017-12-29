import React from 'react'
import './scss/index.scss'

export default class Profile extends React.Component {
  componentDidMount () {
  }

  render () {
    return (
      <div className='home-profile gitfont'>
        <div className='service'>
          <h1>MY SERVICES / <span>what service I offer remotely</span></h1>
          <div className='grid'>
            <div className='cell'>
              <i className='iconfont'>&#xed6b;</i>
              <h2>Web Design</h2>
              <p>把情调和创意，融入交互和设计</p>
            </div>
            <div className='cell'>
              <i className='iconfont'>&#xe64c;</i>
              <h2>Development</h2>
              <p>以码为笔，让所有的想象成为现实</p>
            </div>
            <div className='cell'>
              <i className='iconfont'>&#xe607;</i>
              <h2>Photography</h2>
              <p>捕捉生活中每个闪光点，瞬间即永恒</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
