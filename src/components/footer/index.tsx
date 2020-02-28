import React from 'react'
import './index.less'
import { Row, Col, Icon } from 'antd'

export default function () {
  return <div className="app-footer">
    <div className="footer-box">
      <p className="logo">DAZE.JS</p>
      <div className="content">
        <Row>
          <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
            <h4>特性</h4>
            <div className="item">
              <a href="/docs/core/container">IOC 容器</a>
            </div>
            <div className="item">
              <a href="/docs/core/privider">提供者模式</a>
            </div>
            <div className="item">
              <a href="/docs/core/autoload">自动加载</a>
            </div>
            <div className="item">
              <a href="/docs/base/controller">路由</a>
            </div>
            <div className="item">
              <a href="/docs/base/database">数据库</a>
            </div>
            <div className="item">
              <a href="/docs/adv/process">多进程</a>
            </div>
          </Col>
          <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
            <h4>生态</h4>
            <div className="item">
              <a href="https://github.com/dazejs/dubbo-provider" target="_blank">Apache Dubbo</a>
            </div>
            <div className="item">
              <a href="https://github.com/dazejs/jwt-provider" target="_blank">JWT</a>
            </div>
          </Col>
          <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
            <h4>帮助</h4>
            <div className="item">
              <a href="">Github</a>
            </div>
            <div className="item">
              <a href="">更新记录</a>
            </div>
            <div className="item">
              <a href="">讨论列表</a>
            </div>
            <div className="item">
              <a href="">Github</a>
            </div>
          </Col>
          <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
            <p>Daze.js 是基于 Node.js 的 Web 全栈框架，它具有高性能，高扩展性，体验友好的特性，是一款面向未来的框架。</p>
            <div className="icons">
              <a href="https://github.com/dazejs/daze" target="_blank">
                <Icon type="github" style={{ fontSize: 25 }} />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
}