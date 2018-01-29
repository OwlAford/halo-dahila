import React from 'react'
import Time from './Time'
import QRCode from './QRCode'
import Repo from './Repo'
import MD5 from './MD5'
import Base64 from './Base64'
import Board from './Board'
import './scss/index.scss'

export default () => (
  <div className='home-tools'>
    <Time />
    <div className='row-double'>
      <div className='row-single'>
        <Repo />
        <QRCode />
      </div>
      <div className='row-double wrap' style={{ width: '850px' }}>
        <MD5 />
        <Base64 />
        <Board />
      </div>
    </div>
  </div>
)
