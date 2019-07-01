# 请求
大多数情况，我们都需要根据请求的详细信息来进行逻辑处理，我们封装了兼容 `koa2` 中 `ctx.request` 的请求对象


## 注入
框架提供了 `@Req` 或 `@Request` 装饰器来注入请求对象到控制器中：

##### 方法注入：
```js
const { Router, Request } = require('@dazejs/framework').Decorators

@Router()
class User {
    @Request()
    update(request) {
      // use request to do ...
    }
}
```

##### 属性注入：
```js
const { Router, Request } = require('@dazejs/framework').Decorators

@Router()
class User {
    @Request() request = null;

    update() {
        // use this.request
        this.request
    }
}
```


##### 构造函数注入：
```js
const { Router, Request } = require('@dazejs/framework').Decorators

@Router()
@Request()
class User {
    constructor(request, context) {
        super(context)
        this.request = request
    }
    
    update() {
      // use request to do ...
      this.request
    }
}
```
> 如果自定义了构造函数，那么构造函数的 `context` 参数是必须要声明的

### 继承基础控制器
如果控制器继承了基础控制器，那么我们可以直接通过 `this` 来获取请求对象，推荐使用这种方法：
```js
const { Controller, Decorators } = require('@dazejs/framework')

const { Router } = Decorators

@Router()
class User extends Controller {
    update() {
        // use this.request to do ...
    }
}
```
<!-- 
使用`@Body`, `@Query`, `@Params`分别获取body参数、query参数和路由参数

```js
const { Router, Request, Body, Query, Params } = require('@dazejs/framework').Decorators

@Router()
class User {
    @Get()
    index() {
     
    }
}
``` -->



## 属性

可以通过请求对象获取当前请求的信息

请求对象属性包含：

> 请求对象属性来自 `koa` 的 `ctx.request`属性

| 属性        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| headers     | 请求标头对象                                                 |
| method      | 请求方法                                                     |
| length      | `Content-Length` 或 `undefined`                              |
| url         | 请求URL                                                      |
| originalUrl | 获取请求原始URL                                              |
| origin      | 获取URL的来源，包括 `protocol` 和 `host`                     |
| href        | 获取完整的请求URL，包括 `protocol`，`host` 和 `url`          |
| path        | 获取请求路径名                                               |
| querystring | 根据 `?` 获取原始查询字符串                                  |
| search      | 使用 `?` 获取原始查询字符串                                  |
| host        | 获取当前主机（hostname:port）                                |
| type        | 获取请求 `Content-Type` 不含参数 `charset`                   |
| charset     | 在存在时获取请求字符集，或者 `undefined`                     |
| query       | 获取解析的查询字符串, 当没有查询字符串时，返回一个空对象     |
| fresh       | 检查请求缓存是否“新鲜”，也就是内容没有改变。此方法用于 `If-None-Match` / `ETag`, 和 `If-Modified-Since` 和 `Last-Modified` 之间的缓存协商 |
| stale       | 相反与 `request.fresh`                                       |
| protocol    | 返回请求协议，`https` 或 `http`                              |
| ip          | 请求远程地址                                                 |
| subdomains  | 将子域返回为数组                                             |



## 变量

### 获取变量

#### Request#param([name [,default]])
请求对象提供了 `param` 方法来获取变量值：

> param方法可以获取body，url参数的输入变量，所有参数可以通过param方法统一获取

```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router()
class Post extends Controller {
    @Decorators.Get(':id')
    show(id) {
        // 获取 name 参数，如未获取到则默认返回值 daze
        const name = request.param('name', 'daze')
        // 不传参数获取所有输入变量
        const all = request.param()
    }
}
```
#### getter
```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router()
class Post {
  @Decorators.Get(':id')
  show(id) {
    const name1 = request.name1
    const name2 = request.name2
        
  }
}
```

## 筛选

通过 `only` 与 `except` 方法筛选需要或者不需要的输入变量

```js
class Post {
    @Request()
    show(req, id) {
        // 只获取name与age变量
        const params1 = req.only(['name', 'age'])
        // 排除name与age，获取剩余变量
        const params2 = req.except(['name', 'age'])
    }
}
```

