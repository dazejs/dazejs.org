import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppHeader from '../components/header';
import './app.less';
import Home from './home';

export default function () {
  return (
    <Layout>
      <AppHeader/>
      <Layout>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home></Home>
            </Route>
          </Switch>
        </Router>
      </Layout>
    </Layout>
  )
}