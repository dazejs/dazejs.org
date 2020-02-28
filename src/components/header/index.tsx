import React, { useContext } from 'react';
import { Layout, Row, Col, Menu, Icon } from 'antd'
import Logo from '@src/assets/logo-small.png';
import './index.less'
import { Link } from 'react-router-dom'
import CommonContext from '../../context/common'
import FromContext from '../../context/from'
// import qs from 'qs'

const { Header } = Layout
const { SubMenu } = Menu

export default function () {
  // const localtion = useLocation()
  // const query = qs.parse(localtion.search || '', {
  //   ignoreQueryPrefix: true
  // })
  const common = useContext(CommonContext)
  const from = useContext(FromContext)
  return (
    from.from === 'bb' ? null :
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
              defaultSelectedKeys={[`${common.version}`]}
              style={{ lineHeight: '64px' }}
              onSelect={({ key }) => {
                common.setVersion(key)
              }}
            >
              <SubMenu
                title={(<span>
                  {common.version}<Icon type="caret-down" style={{ color: "#aaa", marginLeft: 5 }} />
                </span>)}
                key="version"
              >
                <Menu.Item key="v1.x">v1.x</Menu.Item>
                <Menu.Item key="v2.x">v2.x</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <div className="menu">
            <Menu
              mode="horizontal"
              defaultSelectedKeys={[`${common.version}`]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="home">
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="docs">
                <Link to={`/docs/quick-start`}>文档</Link>
              </Menu.Item>
              {/* <Menu.Item key="3">生态</Menu.Item> */}
            </Menu>
          </div>
          
        </Col>
      </Row>
    </Header>
  )
}