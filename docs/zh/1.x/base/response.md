# 响应
<style> table { display: table!important; } </style>

## 输出

大部分情况只要直接在控制器方法返回数据即可
```js {7}
const { Controller, Route, Http } = require('@dazejs/framework')

@Route('/users')
class User extends Controller {
    @Http.Get('/:id')
    show(id) {
        return `user id: ${id}`
    }
}
```

也可以使用 `this.response` 方法
```js {7}
const { Response, Route, Controller, Http } = require('@dazejs/framework')

@Route('users')
class User extends Controller {
    @Http.Get()
    show(id) {
        return this.response('im a data', 200)
    }
}
```
#### `this.response([data [, code = 200 [, headers = {}]]])`

`this.response()` 可以直接创建  `Response` 实例

`response` 函数接收3个参数
- `data`: 响应数据
- `code`: 响应状态码, 默认200
- `headers`: 响应头


## 响应数据

我们也可以使用 `response().setData([data])` 方法设置需要响应的数据

```js
const { Controller, Route, Response, Http } = require('@dazejs/framework')

@Route('posts')
class Post extends Controller {
    @Http.Get()
    index() {
        return this.response().setData({
            name: 'Dazejs'
        })
    }
}
```

## 响应状态码

使用 `response().setCode([code])` 方法设置需要响应状态码

```js
const { Controller, Route, Response, Http } = require('@dazejs/framework')

@Route('posts')
class Post extends Controller {
    @Http.Get()
    index() {
        return this.response().setData({
            name: 'Dazejs'
        }).setCode(200)
    }
}
```

## 响应头

使用 `response().setHeader(<name>, [value])` 方法设置响应头

```js {10,11}
const { Controller, Route, Response, Http } = require('@dazejs/framework')

@Route('posts')
class Post extends Controller {
    @Http.Get()
    index() {
        return this.response()
            .setData({ name: 'Zewail' })
            .setCode(200)
            .setHeader('content-type', 'application/json')
            .setHeader({ 'Version': 'v1' })
    }
}
```

::: tip
setData、setCode、setHeader 等方法支持链式调用，状态码默认为 200
:::

## 成功响应

使用 `response.success([data [, code = 200]])` 方法返回一个成功响应：

```js {7}
const { Controller, Route, Response, Http } = require('@dazejs/framework')

@Route('/posts')
class Post extends Controller {
    @Http.Get('/:id')
    show(id) {
        return this.response().success('im a data', 200)
    }
}
```

框架对常用成功状态码进行了封装，可以简单的调用这些方法，返回想要的信息和状态码:

```js {8}
const { Controller, Route, Response, Http } = require('@dazejs/framework')

@Route('/users')
class User extends Controller {
    @Http.Get('/:id')
    show(id) {
        // 返回一个 200 状态码的响应
        return this.response().OK('im a data')
    }
}
```

| 状态码 | 方法                          |
| ------ | ----------------------------- |
| 100    | Continue()                      |
| 101    | SwitchingProtocols()            |
| 102    | Processing()                    |
| 103    | EarlyHints()                    |
| 200    | OK()                            |
| 201    | Created()                       |
| 202    | Accepted()                      |
| 203    | NonAuthoritativeInformation()   |
| 204    | NoContent()                     |
| 205    | ResetContent()                  |
| 206    | PartialContent()                |
| 207    | MultiStatus()                   |
| 208    | AlreadyReported()               |
| 226    | IMUsed()                        |
| 300    | MultipleChoices()               |
| 302    | Found()                         |
| 303    | SeeOther()                      |
| 304    | NotModified()                   |
| 305    | UseProxy()                      |
| 306    | Unused()                        |
| 307    | TemporaryRedirect()             |
| 308    | PermanentRedirect()             |

## 错误响应

使用 `response().error([message [, code = 404]])` 方法来抛出一个 `http` 异常：

```js {10}
const { Controller, Route, Http } = require('@dazejs/framework')

@Route('users)
class User extends Controller {
    @Http.Get(':id')
    show(id) {
        // ...
        if (!user) {
            // 抛出一个404异常
            return this.response().error('no user!', 404)
        }
    }
}
```

框架对常用错误状态码进行了封装，可以简单的调用这些方法，返回想要的信息和状态码:

```js {10}
const { Controller, Route, Http } = require('@dazejs/framework')

@Route('users)
class User extends Controller {
    @Http.Get(':id')
    show(id) {
        // ...
        if (!user) {
            // 抛出一个404异常
           return this.response().NotFound('no user!')
        }
    }
}
```

| 状态码 | 方法                          |
| ------ | ----------------------------- |
| 400    | BadRequest()                    |
| 401    | Unauthorized()                  |
| 402    | PaymentRequired()               |
| 403    | Forbidden()                     |
| 404    | NotFound()                      |
| 405    | MethodNotAllowed()              |
| 406    | NotAcceptable()                 |
| 407    | ProxyAuthenticationRequired()   |
| 408    | RequestTimeout()                |
| 409    | Conflict()                      |
| 410    | Gone()                          |
| 411    | LengthRequired()                |
| 412    | PreconditionFailed()            |
| 413    | PayloadTooLarge()               |
| 414    | URITooLong()                    |
| 415    | UnsupportedMediaType()          |
| 416    | RangeNotSatisfiable()           |
| 417    | ExpectationFailed()             |
| 418    | ImATeapot()                     |
| 421    | MisdirectedRequest()            |
| 422    | UnprocessableEntity()           |
| 423    | Locked()                        |
| 424    | FailedDependency()              |
| 425    | UnorderedCollection()           |
| 426    | UpgradeRequired()               |
| 428    | PreconditionRequired()          |
| 429    | TooManyRequests()               |
| 431    | RequestHeaderFieldsTooLarge()   |
| 451    | UnavailableForLegalReasons()    |
| 500    | InternalServerError()           |
| 501    | NotImplemented()                |
| 502    | BadGateway()                    |
| 503    | ServiceUnavailable()            |
| 504    | GatewayTimeout()                |
| 505    | HTTPVersionNotSupported()       |
| 506    | VariantAlsoNegotiates()         |
| 507    | InsufficientStorage()           |
| 508    | LoopDetected()                  |
| 509    | BandwidthLimitExceeded()        |
| 510    | NotExtended()                   |
| 511    | NetworkAuthenticationRequired() |

## 重定向

#### 重定向到地址

使用 `this.redirect` 函数:
```js
const { Redirect, Route, Controller, Http } = require('@dazejs/framework')

@Route()
class User extends Controller {
    @Http.Get(':id')
    show(id) {
        return this.redirect('http://www.google.com/')
    }
}
```


使用 `Redirect` 实例的 `go` 方法:

```js
const { Route, Controller, Http } = require('@dazejs/framework')

@Route()
class Post extends Controller {
     @Http.Get()
    index() {
        // ...
    }

    @Http.Post()
    store() {
        // store success
        return this.redirect().go('/index')
    }
    
}
```

#### 带一次性 session 的重定向

我们可以在重定向的时候添加一次性的 session，该 session 会在下次请求的时候被清除，这在处理页面错误提示的时候非常有用

```js
const { Route, Controller, Http } = require('@dazejs/framework')

@Route()
class Post extends Controller {
    @Http.Get()
    index() {
        // ...
    }
    
    @Http.Post()
    store() {
        // store success
        return this.redirect().go('/index').with('username', '用户名不能为空')
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
const { Route, Controller, Http } = require('@dazejs/framework')

@Route()
class Post extends Controller {
    
    @Http.Get()
    download() {
        // store success
        const fileStream = /* 创建文件流 */
        return this.response().download(fileStream, 'xxx.pdf')
    }
}
```

