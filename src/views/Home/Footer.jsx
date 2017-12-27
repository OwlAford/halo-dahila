import React from 'react'
import './scss/footer.scss'
import MultiWave from '~/libs/multiWave'

export default class Footer extends React.Component {
  componentDidMount () {
    this.$wave.style.width = document.documentElement.clientWidth + 'px'
    this.$wave.style.height = '200px'
    this.multiWave = new MultiWave(this.$wave, [{
      waveWidth: '20%',
      offsetX: '0%',
      waveHeight: '14%',
      waveColor: 'rgba(255, 255, 255, 0.08)',
      startFromTop: '80%',
      endFromTop: '80%',
      moveYStep: '0.6%',
      moveXStep: '0.4%',
      moveXDirection: 'right'
    }, {
      waveWidth: '40%',
      offsetX: '30%',
      waveHeight: '14%',
      waveColor: 'rgba(255, 255, 255, 0.09)',
      startFromTop: '80%',
      endFromTop: '80%',
      moveYStep: '0.6%',
      moveXStep: '0.3%'
    }, {
      waveWidth: '40%',
      offsetX: '80%',
      waveHeight: '14%',
      waveColor: 'rgba(255, 255, 255, 0.07)',
      startFromTop: '80%',
      endFromTop: '80%',
      moveYStep: '0.5%',
      moveXStep: '1%'
    }])
  }

  render () {
    return (
      <div className='home-footer'>
        <div className='wave' ref={node => { this.$wave = node }} />
        <div className='text'>
          <div className='social'>
            <a className='iconfont' href='https://www.twitter.com/Aford79872215' target='_blank'>&#xe638;</a>
            <a className='iconfont' href='https://www.instagram.com/owlaford' target='_blank'>&#xe61d;</a>
            <a className='iconfont' href='https://github.com/OwlAford' target='_blank'>&#xe602;</a>
          </div>
          <div className='slogan'>
            <span>If no necessary, not by entity. </span>
            <span className='author'>Author @Aford</span>
          </div>
        </div>
      </div>
    )
  }
}
