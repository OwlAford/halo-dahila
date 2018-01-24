import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import ProgressBar from '^/ProgressBar'

@observer
export default class Time extends React.Component {
  @observable surplus = ''
  @observable distType = 'year'
  @observable currentPercent = 100

  dayDistHours = 0
  yearDistDay = 0
  dayDistPercent = 100
  yearDistPercent = 100

  @action
  setPercent (type) {
    this.distType = type
    if (type === 'year') {
      this.currentPercent = this.yearDistPercent
      this.surplus = `今年还剩 ${this.yearDistDay} 天`
    } else {
      this.currentPercent = this.dayDistPercent
      this.surplus = `今日还剩 ${this.dayDistHours} 小时`
    }
  }

  componentWillMount () {
    const fullDayLong = 24 * 60 * 60 * 1000
    const curDate = new Date()
    const curYear = curDate.getFullYear()
    const firstDate = new Date(`${curYear}-01-01T00:00:00`)
    const endDate = new Date(`${curYear + 1}-01-01T00:00:00`)
    const fullYearDay = (endDate.getTime() - firstDate.getTime()) / fullDayLong
    const yearDistDay = ~~((endDate.getTime() - curDate.getTime()) / fullDayLong)
    const dayDistSecound = fullDayLong - (curDate.getTime() - (new Date(curDate.setHours(0, 0, 0, 0))).getTime())
    const dayDistHours = dayDistSecound / 60 / 60 / 1000

    this.dayDistHours = dayDistHours.toFixed(2)
    this.dayDistPercent = dayDistHours * 100 / 24

    this.yearDistDay = yearDistDay
    this.yearDistPercent = yearDistDay * 100 / fullYearDay

    this.setPercent('year')
  }

  render () {
    const { cname, cip } = window.returnCitySN
    return (
      <div className='tools-card'>
        <div className='title'>
          <div className='inner'>
            <i className='iconfont'>&#xe6e8;</i>
            <span>时间还剩多少</span>
            <span className='local'>{`(IP:${cip} ${cname})`}</span>
          </div>
          <div className='details'>{this.surplus}</div>
        </div>
        <ProgressBar
          color={
            this.currentPercent > 50
              ? 'lime lighterGray-face'
              : this.currentPercent > 30
                ? 'cyan lighterGray-face'
                : 'red lighterGray-face'
          }
          progress={this.currentPercent}
        />
        <div className='switch'>
          <div
            className={classNames({
              'item-btn': true,
              'active': this.distType === 'year'
            })}
            onClick={e => { this.setPercent('year') }}
          >
            今年剩余
          </div>
          <div
            className={classNames({
              'item-btn': true,
              'active': this.distType === 'hour'
            })}
            onClick={e => { this.setPercent('hour') }}
          >
            今日剩余
          </div>
        </div>
      </div>
    )
  }
}
