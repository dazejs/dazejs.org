# 中间件

中间件分为2个部分：

- 全局中间件
- 路由中间件 (模块中配置)

## 应用级中间件
全局中间件配置由`src/config/middleware.js`配置文件配置

```js
module.exports = [
  'axios', // 直接引用 src/app/middleware 下的同名文件
  (ctx, next) => {
    next()
  },
]
```

## 路由级中间件
路由级中间件由模块文件引入，详细用法见模块章节

## 自定义中间件

自定义中间件文件存放于`src/app/middleware`目录下，推荐使用ES6类的方式定义:

```js

class CustomMiddleware
    handle(ctx, next) {
        
    }
}

module.exports = CustomMiddleware

```


中间件类需要实现`handle`方法，使用方法和koa中间件一致，也可以使用传统函数中间件：

```js
module.exports = function(ctx, next) {
    
}
```
