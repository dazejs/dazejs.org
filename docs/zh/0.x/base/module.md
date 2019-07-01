# 模块
<style> table { display: table!important; } </style>

模块是用来组织应用结构的对象，框架自带一个根模块（`src/app/app.module.js`），每个模块都可以加载子模块。

![](assets/module-1.png)

通过模块的拆分，我们可以很清晰的规划出应用的模块化架构
> 如果你不需要拆分模块，只需要操作根模块即可

## 描述属性

模块通过类属性来描述模块需要装载的功能。

| 属性        | 说明                   |
| ----------- | ---------------------- |
| modules     | 描述该模块装载的子模块 |
| controllers | 描述该模块装载的控制器 |
| middlewares | 描述该模块装载的中间件，中间件将被子模块继承。 |

```js
module.exports = class AppModule {
  modules = [];
  controllers = [];
  middlewares = [];
}
```

或者通过 `getter`

```js
module.exports = class AppModule {
    get modules() {
        return []
    }
    
    get controllers() {
        return []
    }
    
    get middlewares() {
        return []
    }
}
```

### 工具
可以使用 `Daze CLI` 工具创建模块文件:
```bash
$ daze make module user
```
上述命令将在 `src/app` 下创建 `user.js` 模块文件, 然后我们可以在根模块 `src/app/app.module.js` 中引入该模块文件作为子模块, 查看接下来的 `装载子模块` 章节了解更多。

## 装载子模块


`modules` 属性用来描述模块的子模块信息，返回一个数组，可以传入子模块的引用或路径字符串:

传入模块的引用：
```js
const UserModule = require('./user.js')

module.exports = class AppModule {
    modules = [
        UserModule,
    ];
}
```

传入路径的字符串（支持通配符）:

```js
module.exports = class AppModule {
    modules = [
        'modules/home/*.js',
        path.resolve(__dirname, 'modules/admin/*.js')
    ];
}
```
> 相对路径相对于 应用的 `src/app`目录



## 装载控制器

`controllers` 属性用来描述模块需要装载的控制器信息，返回一个数组，可以传入控制器的引用或者路径字符串：

传入控制器的引用：
```js
const UserController = require('./controller/user.js')
const PostController = require('./controller/post.js')

module.exports = class AppModule {
    controllers = [
        UserController,
        PostController,
    ];
}
```

传入路径字符串（支持通配符）：

```js
module.exports = class AppModule {
    controllers = [
        'home/*.js', 
        'admin/**',
        path.resolve(__dirname, 'controller/web/*.js'),
    ];
}
```
> 相对路径相对于 应用的 `src/app/controller`目录



## 装载中间件

`middlewares` 属性描述模块的中间件信息，模块加载的中间件全部为路由级中间件，框架级中间件可以使用全局配置文件加载, 模块中间件会通过子模块继承，即子模块会自动加载父模块的中间件，可以传入中间件的引用或者路径字符串:

```js
const anyMiddleware = require('koa2-any-middleware')

module.exports = class AppModule {
    miaddlewares = [
        anyMiddleware,
        async (ctx, next) => {
            // do something
            await next()
        },
        'axios',
    ];
}
```
> 相对路径相对于 应用的 `src/app/middleware`目录
