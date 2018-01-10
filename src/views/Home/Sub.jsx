import React from 'react'
import { withRouter } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import Footer from './Footer'
import { getBumper } from '^/Bumper'
import Profile from 'bundle-loader?lazy&name=profile!../Profile'
import Note from 'bundle-loader?lazy&name=note!../Note'

@withRouter

@inject(stores => {
  const { home: { scrollable } } = stores
  return {
    scrollable
  }
})

@observer
class Sub extends React.Component {
  componentWillMount () {
    const doc = document.documentElement
    this.clientH = doc.clientHeight
  }

  render () {
    return (
      <div
        className={classNames({
          'content-wrap': true,
          'scrollable': this.props.scrollable
        })}
        style={{
          minHeight: `${this.clientH}px`
        }}
      >
        <div className='content-main' key='content-main'>
          <Switch>
            <Route
              path='/home/profile'
              component={getBumper(Profile)}
            />
            <Route
              path='/home/note'
              component={getBumper(Note)}
            />
            <Route component={() => <Redirect to='/home/profile' />} />
          </Switch>
        </div>
        <Footer key='footer' />
      </div>
    )
  }
}

export default Sub
