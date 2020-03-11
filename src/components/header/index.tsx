import React, { useContext } from 'react';
import { Layout, Row, Col, Menu } from 'antd'
import Logo from '@src/assets/logo-small.png';
import './index.less'
import CommonContext from '../../context/common'
import FromContext from '../../context/from'
import { AppstoreOutlined, CaretDownOutlined } from '../../icons'
import { Link } from 'react-router-dom'

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
                    {common.version}<CaretDownOutlined style={{ color: "#aaa", marginLeft: 5 }} />
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
                style={{ lineHeight: '64px' }}
                defaultOpenKeys={[]}
              >
                <SubMenu
                  title={(<span>
                    <AppstoreOutlined style={{ color: "#aaa", marginLeft: 5 }} />生态<CaretDownOutlined style={{ color: "#aaa", marginLeft: 5 }} />
                  </span>)}
                  key="ecosystem"
                >
                  <Menu.Item key="dubbo" className="ecosystem-menu">
                    <div className="ecosystem-item">
                      <Link to="/docs/ecosystem/dubbo">
                        <p className="tit">Apache Dubbo</p>
                        <p className="desc">使用 Dubbo 协议进行 RPC 通信</p>
                      </Link>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="websocket" className="ecosystem-menu">
                    <div className="ecosystem-item">
                      <Link to="/docs/ecosystem/websocket">
                        <p className="tit">Websocket</p>
                        <p className="desc">轻松构建 websocket 网关</p>
                      </Link>
                    </div>
                  </Menu.Item>
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
            </Menu>
          </div>
          
        </Col>
      </Row>
    </Header>
  )
}