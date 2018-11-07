import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Boards from './components/pages/Boards'
import Board from './components/pages/Board'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Boards} />
      <Route exact path="/board/:boardId" component={Board} />
    </Switch>
  </Router>
)

export default App
