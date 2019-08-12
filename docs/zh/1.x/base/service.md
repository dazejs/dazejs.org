# 服务

服务（Service）是从控制器抽象出来的一层特定逻辑层，该层主要用于定义从第三方服务获取数据的方法。

## 服务定义

使用 `@Service` 装饰器来表示这是一个资源类

```js
const { Service } = require('@dazejs/framework');

@Service('user')
class User {
  async getItemById() {
    const data = await ajax.get(/* ... */)
    return data
  }
}

module.exports = User;
```


## 服务调用

### 方法获取

在控制器中，使用 `this.service(name)` 的方式来获取 `service` 实例

```js
const { Controller, Http } = require('@dazejs/frameowrk')

@Controller('users')
class User {
  @Http.Get(':id')
  async show(id) {
    const userService = this.service('user');
    const user = await userService.getItemById(id);
    return user;
  }
}

module.exports = User;
```

### 注入

使用 `@userService(user)` 装饰器注入到类属性或者方法中进行使用。

```js
const { Controller, Http, useService } = require('@dazejs/frameowrk')

@Controller('users')
class User {

  @useService('user') userService;

  @Http.Get(':id')
  async show(id) {
    const user = await this.userService.getItemById(id);
    return user;
  }
}

module.exports = User;
```