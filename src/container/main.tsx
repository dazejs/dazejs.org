import { Layout } from 'antd';
import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import AppHeader from '../components/header';
import './app.less';
import Home from './home';
import Doc from './doc'
import FromContext from '../context/from'
import qs from 'qs'


export default function () {
  const location = useLocation()
  const [from] = useState(qs.parse(location.search, {
    ignoreQueryPrefix: true
  })?.from || 'dazejs')

  return (
    <FromContext.Provider value={{
      from
    }}>
      <Layout>
        <AppHeader />
        <Layout>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/docs/:name1/:name2?/:name3?'>
              <Doc />
            </Route>
          </Switch>
        </Layout>
      </Layout>
    </FromContext.Provider>
  )
}