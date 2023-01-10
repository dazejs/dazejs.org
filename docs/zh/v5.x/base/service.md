# 服务层

服务层（Service）是从控制器抽象出来的一层特定逻辑层，该层主要用于定义从第三方服务获取数据的方法。

---

## 服务定义

`Service` 是一种特殊的组件，通过使用 `@Service` 来表示这是一个服务类

```ts
import { Service } from '@dazejs/framework';

@Service()
export default class User {
  async getItemById() {
    const data = await ajax.get(/* ... */)
    return data
  }
}

```

---

## 服务调用


### 注入

使用 `@Autowired` 装饰器注入到类属性或者方法中进行使用。

```ts
import { BaseController, controller, http, Autowired } from '@dazejs/frameowrk'
import UserService from '../service/user'

@controller('users')
export default class User {

  @Autowired
  userService: UserService; 

  @Get(':id')
  async show(id) {
    const user = await this.userService.getItemById(id);
    return user;
  }
}

```

---


