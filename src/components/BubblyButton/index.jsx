import React from 'react'
import './scss/index.scss'

export default class BubblyButton extends React.Component {
  animateButton (e) {
    const { clickEvent } = this.props
    const $elClass = e.target.classList
    $elClass.remove('animate')
    $elClass.add('animate')
    this.clickTimer = setTimeout(() => {
      $elClass.remove('animate')
      clickEvent && clickEvent()
      clearTimeout(this.clickTimer)
    }, 800)
    e.preventDefault()
  }

  render () {
    return (
      <div
        className='app-bubbly-button'
        onClick={e => { this.animateButton(e) }}
      >
        {this.props.children}
      </div>
    )
  }
}
