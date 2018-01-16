import React from 'react'
import { Link } from 'react-router-dom'
import './scss/index.scss'
import QRcode from './images/code.png'

export default class Efforts extends React.Component {
  componentWillMount () {
  }

  render () {
    return (
      <div className='home-efforts'>
        <div className='QRcode app-skew-shadow'>
          <img src={QRcode} alt='qrcode' />
          <div className='desc'>拿出手机扫一扫，获得完整体验</div>
        </div>
        <div className='phone'>
          <iframe
            src='http://amaze.qiniudn.com/starry/#/main/asset?validate=0'
            scrolling='no'
            frameBorder='0'
            width='100%'
            height='750'
          />
          <Link to='/home/profile' className='homeBtn' />
        </div>
      </div>
    )
  }
}
