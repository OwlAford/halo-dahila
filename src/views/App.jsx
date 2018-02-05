import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { getBumper } from '^/Bumper'
import Home from './Home'
import Efforts from 'bundle-loader?lazy&name=efforts!./Efforts'
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
        component={getBumper(Efforts)}
      />
      <Route component={() => <Redirect to='/home' />} />
    </Switch>
  </div>
)

export default App
