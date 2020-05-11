import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './app.less';
import CommonContext from '../context/common'
import Main from './main'

export default function () {
  const [version, setVersion] = useState('v3.x')

  return (
    <CommonContext.Provider value={{
      version,
      setVersion: (v: string) => {
        setVersion(v)
      }
    }}>
        <Router>
          <Main />
        </Router >
    </CommonContext.Provider>
  )
}