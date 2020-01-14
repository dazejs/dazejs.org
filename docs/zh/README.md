---
home: true
heroImage: /logo.svg
heroText: Daze.js
tagline: 基于 Node.js 的 Web 服务端框架
actionText: 现在开始
actionLink: /zh/2.x/quick-start
---

----

### 简单易用
```bash
# 安装 CLI 工具
$ npm install -g @dazejs/cli@next

# 创建 Daze.js 工程
$ daze create daze-example --next

# 进入工程 目录
$ cd daze-example

# 开启服务，默认 8080 端口
$ npm start
```

### 做最好的开发体验
```ts
import { Controller, route, http } from '@dazejs/framework'

@route('/superman')
export default class Superman extends Controller {
  @http.get('/create')
  create() {
    return this.response().Created()
  }
}
```