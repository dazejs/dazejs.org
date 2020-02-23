import React from 'react';
import { Layout, Row, Col, Menu } from 'antd'
import './index.less'

const { Header } = Layout

export default function () {
  return (
    <Header className='app-header'>
      <Row>
        <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
          logo
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
            </Menu>
          </div>
        </Col>
      </Row>
    </Header>
  )
}