# 依赖注入

依赖注入（`Dependency Injection`）简称 `DI`, 它是实现控制反转（`Inversion of Control – IoC`）的一个模式, `DI `的本质目的是为了解耦，保持组件之间的松散耦合，为设计开发带来灵活性。


## 注入

使用 `@inject` 来注入依赖对象

- 注入到类属性中

```ts {5}
import { route, http, Controller, inject } from '@dazejs/framework';
import UserService from '../serv/user'

@route('/examples')
export default class Example extends Controller {

  @inject(UserService) userService: UserService;

  @http.get()
  index() {
    // ...
  }
}
```

- 注入到类方法参数中

```ts {6}
import { route, http, Controller, inject } from '@dazejs/framework'
import UserService from '../service/user'

@route('/examples')
export default class Example extends Controller {
  @http.get()
  index(@inject(UserService) userService: UserService) {
    // ...
  }
}
```

- 注入到类构造函数中

```ts {4}
import { route, http, Controller, inject } from '@dazejs/framework'
import UserService from '../service/user'

@route('/examples')
@inject(UserService)
export default class Example extends Controller {
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