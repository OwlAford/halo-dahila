import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import ProgressBar from '^/ProgressBar'

@observer
export default class TimeBar extends React.Component {
  @observable surplus = ''
  @observable distType = 'year'
  @observable currentPercent = 100
  @observable dayDistPercent = 100
  @observable MonthDistPercent = 100
  @observable yearDistPercent = 100

  dayDistHours = 0
  MonthDistDay = 0
  yearDistDay = 0

  @action
  setPercent (type) {
    this.distType = type
    if (type === 'year') {
      this.currentPercent = this.yearDistPercent
      this.surplus = `今年还剩 ${this.yearDistDay} 天`
    } else if (type === 'month') {
      this.currentPercent = this.MonthDistPercent
      this.surplus = `本月还剩 ${this.MonthDistDay} 天`
    } else {
      this.currentPercent = this.dayDistPercent
      this.surplus = `今日还剩 ${this.dayDistHours} 小时`
    }
  }

  componentWillMount () {
    const fullDayLong = 24 * 60 * 60 * 1000
    const curDate = new Date()
    const curYear = curDate.getFullYear()
    const curMonth = curDate.getMonth() + 1

    const intNum = num => num < 10 ? `0${num}` : num

    const firstDate = new Date(`${curYear}-01-01T00:00:00`)
    const endDate = new Date(`${curYear + 1}-01-01T00:00:00`)

    const monthFirstDate = new Date(`${curYear}-${intNum(curMonth)}-01T00:00:00`)
    const monthEndDate = new Date(`${curYear}-${intNum(curMonth + 1)}-01T00:00:00`)

    const fullYearDay = (endDate.getTime() - firstDate.getTime()) / fullDayLong
    const yearDistDay = ~~((endDate.getTime() - curDate.getTime()) / fullDayLong)

    const fullMonthDay = (monthEndDate.getTime() - monthFirstDate.getTime()) / fullDayLong
    const MonthDistDay = ~~((monthEndDate.getTime() - curDate.getTime()) / fullDayLong)

    const dayDistSecound = fullDayLong - (curDate.getTime() - (new Date(curDate.setHours(0, 0, 0, 0))).getTime())
    const dayDistHours = dayDistSecound / 60 / 60 / 1000

    this.dayDistHours = dayDistHours.toFixed(2)
    this.dayDistPercent = dayDistHours * 100 / 24

    this.yearDistDay = yearDistDay
    this.yearDistPercent = yearDistDay * 100 / fullYearDay

    this.MonthDistDay = MonthDistDay
    this.MonthDistPercent = MonthDistDay * 100 / fullMonthDay

    this.setPercent('hour')
  }

  render () {
    const { cname, cip } = window.returnCitySN

    const numGetColor = num => num > 30 ? num > 60 ? 'lime' : 'yellow' : 'red'

    return (
      <div className='tools-card dark'>
        <div className='title'>
          <div className='inner'>
            <i className='iconfont'>&#xe6e8;</i>
            <span>时间还剩多少</span>
            <span className='local'>{`(IP:${cip} ${cname})`}</span>
          </div>
          <div className='details'>{this.surplus}</div>
        </div>
        <ProgressBar color={numGetColor(this.currentPercent)} progress={this.currentPercent} />
        <div className='switch'>
          <div
            className={classNames('item-btn', {
              'active': this.distType === 'hour'
            })}
            onClick={e => { this.setPercent('hour') }}
          >
            今日剩余
          </div>
          <div
            className={classNames('item-btn', {
              'active': this.distType === 'month'
            })}
            onClick={e => { this.setPercent('month') }}
          >
            本月剩余
          </div>
          <div
            className={classNames('item-btn', {
              'active': this.distType === 'year'
            })}
            onClick={e => { this.setPercent('year') }}
          >
            今年剩余
          </div>
        </div>
      </div>
    )
  }
}
