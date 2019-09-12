# 请求
很多情况，我们都需要根据请求的详细信息来进行逻辑处理，我们可以使用 `Request` 的实例来进行请求相关操作。


## 请求对象

### 调用

在控制器中，可以直接使用控制器的实例属性获取 `Request` 实例：
```js {7}
const { Controller, Route, Http } = require('@dazejs/framework);

@Route('/posts')
class Post extends Controller {
    @Http.Get()
    index() {
        console.log(this.request)
    }
}

module.exports = Post;
```


## 请求信息

可以通过 `Request` 实例获取当前请求的信息

### `request.getHeaders()`

请求消息头对象。消息头的名称和值的键值对。 消息头的名称都是小写的。

```js
// 打印类似以下：
//
// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*/*' }
console.log(request.headers);
```

### `request.getHeader(name)`

根据 `name` 获取消息头，不区分大小写
```js
// 打印类似以下：
// 'application/json'
console.log(request.getHeader('accept'))
```

### `request.getBody()`

获取请求体 `body`

### `request.getFiles()`

获取请求发送文件列表

### `request.getMethod()`

获取请求方法。

请求方法为字符串。 示例：'GET'、 'DELETE'。

### `request.getLength()`

请求消息头的 `Content-Length` 的值或者 `undefiend`

### `request.getUrl()`

请求的 `URL` 字符串。 它仅包含实际 `HTTP` 请求中存在的 `URL`。

例如请求地址： `GET /status?name=daze HTTP/1.1`

则 `request.url` 的值等于 `/status?name=daze`

### `request.getOrigin()`

获取 `URL` 的来源，包括 `protocol` 和 `host`

### `request.getHref()`

获取完整的请求URL，包括 `protocol`，`host` 和 `url`

### `request.getPath()`

请求路径名。

### `request.getQuery()`

根据 `?` 获取原始查询对象

### `request.getQuerystring()`

根据 `?` 获取原始查询字符串 (结果不包含 `?`)

### `request.getSearch()`

根据 `?` 获取原始查询字符串 (结果包含 `?`)

### `request.getProtocol()`

获取请求协议: `http` 或者 `https`

### `request.getHost()`

获取请求的 `host`

### `request.getType()`

获取请求 `Content-Type` 不含参数 `charset`


### `request.acceptsTypes(types)`

返回最佳匹配的 `types`，否则为 `false`。 `type` 值可能是一个或多个 `mime` 类型的字符串，如 `application/json`，扩展名称如 `json`，或数组 `["json", "html", "text/plain"]`。

```js
// Accept: text/html
request.acceptsTypes('html');
// => "html"

// Accept: text/*, application/json
request.acceptsTypes('html');
// => "html"
request.acceptsTypes('text/html');
// => "text/html"
request.acceptsTypes('json', 'text');
// => "json"
request.acceptsTypes('application/json');
// => "application/json"
```

### `request.acceptsEncodings(encodings)`

返回最佳匹配的 `Accept-Encoding`，否则为 `false`

::: tip
应该将identity 作为编码之一
:::

```js
// Accept-Encoding: gzip
request.acceptsEncodings('gzip', 'deflate', 'identity');
// => "gzip"

request.acceptsEncodings(['gzip', 'deflate', 'identity']);
// => "gzip"
```

### `request.acceptsCharsets(charsets)`

返回最佳匹配的 `charsets`，否则为 `false`。

```js
// Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5
request.acceptsCharsets('utf-8', 'utf-7');
// => "utf-8"

request.acceptsCharsets(['utf-7', 'utf-8']);
// => "utf-8"
```

### `request.acceptsLanguages(langs)`

返回最佳匹配的 `langs`，否则为 `false`。

```js
// Accept-Language: en;q=0.8, es, pt
request.acceptsLanguages('es', 'en');
// => "es"

request.acceptsLanguages(['en', 'es']);
// => "es"
```

### `request.cookieValue(name [, options])`

根据名称获取 `cookie` 的值

### `request.sessionValue(name)`

根据名称获取 `session` 的值


## 请求方法

框架封装了用于判断常用的请求方法的方式

### `request.isGet()`

判断请求是否 `GET` 类型

### `request.isPost()`

判断请求是否 `POST` 类型

### `request.isPut()`

判断请求是否 `PUT` 类型

### `request.isPatch()`

判断请求是否 `PATCH` 类型

### `request.isDelete()`

判断请求是否 `DELETE` 类型

### `request.isHead()`

判断请求是否 `HEAD` 类型

### `request.isOptions()`

判断请求是否 `OPTIONS` 类型

## 参数获取

### 获取参数

#### `Request#getParam([name [,default]])`
请求对象提供了 `getParam` 和 `getParams` 方法来获取变量值：

::: tip
param方法可以获取body，url参数的输入变量，所有参数可以通过param方法统一获取
:::

```js {8,10}
const { Controller, Route, Http } = require('@dazejs/framework')

@Route('posts')
class Post extends Controller {
    @Http.Get(':id')
    show(id) {
        // 获取 name 参数，如未获取到则默认返回值 daze
        const name = this.request.getParam('name', 'daze')
        // 获取所有输入变量
        const all =  this.request.getParams()
    }
}
```
#### getter
```js {7,8}
const { Controller, Route, Http } = require('@dazejs/framework')

@Route('posts')
class Post extends Controller {
  @Http.Get(':id')
  show(id) {
    const name1 = this.request.name1
    const name2 = this.request.name2
  }
}
```

## 参数筛选

通过 `only` 与 `except` 方法筛选需要或者不需要的输入变量

```js {8,10}
const { Controller, Route, Http } = require('@dazejs/framework')

@Route('posts')
class Post extends Controller {
    @Http.Get()
    show(id) {
        // 只获取name与age变量
        const params1 = this.request.only(['name', 'age'])
        // 排除name与age，获取剩余变量
        const params2 = this.request.except(['name', 'age'])
    }
}
```

