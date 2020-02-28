# 服务层

服务层（Service）是从控制器抽象出来的一层特定逻辑层，该层主要用于定义从第三方服务获取数据的方法。

---

## 服务定义

`Service` 是一种特殊的组件，通过继承 `Service` 基础类来表示这是一个服务类

```ts
import { Service } from '@dazejs/framework';

export default class User extends Service {
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
import { Controller, route, http } from '@dazejs/frameowrk'
import UserService from '../service/user'

@route('users')
export default class User extends Controller {
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
import { Controller, route, http, inject } from '@dazejs/frameowrk'
import UserService from '../service/user'

@route('users')
export default class User extends Controller {

  @inject(UserService) userService: UserService;

  @http.get(':id')
  async show(id) {
    const user = await this.userService.getItemById(id);
    return user;
  }
}

```