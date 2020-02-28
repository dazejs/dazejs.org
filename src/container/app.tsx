import { Layout } from 'antd';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from '../components/header';
import './app.less';
import Home from './home';
import Doc from './doc'
import CommonContext from '../context/common'

export default function () {
  const [version, setVersion] = useState('v2.x')

  return (
    <CommonContext.Provider value={{
      version,
      setVersion: (v: string) => {
        setVersion(v)
      },
    }}>
      <Router>
        <Layout>
          <AppHeader/>
          <Layout>
              <Switch>
                <Route path='/' exact>
                  <Home/>
                </Route>
                <Route path='/docs/:name1/:name2?/:name3?'>
                  <Doc/>
                </Route>
              </Switch>
          </Layout>
        </Layout>
      </Router >
    </CommonContext.Provider>
  )
}