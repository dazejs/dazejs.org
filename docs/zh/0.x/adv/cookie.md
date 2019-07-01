
# COOKIE

## 获取 COOKIE

- 通过 `request` 对象获取：

  ```js
  const { Decorators, Controller } = require('@dazejs/framework')
  
  @Decorators.Router('users')
  class User extends Controller {
      @Decorators.Get()
      index() {
          const username = this.request.getCookie('username')
          console.log(username)
      }
  }
  
  module.exports = User
  ```

- 通过注入：

  ```js
  const { Decorators, Controller } = require('@dazejs/framework')
  
  @Decorators.Router('users')
  class User extends Controller {
      // 获取单个cookie
      @Decorators.Get()
      @Decorators.Cookie('username')
      index(username) {
          console.log(username)
      }
      
      // 获取多个cookie
      @Decorators.Get('test')
      @Decorators.Cookie(['username', 'isLogin'])
      test(cookies) {
         	const [username, isLogin] = cookies
          console.log(username, isLogin)
      }
  }
  
  module.exports = User
  ```

## 设置 COOKIE

 `cookie`  是跟随响应一起发送的，我们我们需要将 `Cookie` 实例附加在响应对象上来设置`cookie`

```js
const { Decorators, Controller, Cookie } = require('@dazejs/framework')

@Decorators.Router('users')
class User extends Controller {
    @Decorators.Get()
    index() {
        const cookie = new Cookie('username', 'Zewail')
        return this.response.withCookie(cookie)
    }
}

module.exports = User
```

`response` 对象上还添加了简便方法 `cookie(name, value [, options])` 来设置`cookie`：

```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router('users')
class User extends Controller {
    @Decorators.Get()
    index() {
        return this.response.cookie('username', 'Zewail')
    }
}

module.exports = User
```

另外框架还提供了全局函数`cookie(name, value [, options])` 来创建`Cookie`实例

```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router('users')
class User extends Controller {
    @Decorators.Get()
    index() {
        const ck = cookie('username', 'Zewail')
        ck.setValue('ChanZewail')
        return this.response.withCookie(ck)
    }
}

module.exports = User
```

> 全局函数 `cookie()` 只是简化了 `new Cookie` 的书写

## 配置 COOKIE

框架提供了 `cookie` 的默认配置，配置文件位于 `src/config/cookie.js`，默认使用该配置文件的配置来设置 `cookie`
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

我们也可以使用自定义配置作为参数传入`cookie()` 函数或者构造函数等:

```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router('users')
class User extends Controller {
    @Decorators.Get()
    index() {
        const ck = cookie('username', 'Zewail', {
            /** cookie options */
        })
        return this.response.withCookie(ck)
    }
}

module.exports = User
```

>  主动设置 `signed` 配置后，获取 `cookie` 的时候需要传入一致的 `signed` 配置: `this.request.getCookie('username', { signed: false })`



