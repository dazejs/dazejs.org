import React from 'react';
import Logo from '@src/assets/logo-banner.png';
import './index.less'
import { Button, Row, Col } from 'antd'
import { GithubFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <div className="banner">
      {/* <div className="container">
        <Row>
          <Col span={16}>
          <h1>
            <div className="header-title-accent has-cursor">
              优雅，永不过时。
            </div>
          </h1>
          <p>
            这是一款基于 Node.js 的服务端 Web 框架，你可以使用它来构建高性能、可扩展的 Web 应用程序 —— 提供 Node 一站式解决方案
          </p>
          </Col>
          <Col span={8}></Col>
        </Row>
      </div> */}
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
          <Button  className="github" size="large" shape="round" icon={<GithubFilled/>} style={{ margin: '0 16px' }}>
            <a href="https://github.com/dazejs/daze" target="_blank"> GITHUB </a>
          </Button>
        </div>
      </div>
    </div>
  )
}