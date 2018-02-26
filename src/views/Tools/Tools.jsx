import React from 'react'
import TimeBar from './TimeBar'
import QRCode from './QRCode'
import RepoStar from './RepoStar'
import MD5 from './MD5'
import Base64 from './Base64'
import Sketchpad from './Sketchpad'
import './scss/index.scss'

export default () => (
  <div className='home-tools'>
    <TimeBar />
    <div className='row-double'>
      <div className='row-single'>
        <RepoStar />
        <QRCode />
      </div>
      <div className='row-double wrap' style={{ width: '850px' }}>
        <MD5 />
        <Base64 />
        <Sketchpad />
      </div>
    </div>
  </div>
)
