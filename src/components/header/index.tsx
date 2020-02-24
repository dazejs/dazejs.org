import React from 'react';
import { Layout, Row, Col, Menu, Icon } from 'antd'
import Logo from '@src/assets/logo-small.png';
import './index.less'

const { Header } = Layout
const { SubMenu } = Menu

export default function () {
  return (
    <Header className='app-header'>
      <Row>
        <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
          <div className='logo-box'>
            <img src={Logo} className='logo' />
            <span className='logo-title'>Daze.js</span>
          </div>
        </Col>
        <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
          <div className="menu">
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">文档</Menu.Item>
              <Menu.Item key="3">生态</Menu.Item>
              <SubMenu title={(<span>
                版本<Icon type="caret-down" style={{ color: "#aaa", marginLeft: 5 }} />
              </span>)}>
                <Menu.Item>v1.x</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Col>
      </Row>
    </Header>
  )
}