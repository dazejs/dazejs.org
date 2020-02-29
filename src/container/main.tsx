import { Layout } from 'antd';
import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import AppHeader from '../components/header';
import './app.less';
import FromContext from '../context/from'
import qs from 'qs'
import Loadable from 'react-loadable';

function Loading() {
  return <div></div>
}

const LoadableHomeComponent = Loadable({
  loader: () => import('./home'),
  loading: Loading,
});

const LoadableDocComponent = Loadable({
  loader: () => import('./doc'),
  loading: Loading,
});


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
              <LoadableHomeComponent />
            </Route>
            <Route path='/docs/:name1/:name2?/:name3?'>
              <LoadableDocComponent />
            </Route>
          </Switch>
        </Layout>
      </Layout>
    </FromContext.Provider>
  )
}