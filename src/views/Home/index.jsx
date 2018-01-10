import React from 'react'
import Banner from './Banner'
import Music from './Music'
import Sub from './Sub'
import Toolbar from '~/layouts/Toolbar'
import './scss/content.scss'

export default () => (
  <div className='home'>
    <Banner />
    <div className='home-content'>
      <Music />
      <Sub />
    </div>
    <Toolbar />
  </div>
)
