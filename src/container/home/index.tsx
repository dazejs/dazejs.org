import React, { useEffect } from 'react';
import { Layout } from 'antd'
import './index.less'
import Banner from '../../components/banner'
import Footer from '../../components/footer'
import Superman from '@src/assets/superman.jpeg'
import hljs from 'highlight.js/lib/highlight';
import bash from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';
hljs.registerLanguage('bash', bash);

const { Content } = Layout

export default function () {

  useEffect(() => {
    hljs.initHighlightingOnLoad()
  }, [])

  return (
    <div>
      <Layout className="home-layout">
        <Content>
          <Banner/>
          <div className="home-content">
            <div className="section-1">
              <div className="items">
                <div className="item">
                  <p className="tit">
                    高扩展性
                </p>
                  <p className="con">
                    利用装饰器与 IOC 容器的能力，创建了一个非常大强的扩展模式 - 提供者，可以利用它做你任何想做的事
                  </p>
                </div>
                <div className="item">
                  <p className="tit">
                    高性能
                  </p>
                  <p className="con">
                    全新的架构设计，使之具有前所未有的高性能。
                  </p>
                </div>
                <div className="item">
                  <p className="tit">
                    灵活易用
                  </p>
                  <p className="con">
                    使用最新的 JavaScript 特性与成熟的设计模式，创建最灵活与易用的 API。
                  </p>
                </div>
              </div>
            </div>
            <div className="section-2">
              <p className="h2">先睹为快</p>
              <p className="con">
                <img className="img" src={Superman} />
              </p>
            </div>
            <div className="section-3">
              <p className="h2">开始吧！</p>
              <div className="code-box">
                <pre>
                  <code className="hljs bash">
                    {`  $ npm i -g @dazejs/cli

  $ daze create project-name

  ? Which one to use for development? (Use arrow keys)
  ❯ typescript
    javascript

  ? Which package manager you wany? (Use arrow keys)
  ❯ npm
    yarn
    cnpm
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
          <Footer/>
        </Content>
      </Layout>
    </div>
  )
}