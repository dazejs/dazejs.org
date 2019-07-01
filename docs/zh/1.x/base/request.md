# 请求
大多数情况，我们都需要根据请求的详细信息来进行逻辑处理，我们可以使用 `Request` 的实例来进行请求相关操作。


## 请求对象

### 调用

在控制器中，我们可以直接使用控制器的实例属性获取 `Request` 实例：
```js {7}
const { Controller, Http } = require('@dazejs/framework);

@Controller('/posts')
class Post {
    @Http.Get()
    index() {
        console.log(this.request)
    }
}

module.exports = Post;
```


## 请求属性

可以通过 `Request` 实例获取当前请求的信息

### `request.headers`

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

根据 `name` 获取消息头
```js
request.getHeader('content-type')
```

### `request.method`

请求方法。

请求方法为字符串。 只读。 示例：'GET'、 'DELETE'。


### `request.length`

请求消息头的 `Content-Length` 的值或者 `undefiend`


### `request.url`

请求的 `URL` 字符串。 它仅包含实际 `HTTP` 请求中存在的 `URL`。

例如请求地址： `GET /status?name=daze HTTP/1.1`

则 `request.url` 的值等于 `/status?name=daze`

### `request.origin`

获取 `URL` 的来源，包括 `protocol` 和 `host`

### `request.href`

获取完整的请求URL，包括 `protocol`，`host` 和 `url`

### `request.path`

请求路径名。


### `request.querystring`

根据 `?` 获取原始查询字符串 (结果不包含 `?`)


### `request.search`

根据 `?` 获取原始查询字符串 (结果包含 `?`)


## 参数获取

### 获取参数

#### `Request#param([name [,default]])`
请求对象提供了 `param` 方法来获取变量值：

::: tip
param方法可以获取body，url参数的输入变量，所有参数可以通过param方法统一获取
:::

```js {8,10}
const { Controller, Http } = require('@dazejs/framework')

@Controller('posts')
class Post {
    @Http.Get(':id')
    show(id) {
        // 获取 name 参数，如未获取到则默认返回值 daze
        const name = request.param('name', 'daze')
        // 不传参数获取所有输入变量
        const all = request.param()
    }
}
```
#### getter
```js {7,8}
const { Controller, Http } = require('@dazejs/framework')

@Controller('posts')
class Post {
  @Http.Get(':id')
  show(id) {
    const name1 = request.name1
    const name2 = request.name2
  }
}
```

## 参数筛选

通过 `only` 与 `except` 方法筛选需要或者不需要的输入变量

```js {8,10}
const { Controller, Http } = require('@dazejs/framework')

@Controller('posts')
class Post {
    @Http.Get()
    show(id) {
        // 只获取name与age变量
        const params1 = req.only(['name', 'age'])
        // 排除name与age，获取剩余变量
        const params2 = req.except(['name', 'age'])
    }
}
```

