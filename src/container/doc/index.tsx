import React from 'react';
import { Layout, Menu } from 'antd'
import { useParams, Link } from 'react-router-dom'
import { useMarkdown } from '../../hooks/use-markdown'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css';
import './index.less'

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

// renderer.codespan = function (text) {
//   return '<mark>' + text + '</mark>';
// };

marked.setOptions({
  renderer,
  highlight: (code) => {
    return hljs.highlightAuto(code).value
  },
})

export default function () {

  const { version = 'v2.x', name1 = 'quick-start', name2 = '', name3 = '' } = useParams();

  const mdKey = [name1, name2, name3].filter(Boolean).join('/')

  const { data, isError } = useMarkdown(version, mdKey)

  return (
    <div className="app-wrap">
      <Layout>
        <Sider width={250} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[mdKey]}
            defaultOpenKeys={['start', 'core', 'base']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu
              key="start"
              title="开始"
            >
              <Menu.Item key="quick-start">
                <Link to={`/docs/${version}/quick-start`}>快速上手</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="core"
              title="核心概念"
            >
              <Menu.Item key="core/container">
                <Link to={`/docs/${version}/core/container`}>IOC 容器</Link>
              </Menu.Item>
              <Menu.Item key="core/di">
                <Link to={`/docs/${version}/core/di`}>依赖注入</Link>
              </Menu.Item>
              <Menu.Item key="core/autoload">
                <Link to={`/docs/${version}/core/autoload`}>自动加载</Link>
              </Menu.Item>
              <Menu.Item key="core/provider">
                <Link to={`/docs/${version}/core/provider`}>提供者</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="base"
              title="框架基础"
            >
              <Menu.Item key="base/controller">
                <Link to={`/docs/${version}/base/controller`}>控制器</Link>
              </Menu.Item>
              <Menu.Item key="base/config">
                <Link to={`/docs/${version}/base/config`}>应用配置</Link>
              </Menu.Item>
              <Menu.Item key="base/request">
                <Link to={`/docs/${version}/base/request`}>请求</Link>
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
    </div>
  )
}