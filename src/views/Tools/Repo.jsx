import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { formatNumner } from '~/filters'
import { withToast } from '^/Toast'
import EmptyBox from '^/EmptyBox'

@inject(stores => {
  const {
    home: { starredDataList, starredGotten }
  } = stores

  return {
    starredGotten,
    starredDataList,
    getStarredDataList: cb => stores.home.getStarredDataList(cb)
  }
})

@observer
@withToast
export default class Repo extends React.Component {
  @observable repoData = ''

  @action
  componentDidMount () {
    this.scroll = new IScroll(this.refs.$repoList, {
      disableTouch: true,
      scrollbars: true,
      mouseWheel: true,
      fadeScrollbars: true
    })
    if (this.props.starredGotten) {
      return
    }
    NProgress.start()
    this.props.getStarredDataList(data => {
      NProgress.done()
    }, () => this.props.showMessage('数据获取失败！', 2000))
  }

  componentWillUnmount () {
    this.scroll.destroy()
  }

  componentDidUpdate () {
    this.scroll.refresh()
  }

  render () {
    const { starredDataList } = this.props
    const list = starredDataList || []
    return (
      <div className='tools-card narrow pb15'>
        <div className='title'>
          <div className='inner'>
            <i className='iconfont'>&#xe602;</i>
            <span>开源项目推荐</span>
          </div>
        </div>
        <div className='repo-list' ref='$repoList'>
          <div className='open-source-repo'>
            {
              list.length === 0
                ? <EmptyBox>
                  <span className='info'>暂无项目数据</span>
                </EmptyBox>
                : <table width='100%'>
                  <tbody>
                    {
                      list.map((item, i) => (
                        <tr className='item-row gitfont' key={i}>
                          <td>
                            <div className='name'>
                              <a href={item.html_url} target='_blank'>{item.full_name}</a>
                            </div>
                          </td>
                          <td className='star'>
                            <i className='iconfont'>&#xe611;</i>
                            <span>{formatNumner(item.stargazers_count)}</span>
                          </td>
                          <td className='forks'>
                            <i className='iconfont'>&#xe6c3;</i>
                            <span>{formatNumner(item.forks_count)}</span>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
            }
          </div>
        </div>
      </div>
    )
  }
}
