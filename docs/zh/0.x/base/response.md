# 响应
<style> table { display: table!important; } </style>

## 输出

大部分情况只要直接在控制器方法返回数据即可
```js
class User {
    show(id) {
        return `user id: ${id}`
    }
}
```
可自动响应以下内容:

| 响应类型 | 说明               | 默认 Content-Type           |
| ---------- | ------------------ | --------------------------- |
| String   |                    | `text/html` 或 `text/plain` |
| Buffer   |                    | `application/octet-stream`  |
| Stream   | 流写入             | `application/octet-stream`  |
| Object   | 包括普通对象和数组 | ` application/json`         |

也可以返回一个 `Response` 实例：
```js
const { Response, Decorators } = require('@dazejs/framework')

@Decorators.Router()
class User {
    show(id) {
        return new Response('im a data', 200)
    }
}
```
构造函数
```txt
Response#constructor([data [, code = 200 [, headers = {}]]])
```

`Response` 构造函数接收3个参数
- `data`: 响应数据
- `code`: 响应状态码, 默认200
- `headers`: 响应头

## 注入

相应实例除了可以自己实例化之外，还可以通过注入的方式获取实例：

方法注入：
```js
const { Router, Response } = require('@dazejs/framework').Decorators

@Router()
class Post {
    @Response()
    index(response) {
        // use response
    }
}
```
属性注入：
```js
const { Decorators } = require('@dazejs/framework')

@Decorators.Router()
class Post {
    @Decorators.Response() response = null;

    index() {
        // use this.response
    }
}
```

构造函数注入：
```js
const { Router, Response } = require('@dazejs/framework').Decorators

@Router()
@Response()
class Post {
    constructor(response, context) {
        super(context)
        this.response = response
    }

    @Response()
    index(response) {
        // use this.response
    }
}
```

继承基础控制器（推荐）：

```js
const { Controller, Decorators: { Router } } = require('@dazejs/framework')

@Router()
class User extends Controller {
    update() {
        // 使用 this.response 获取
    }
}
```
> 通过注入或者基础控制器获取的实例，没有响应数据，需要自行通过 `setData` 添加数据和 `setCode` 设置响应状态码


## 响应数据

使用`response.setData([data])`方法设置需要响应的数据

```js
const { Router, Response } = require('@dazejs/framework').Decorators

@Router()
class Post {
    @Response()
    index(response) {
        return response.setData({
            name: 'Zewail'
        })
    }
}
```

## 响应状态码

使用`response.setCode([code])`方法设置需要响应状态码

```js
const { Router, Response } = require('@dazejs/framework').Decorators

@Router()
class Post {
    @Response()
    index(response) {
        return response.setData({
            name: 'Zewail'
        }).setCode(200)
    }
}
```

## 响应头

使用`response.setHeader(<name>, [value])`方法设置响应头

```js
const { Router, Response } = require('@dazejs/framework').Decorators

@Router()
class Post {
    @Response()
    index(response) {
        return response.setData({
            name: 'Zewail'
        }).code(200).setHeader('content-type', 'application/json').setHeader({
            'Version': 'v1'
        })
    }
}
```

> setData、setCode、setHeader 等方法支持链式调用，状态码默认为200

## 成功响应

使用 `response.success([data [, code = 200]])` 方法返回一个成功响应：

```js
class User {
    @daze.Response()
    show(response, id) {
        return response.success('im a data', 200)
    }
}
```

框架对常用成功状态码进行了封装，可以简单的调用这些方法，返回想要的信息和状态码:

```js
class User {
    @daze.Response()
    show(response, id) {
        // 返回一个 200 状态码的响应
        return response.OK('im a data')
    }
}
```


| 状态码 | 方法                          |
| ------ | ----------------------------- |
| 100    | Continue                      |
| 101    | SwitchingProtocols            |
| 102    | Processing                    |
| 103    | EarlyHints                    |
| 200    | OK                            |
| 201    | Created                       |
| 202    | Accepted                      |
| 203    | NonAuthoritativeInformation   |
| 204    | NoContent                     |
| 205    | ResetContent                  |
| 206    | PartialContent                |
| 207    | MultiStatus                   |
| 208    | AlreadyReported               |
| 226    | IMUsed                        |
| 300    | MultipleChoices               |
| 302    | Found                         |
| 303    | SeeOther                      |
| 304    | NotModified                   |
| 305    | UseProxy                      |
| 306    | Unused                        |
| 307    | TemporaryRedirect             |
| 308    | PermanentRedirect             |





## 错误响应

使用 `response.error([message [, code = 404]])` 方法来抛出一个 `http` 异常：

```js
class User {
    @daze.Response()
    show(response, id) {
        // ...
        if (!user) {
            // 抛出一个404异常
            return response.error('no user!', 404)
        }
    }
}
```

框架对常用错误状态码进行了封装，可以简单的调用这些方法，返回想要的信息和状态码:

```js
class User {
    @daze.Response()
    show(response, id) {
        // ...
        if (!user) {
            // 抛出一个404异常
           return response.NotFound('no user!')
        }
    }
}
```

| 状态码 | 方法                          |
| ------ | ----------------------------- |
| 400    | BadRequest                    |
| 401    | Unauthorized                  |
| 402    | PaymentRequired               |
| 403    | Forbidden                     |
| 404    | NotFound                      |
| 405    | MethodNotAllowed              |
| 406    | NotAcceptable                 |
| 407    | ProxyAuthenticationRequired   |
| 408    | RequestTimeout                |
| 409    | Conflict                      |
| 410    | Gone                          |
| 411    | LengthRequired                |
| 412    | PreconditionFailed            |
| 413    | PayloadTooLarge               |
| 414    | URITooLong                    |
| 415    | UnsupportedMediaType          |
| 416    | RangeNotSatisfiable           |
| 417    | ExpectationFailed             |
| 418    | ImATeapot                     |
| 421    | MisdirectedRequest            |
| 422    | UnprocessableEntity           |
| 423    | Locked                        |
| 424    | FailedDependency              |
| 425    | UnorderedCollection           |
| 426    | UpgradeRequired               |
| 428    | PreconditionRequired          |
| 429    | TooManyRequests               |
| 431    | RequestHeaderFieldsTooLarge   |
| 451    | UnavailableForLegalReasons    |
| 500    | InternalServerError           |
| 501    | NotImplemented                |
| 502    | BadGateway                    |
| 503    | ServiceUnavailable            |
| 504    | GatewayTimeout                |
| 505    | HTTPVersionNotSupported       |
| 506    | VariantAlsoNegotiates         |
| 507    | InsufficientStorage           |
| 508    | LoopDetected                  |
| 509    | BandwidthLimitExceeded        |
| 510    | NotExtended                   |
| 511    | NetworkAuthenticationRequired |

## 重定向

#### 重定向到地址

主动实例化 `Redirect` 对象:
```js
const { Redirect, Decorators } = require('@dazejs/framework')

@Decorators.Router()
class User {
    show(id) {
        return new Redirect('htrtp://www.google.com/')
    }
}
```


使用 `@Redirect` 装饰器获取重定向实例， 其余注入方法与 `Response` 装饰器一致

```js
class Post {
    index() {
        // ...
    }
    
    @Redirect()
    store(redirect) {
        // store success
        return redirect.go('/index')
    }
    
}
```

#### 带一次性 session 的重定向

我们可以在重定向的时候添加一次性的 session，该 session 会在下次请求的时候被清除，这在处理页面错误提示的时候非常有用

```js
class Post {
    index() {
        // ...
    }
    
    @Redirect()
    store(redirect) {
        // store success
        return redirect.go('/index').with('username', '用户名不能为空')
    }
}
```

```html
<!-- ... -->
<input name='username'/>
<p>
  {% if session.username %}
    {{ session.username }}
  {% endif %}
</p>
<!-- ... -->
```

## 下载文件

使用 `download`来下载文件

```js
class Post extends Controller {
    
    download() {
        // store success
        const fileStream = /* 创建文件流 */
        return this.response.download(fileStream, 'xxx.pdf')
    }
}
```

