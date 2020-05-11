# 依赖注入

依赖注入（`Dependency Injection`）简称 `DI`, 它是实现控制反转（`Inversion of Control – IoC`）的一个模式, `DI` 的本质目的是为了解耦，保持组件之间的松散耦合，为设计开发带来灵活性。

---

## 类属性注入

使用 `@inject()` 来注入依赖对象

```ts {5}
import { http, controller, inject } from '@dazejs/framework';
import UserService from '../serv/user'

@controller('/examples')
export class Example {

  @inject(UserService)
  userService: UserService;

  @http.get()
  index() {
    // this.userService.foo()
  }
}
```
---

## 类方法注入

使用 `@inject()` 来注入依赖对象

```ts {6}
import { http, controller, inject } from '@dazejs/framework'
import UserService from '../service/user'

@controller('/examples')
export class Example{
  @http.get()
  index(@inject(UserService) userService: UserService) {
    // ...
  }
}
```

---

## 类构造函数注入

```ts {4}
import { http, controller, inject } from '@dazejs/framework'
import UserService from '../service/user'

@controller('/examples')
@inject(UserService)
export class Example {
  exampleComponent: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @http.get()
  index() {
    // ...
  }
}
```

---

## 自动识别注入

使用 `@autowired` 来进行自动识别注入 (同时提供了 `@Autowried` 大写版本)

```ts {6}
import { http, controller, inject, autowired } from '@dazejs/framework'
import UserService from '../service/user'

@controller('/examples')
export class Example {

  @autowired
  userService: UserService;

  @http.get()
  index() {
    // this.userService.foo()
  }
}
```