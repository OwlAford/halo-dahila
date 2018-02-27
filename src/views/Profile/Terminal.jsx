import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
// import dynamics from 'dynamics.js'
import { waiter } from '~/libs/tools'
import Payload from './Payload'
import './scss/terminal.scss'

@inject(stores => {
  const { home: { hobby } } = stores
  return {
    hobby
  }
})

@observer
export default class Terminal extends React.Component {
  @observable step = 0
  @observable menuSelected = null
  @observable applySelected = null
  @observable isFocus = false

  allowInput = false
  currentScreen = null

  setFocusState (state) {
    this.isFocus = state
  }

  isNumString (str) {
    return !isNaN(parseInt(str, 10))
  }

  isLetter (value) {
    const reg = /^[A-Za-z]*$/
    return reg.test(value) && value.length === 1
  }

  @action
  keyupHandle (e) {
    const hobbyData = this.props.hobby
    if (e.key === 'Enter') {
      if (this.step === 0) {
        this.step = 1
      } else if (this.step === 1 && this.menuSelected) {
        let cur = hobbyData.details[this.menuSelected - 1]
        if (cur) {
          this.menuSelected === '1' && this.triggerBall(this.menuSelected)
          this.applySelected = this.menuSelected
          this.currentScreen = cur
          this.step = 2
        } else {
          this.menuSelected = null
        }
      } else if (this.step === 2) {
        const isNum = this.isNumString(this.menuSelected)
        const exactSize = isNum && this.menuSelected * 1 <= hobbyData.list.length && this.menuSelected * 1 > 0
        if (exactSize) {
          this.step = 1
          this.currentScreen = null
          this.applySelected = null
        } else {
          this.step = 1
        }
        this.menuSelected = null
      }
      this.$textArea.value = ''
    } else if ((this.isNumString(e.key) || e.key === 'Backspace' || this.isLetter(e.key)) && this.step === 1) {
      this.menuSelected = this.$textArea.value.trim()
    }
  }

  async triggerBall () {
    const { $effect } = this
    const clientWidth = document.documentElement.clientWidth
    const $ball = document.createElement('div')
    $ball.className = 'soccer'
    $effect.appendChild($ball)

    dynamics.animate($ball, {
      translateY: 519
    }, {
      type: dynamics.gravity,
      duration: 3000,
      bounciness: 950,
      elasticity: 700
    })
    $ball.style.left = `${clientWidth + 160}px`
    await waiter(3000)
    $effect.removeChild($ball)
  }

  render () {
    const hobbyData = this.props.hobby
    const inputNum = () => {
      if (this.step === 1 && this.menuSelected) {
        return this.menuSelected
      } else {
        return null
      }
    }

    const cursor = () => (
      <i
        className={classNames({ 'cursor': true, 'flash': this.isFocus })}
        ref={node => { this.$cursor = node }}
      />
    )

    const next = () => <p key='continue'>请点击窗口按Enter键继续...{cursor()}</p>

    const inputNext = () => [
      <p className='gap' key='iptcontinue'>请输入您选择的数字Enter键继续：</p>,
      <p key='iptNum'>{inputNum()}{cursor()}</p>
    ]

    const prev = () => <p className='gap' key='back'>请按Enter键返回到菜单...{cursor()}</p>

    const renderTerminal = () => {
      if (this.step === 0) {
        return next()
      } else if (this.step === 1) {
        return [
          hobbyData.list.map((item, i) => {
            return (
              <p key={i}>{i + 1}. {item}</p>
            )
          }),
          inputNext()
        ]
      } else if (this.step === 2) {
        return [
          <p key='title' className='title'># {hobbyData.list[this.applySelected - 1]}</p>,
          this.currentScreen.map((item, i) => {
            return (
              <p key={i}>{item}</p>
            )
          }),
          prev()
        ]
      } else {
        return null
      }
    }

    return [
      <div className='profile-terminal' key='grid'>
        <h1>ABOUT ME / <span>everything about me</span></h1>
        <div className='terminal' key='terminal'>
          <div className='header'>
            <i />
            <i />
            <i />
          </div>
          <div className='content'>
            <div className='inner'>{renderTerminal()}</div>
            <textarea
              className='inputArea'
              name='user_input'
              ref={node => { this.$textArea = node }}
              onClick={e => this.setFocusState(true)}
              onBlur={e => this.setFocusState(false)}
              onKeyUp={e => this.keyupHandle(e)}
            />
          </div>
        </div>
      </div>,
      <div
        className='profile-effect'
        key='effect'
        ref={node => { this.$effect = node }}
      />,
      <Payload key='payload' option={this.applySelected} />
    ]
  }
}
