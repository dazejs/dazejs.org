import React from 'react';
import Logo from '@src/assets/logo-banner.png';
import './index.less'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <div className="banner">
      <div className="hero">
        <img src={Logo}/>
        <h1>DAZE.JS</h1>
        <p className="description">
          基于 Node.js 的 Web 全栈框架，未来尽在掌握。
        </p>
        <div className="action">
          <Button size="large" shape="round" type="primary">
            <Link to="/docs/quick-start">开始使用</Link>
          </Button>
          <Button size="large" shape="round" icon="github" style={{ margin: '0 16px' }}>
            <a href="https://github.com/dazejs/daze" target="_blank"> GITHUB </a>
          </Button>
        </div>
      </div>
    </div>
  )
}