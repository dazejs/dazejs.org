import React from 'react';
import { Layout } from 'antd'
import './index.less'

const { Content } = Layout

export default function () {
  return (
    <div>
      <Layout className="home-layout">
        <Content>
          home
        </Content>
      </Layout>
    </div>
  )
}