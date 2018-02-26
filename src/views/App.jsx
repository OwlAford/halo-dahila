import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import Efforts from './Efforts'
import '#/styles'

const App = () => (
  <div className='app-core'>
    <Switch>
      <Route
        path='/home'
        component={Home}
      />
      <Route
        path='/efforts'
        component={Efforts}
      />
      <Route component={() => <Redirect to='/home' />} />
    </Switch>
  </div>
)

export default App
