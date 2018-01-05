import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import classNames from 'classnames'
// import dynamics from 'dynamics.js'
import { waiter } from '~/libs/tools'
import Payload from './Payload'
import './scss/terminal.scss'

@observer
export default class Terminal extends React.Component {
  @observable step = 0
  @observable menuSelected = null
  @observable applySelected = null
  @observable isFocus = false

  allowInput = false
  currentScreen = null
  infoData = {
    list: [
      '⚽ 感兴趣和擅长的事情',
      '🎻 喜欢的音乐类型',
      '🍳 喜欢的食物',
      '🎥 喜欢的影视剧'
    ],
    details: [
      [
        '对视觉设计相关事物感兴趣，包括平面设计、插画、UI设计、用户体验设计',
        '对书法有浓烈兴趣，喜欢书法大家赵孟頫的作品',
        '业余喜欢摄影，水平不高，自娱自乐',
        '热爱维修，包括但不限于家电、电子设备、生活用具',
        '对编程有执着的热情，有代码强迫症，不能接受奇怪的变量命令和随意的缩进'
      ],
      [
        '个人音乐品味一般，听歌口味较杂，不特别热衷于某一风格',
        '喜欢日本摇滚乐队 X-Japan、芬兰摇滚乐队Nightwish',
        '也喜欢R&B曲风，比较喜欢的国语专辑有陶喆的《黑色柳丁》',
        '纯音乐比如班得瑞，闲暇时最爱听',
        '听歌主要目的就是愉悦身心'
      ],
      [
        '本人不是吃货，对美食并没有强烈的执念',
        '但是有个非常爱国的中国胃，吃不惯国外食物',
        '最喜欢的菜除了妈妈做的家常菜',
        '就要数烤鱼、香锅、烧烤',
        '晚上大排档撸个串，美滋滋'
      ],
      [
        '喜欢动作类、科幻类爆米花大片',
        '对宇宙类电影尤其感兴趣',
        '喜欢节奏简明欢快的日剧，场面宏大的美剧和制作精良的英剧',
        '偶尔也看肥皂剧、情景喜剧',
        '现在更爱上B站看影评短视频'
      ]
    ]
  }

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
    if (e.key === 'Enter') {
      if (this.step === 0) {
        this.step = 1
      } else if (this.step === 1 && this.menuSelected) {
        let cur = this.infoData.details[this.menuSelected - 1]
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
        const exactSize = isNum && this.menuSelected * 1 <= this.infoData.list.length && this.menuSelected * 1 > 0
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

    const next = () => <p key='continue'>请点击输入框按Enter键继续...{cursor()}</p>

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
          this.infoData.list.map((item, i) => {
            return (
              <p key={i}>{i + 1}. {item}</p>
            )
          }),
          inputNext()
        ]
      } else if (this.step === 2) {
        return [
          <p key='title' className='title'># {this.infoData.list[this.applySelected - 1]}</p>,
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
      <div className='profile-effect' key='effect' ref={node => { this.$effect = node }} />,
      <Payload key='payload' option={this.applySelected} />
    ]
  }
}
