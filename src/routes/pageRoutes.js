import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../containers/Home'
import Income from '../containers/Income'
import Expense from '../containers/Expense'
import Investments from '../containers/Investments'
import BankAccount from '../containers/BankAccount'

const PageRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/income" component={Income}></Route>
      <Route path="/expense" component={Expense}></Route>
      <Route path="/investments" component={Investments}></Route>
      <Route path="/bankAccount" component={BankAccount}></Route>
    </Switch>
  )
}

export default PageRoutes;