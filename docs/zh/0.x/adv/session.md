# SESSION

## SESSION 实例

- 通过 `request`  对象获取

  ```js
  const { Decorators, Controller } = require('@dazejs/framework')
  
  @Decorators.Router('users')
  class User extends Controller {
      @Decorators.Get()
      index() {
          const sess = this.request.session()
      }
  }
  
  module.exports = User
  ```

- 通过注入获取

  ```js
  const { Decorators, Controller } = require('@dazejs/framework')
  
  @Decorators.Router('users')
  class User extends Controller {
      @Decorators.Get()
      @Decorators.Session()
      index(sess) {
          // use sess
      }
  }
  
  module.exports = User
  ```



## 获取 SESSION

在获取到 `session` 实例之后我们就可以通过 `session#get(name)` 方法获取：

```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router('users')
class User extends Controller {
    @Decorators.Get()
    index() {
        const username = this.request.session().get('username')
    }
}

module.exports = User
```

或者直接使用 `request` 对象的 `getSession(name)` 方法

```js
const username = this.request.getSession('username')
```

## 设置 SESSION

使用 `session` 实例的 `set(name, value)` 方法来设置一个 `session`

```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router('users')
class User extends Controller {
    @Decorators.Get()
    index() {
        this.request.session().set('username', 'Zewail')
    }
}

module.exports = User
```



## 配置 SESSION

默认配置下，`Session` 的内容存储在` Cookie` 中, 用户每次请求都会带上 `Cookie`, 配置文件位于 `src/config/session.js`

```js
module.exports = {

  /** session 存储的 key */
  key: 'daze:sess',

  /** 强制在每个响应上设置会话标识符cookie。过期值重置为原始maxAge，重新设置过期倒计时 */
  rolling: false,

  /** 当会话快过期时更新会话，这样我们可以始终保持用户登录 */
  renew: false,

  /** session 存储类型： 可选 redis */
  type: '',
  /** type 为 'redis' 时，并且存在多个 redis 配置时使用，用于配置使用哪个redis配置 */
  database: '',

  /** type 为空或者 'cookie' 时使用如下 cookie 配置 */
  /** 过期时间（毫秒） */
  maxAge: 8640000,
  /** 是否覆盖前面设置的同名cookie */
  overwrite: true,
  /** 是否可以被 js 访问，默认为 true，不允许被 js 访问 */
  httpOnly: true,
  /** 设置是否对 Cookie 进行签名 */
  signed: true,
}

```

当 `type = ''` 时，`session` 会存储在 `cookie` 中，那么 `maxAge`, `overwrite`, `httpOnly`, `signed` 参数即可生效



## 扩展存储

框架提供了将 `Session` 存储到除了 `Cookie` 之外的其他存储的扩展方案，比如存储到 `Redis`中，框架默认添加了存储到 `redis` 的驱动, 我们只需要配置 `session.js` 配置文件，将 `type` 配置为 `redis`

```js
module.exports = {
    // ...
    type: 'redis',
    // ...
}
```

这样，框架就会加载 `src/config/database.js` 配置文件的 `redis` 数据库连接属性来连接 `redis`

```js

module.exports = {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
}

```

如果你定义了多个 `redis` 

```js

module.exports = {
  redis: {
      default: {
          host: '127.0.0.1',
          port: 6379,
      },
      session: {
          host: '127.0.0.1',
          port: 6379,
      }
  },
}
```

你可以通过 `session.js` 的 `database` 属性来配置

```js
module.exports = {
    // ...
    type: 'redis',
    database: 'session'
    // ...
}
```



