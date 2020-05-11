# 快速上手
我们从这里开始创建一个 `Daze.js` 应用。

---

## 环境
为了更好的性能与稳定性，我们推荐使用 `LTS` 版本的 `Node.js`

> Node.js > 10.15.x
 
## 构建
使用我们提供的 `Daze CLI` 工具，可以快速建立应用，使用 `npm` 安装命令行工具：

```bash
# 安装 CLI 工具
$ npm install -g @dazejs/cli

# 创建 Daze.js 工程
$ daze create daze-example
```

> 支持选择 typescript 和 javascript 开发环境

## 运行
安装成功之后，执行以下命令来启动应用服务：
```bash
# 进入工程 目录
$ cd daze-example

# 开启服务，默认 8080 端口
$ npm start
```

打开浏览器并访问 `http://localhost:8080` 即可看到默认展示信息。

## 目录

```text
.
├── dist                        // 打包目标目录
├── logs                        // 日志目录
├── package.json
├── public                      // 静态资源目录
├── src                         // 源码目录
│   ├── app                     // 应用目录
│   │   ├── controllers          // 控制器目录（推荐）
│   │   ├── middlewares          // 中间件目录（推荐）
│   │   ├── services             // 服务类目录（推荐）
│   │   ├── resources            // API 资源目录（推荐）
│   │   ├── components           // 通用组件目录（推荐）
│   │   ├── validators           // 验证器目录（推荐）
│   ├── config                  // 应用配置目录
│   │   ├── app.js
│   │   ├── cookie.js
│   │   ├── database.js
│   │   ├── logger.js
│   │   ├── messenger.js
│   │   ├── middleware.js
│   │   └── session.js
│   └── index.js                // 应用入口文件
└── views                       // 视图文件目录
    └── hello.html
```

> 框架约定了默认的目录结构，但是可以通过获取 `Application` 实例的时候指定目录结构