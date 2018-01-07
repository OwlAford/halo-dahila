import React from 'react'
import { createPortal } from 'react-dom'
import { getBumper } from '^/Bumper'
import Profile from 'bundle-loader?lazy&name=profile!../Profile'
import Note from 'bundle-loader?lazy&name=note!../Note'
import { withRouter } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom'

@withRouter

export default class SubRoute extends React.Component {
  componentWillMount () {
    const $parent = this.$parent = document.getElementById('HOME_SUB_NODE')
    this.node = document.createElement('div')
    this.node.className = 'content-main'
    $parent.prepend(this.node)
  }

  componentWillUnmount () {
    this.$parent.removeChild(this.node)
  }

  render () {
    return createPortal(
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
      </Switch>,
      this.node
    )
  }
}
