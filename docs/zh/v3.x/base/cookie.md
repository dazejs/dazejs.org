# Cookie

可以通过 `Cookie` 类操作 `cookie`

## 读取 Cookie

通过 `request` 对象获取：

```ts {8}
import { controller, http, BaseController } from '@dazejs/framework'

@controller('users')
export class User extends BaseController {
    @http.get()
    index() {
      const key = 'username';
      console.log(this.request.cookieValue(key)) // this.request.cookie 的别名方法
    }
}
```

使用注入：
```ts {6,8}
import { controller, http, BaseController, cookieValue } from '@dazejs/framework'

@controller('users')
export class User extends BaseController {
    @http.get()
    index(@cookieValue('username') usernameCookie: string) {
      console.log(usernameCookie)
    }
}
```

---

## 响应 Cookie
`cookie` 是跟随响应一起发送的，我们我们需要将 `Cookie` 实例附加在响应对象上来设置 `cookie`

```ts {7,8,9,10}
import { controller, http, BaseController, Cookie } from '@dazejs/framework'

@controller('users')
export class User extends BaseController {
    @http.get()
    index() {
      const cookie = new Cookie('username', 'Dazejs')
      return this.response().withCookie(cookie).success({
        data: 'im data'
      })
    }
}
```

`response` 对象上还添加了简便方法 `cookie(name, value [, options])` 来设置 `cookie`：

```ts {7,8,9}
import { controller, http, BaseController } from '@dazejs/framework'

@controller('users')
export default class User extends BaseController {
    @http.get()
    index() {
      return this.response().cookie('username', 'Dazejs').OK({
        data: 'im data'
      })
    }
}
```

---

## 配置 Cookie

框架提供了 `cookie` 的默认配置，配置文件位于 `src/config/cookie.js`，默认使用该配置文件的配置来设置 `cookie`:

也可以使用自定义配置作为参数传入构造函数:

```ts {7,8,9}
import { controller, http, BaseController, Cookie } from '@dazejs/framework'

@controller('users')
export default class User extends BaseController {
    @http.get()
    index() {
      const cookie = new Cookie('username', 'Dazejs', {
        // options
      })
      return this.response().withCookie(cookie).OK({
        data: 'im data'
      })
    }
}
```

> 单独设置 `signed` 配置后，获取 `cookie` 的时候需要传入一致的 `signed` 配置: `this.request.cookieValue('username', { signed: false })`