# 服务层

服务层（Service）是从控制器抽象出来的一层特定逻辑层，该层主要用于定义从第三方服务获取数据的方法。

---

## 服务定义

`Service` 是一种特殊的组件，通过使用 `@service` 来表示这是一个服务类

```ts
import { service } from '@dazejs/framework';

@service()
export default class User {
  async getItemById() {
    const data = await ajax.get(/* ... */)
    return data
  }
}

```

---

## 服务调用

### 方法获取

在控制器中，使用 `this.service(name)` 的方式来获取 `service` 实例

```ts
import { BaseController, controller, http } from '@dazejs/frameowrk'
import UserService from '../service/user'

@controller('users')
export default class User extends BaseController {
  @http.get(':id')
  async show(id) {
    const userService = this.service(UserService);
    const user = await userService.getItemById(id);
    return user;
  }
}


```

### 注入

使用 `@inject()` 装饰器注入到类属性或者方法中进行使用。

```ts
import { BaseController, controller, http, inject } from '@dazejs/frameowrk'
import UserService from '../service/user'

@controller('users')
export default class User extends BaseController {

  @inject(UserService) userService: UserService; // 会根据 `userService` 属性名自动注入命名为 `userService` 的组件

  @http.get(':id')
  async show(id) {
    const user = await this.userService.getItemById(id);
    return user;
  }
}

```

---

## 自定义名称

使用`@service()` 装饰器通过传入第一个参数实现

```ts
import { BaseService, service } from '@dazejs/framework';

@service('userService')
export default class User extends BaseService {
  async getItemById() {
    const data = await ajax.get(/* ... */)
    return data
  }
}

```

使用自定义名称注入

```ts
import { BaseController, controller, http, inject } from '@dazejs/frameowrk'
import UserService from '../service/user'

@controller('users')
export default class User extends BaseController {

  @inject() userService: UserService;

  @http.get(':id')
  async show(id) {
    const user = await this.userService.getItemById(id);
    return user;
  }
}

```

> 当需要注入的属性名与自定义名称一致的时候，可以省略参数

