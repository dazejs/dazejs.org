import React, { useContext } from 'react';
import { Layout, Menu } from 'antd'
import { useParams, Link } from 'react-router-dom'
import { useMarkdown } from '../../hooks/use-markdown'
import marked from 'marked'
// import hljs from 'highlight.js'
import hljs from 'highlight.js/lib/highlight';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/atom-one-dark.css';
import './index.less'
import Footer from '../../components/footer'
import FromContext from '../../context/from'

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('typescript', typescript);

const { Content, Sider } = Layout
const { SubMenu } = Menu

const renderer = new marked.Renderer()


renderer.code = function (code, language) {
  return '<pre><code class="hljs ' + language + '">' + hljs.highlightAuto(code).value + '</code></pre>';
};

renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return `
          <h${level}>
            <a class="anchor" href="#${escapedText}"></a>
            ${text}
          </h${level}>`;
};


marked.setOptions({
  renderer,
  highlight: (code) => {
    return hljs.highlightAuto(code).value
  },
})

export default function () {

  const { name1 = 'quick-start', name2 = '', name3 = '' } = useParams();

  const mdKey = [name1, name2, name3].filter(Boolean).join('/')

  const { data } = useMarkdown(mdKey)

  const from = useContext(FromContext)

  return (
    <div className="app-wrap">
      <Layout>
        <Sider width={250} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[mdKey]}
            defaultOpenKeys={['start', 'core', 'base', 'adv', 'ecosystem']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {
              from.from === 'bb' ? null : (
                <SubMenu
                  key="start"
                  title="开始"
                >
                  <Menu.Item key="quick-start">
                    <Link to={`/docs/quick-start`}>快速上手</Link>
                  </Menu.Item>
                </SubMenu>
              )
            }
            
            <SubMenu
              key="core"
              title="核心概念"
            >
              <Menu.Item key="core/container">
                <Link to={`/docs/core/container`}>IOC 容器</Link>
              </Menu.Item>
              <Menu.Item key="core/autoload">
                <Link to={`/docs/core/autoload`}>自动加载</Link>
              </Menu.Item>
              <Menu.Item key="core/di">
                <Link to={`/docs/core/di`}>依赖注入</Link>
              </Menu.Item>
              <Menu.Item key="core/provider">
                <Link to={`/docs/core/provider`}>提供者</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="base"
              title="框架基础"
            >
              <Menu.Item key="base/controller">
                <Link to={`/docs/base/controller`}>控制器</Link>
              </Menu.Item>
              <Menu.Item key="base/config">
                <Link to={`/docs/base/config`}>应用配置</Link>
              </Menu.Item>
              <Menu.Item key="base/request">
                <Link to={`/docs/base/request`}>请求</Link>
              </Menu.Item>
              <Menu.Item key="base/response">
                <Link to={`/docs/base/response`}>响应</Link>
              </Menu.Item>
              <Menu.Item key="base/view">
                <Link to={`/docs/base/view`}>视图</Link>
              </Menu.Item>
              <Menu.Item key="base/service">
                <Link to={`/docs/base/service`}>服务层</Link>
              </Menu.Item>
              <Menu.Item key="base/validate">
                <Link to={`/docs/base/validate`}>验证器</Link>
              </Menu.Item>
              <Menu.Item key="base/resource">
                <Link to={`/docs/base/resource`}>资源层</Link>
              </Menu.Item>
              <Menu.Item key="base/middleware">
                <Link to={`/docs/base/middleware`}>中间件</Link>
              </Menu.Item>
              <Menu.Item key="base/database">
                <Link to={`/docs/base/database`}>数据库</Link>
              </Menu.Item>
              <Menu.Item key="base/model">
                <Link to={`/docs/base/model`}>模型</Link>
              </Menu.Item>
              <Menu.Item key="base/cookie">
                <Link to={`/docs/base/cookie`}>Cookie</Link>
              </Menu.Item>
              <Menu.Item key="base/session">
                <Link to={`/docs/base/session`}>Session</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="adv"
              title="高级进阶"
            >
              <Menu.Item key="adv/log">
                <Link to={`/docs/adv/log`}>日志</Link>
              </Menu.Item>
              <Menu.Item key="adv/mulenv">
                <Link to={`/docs/adv/mulenv`}>多环境</Link>
              </Menu.Item>
              <Menu.Item key="adv/process">
                <Link to={`/docs/adv/process`}>多进程</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="ecosystem"
              title="生态"
            >
              <Menu.Item key="ecosystem/dubbo">
                <Link to={`/docs/ecosystem/dubbo`}>Apache Dubbo</Link>
              </Menu.Item>
              <Menu.Item key="ecosystem/websocket">
                <Link to={`/docs/ecosystem/websocket`}>Websocket</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content>
          <div className="app-content">
            <div dangerouslySetInnerHTML={{
              __html: marked(data)
            }}></div>
          </div>
        </Content>
      </Layout>
      <Footer></Footer>
    </div>
  )
}