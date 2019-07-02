# Cookie

## 读取 Cookie
- 通过 `request` 对象获取：
```js {8}
const { Controller, Http } = require('@dazejs/framework')

@Controller('users')
class User {
    @Http.Get()
    index() {
      const key = 'username';
      console.log(this.request.cookie(key))
      console.log(this.request.cookieValue(key)) // this.request.cookie 的别名方法
    }
}
```

- 使用注入：
```js {6,8}
const { Controller, Http, CookieValue } = require('@dazejs/framework')

@Controller('users')
class User {
    @Http.Get()
    @CookieValue('username')
    index(usernameCookie) {
      console.log(usernameCookie)
    }
}
```

## 响应 Cookie
`cookie` 是跟随响应一起发送的，我们我们需要将 `Cookie` 实例附加在响应对象上来设置 `cookie`

```js {7,8,9,10}
const { Controller, Http, Cookie } = require('@dazejs/framework')

@Controller('users')
class User {
    @Http.Get()
    index() {
      const cookie = new Cookie('username', 'Dazejs')
      return this.response().withCookie(cookie).success({
        data: 'im data'
      })
    }
}
```

`response` 对象上还添加了简便方法 `cookie(name, value [, options])` 来设置 `cookie`：

```js {7,8,9}
const { Controller, Http, Cookie } = require('@dazejs/framework')

@Controller('users')
class User {
    @Http.Get()
    index() {
      return this.response().cookie('username', 'Dazejs').success({
        data: 'im data'
      })
    }
}
```

## 配置 Cookie

框架提供了 `cookie` 的默认配置，配置文件位于 `src/config/cookie.js`，默认使用该配置文件的配置来设置 `cookie`:

```js
module.exports = {
  /** 浏览器的最长保存时间。是一个从服务器当前时刻开始的毫秒数。 */
  maxAge: 0,

  /** 失效时间，如果设置了 maxAge，expires 将会被覆盖。 */
  expires: '',

  /** 生效的 URL 路径，默认设置在根路径上（/） */
  path: '/',

  /** 设置是否对 Cookie 进行签名 */
  signed: true,

  /** 生效的域名 */
  domain: '',

  /** 是否可以被 js 访问，默认为 true，不允许被 js 访问 */
  httpOnly: true,

  /** 设置 key 相同的键值对如何处理，如果设置为 true，则后设置的值会覆盖前面设置的，否则将会发送两个 set-cookie 响应头 */
  overwrite: false,

  /** 设置只在 HTTPS 连接上传输 */
  secure: false,
}
```

我们也可以使用自定义配置作为参数传入构造函数:

```js {7,8,9}
const { Controller, Http, Cookie } = require('@dazejs/framework')

@Controller('users')
class User {
    @Http.Get()
    index() {
      const cookie = new Cookie('username', 'Dazejs', {
        // options
      })
      return this.response.withCookie(cookie).success({
        data: 'im data'
      })
    }
}
```

::: tip
单独设置 `signed` 配置后，获取 `cookie` 的时候需要传入一致的 `signed` 配置: `this.request.cookie('username', { signed: false })`
:::