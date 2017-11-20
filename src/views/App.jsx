import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { getBumper } from '^/Bumper'
import Home from './Home'
import Login from './Login'
import TodoList from 'bundle-loader?lazy&name=todolist!./TodoList'
import '#/styles'

const App = () => (
  <div className='app-core'>
    <Switch>
      <Route
        path='/home'
        component={Home}
      />
      <Route
        path='/login'
        component={Login}
      />
      <Route
        path='/todolist'
        component={getBumper(TodoList)}
      />
      <Route component={() => (<Redirect to='/home' />)} />
    </Switch>
  </div>
)

export default App
