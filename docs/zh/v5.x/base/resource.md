# 资源层

资源层就是在服务接口与返回给用户的 `JSON` 之间添加一层转换层

---

## 资源定义

资源是一种特殊的组件，通过使用 `@Resourcer()` 表示这是一个资源类

```ts
import { Resourcer } from '@dazejs/framework';

@Resourcer()
export class User {
  resolve(data) {
    return {
      ...data,
    };
  }
}

```

---

## 核心概念

资源类本质上是一个对象或数组的转换规则，可以将某一类数据以抽象的方式定义成一类资源，在需要的地方调用资源类进行数据转换，好处是可以抽象化资源数据，方便管理

每一个资源类都必须实现一个 `resolve` 方法，该方法接收一个对象参数，表示单个资源数据 

## 资源转换

在控制器中，我们可以直接返回 `resource()` 生成的 `Resource` 实例，框架会自动处理

```ts
import { Controller, Get, resource } from '@dazejs/framework';
import UserResource from '../resources/user'

@Controller('/users')
export class User {
  @Get('/:id')
  show() {
    return resource(UserResource).item({
      username: 'Dazejs',
    })
  }
}

```

如果不是在控制器中，我们可以调用 `Resource` 实例的 `transform()` 方法来手动转换


```ts
import { Service, resource } from '@dazejs/framework';
import UserResource from '../resources/user'

@Service()
export class User {
  getItemById(id) {
    const user = {
      id,
      username: 'Dazejs',
    };
    return resource(UserResource).item(user).transform();
  }
}

```
---

## 单个资源

可以使用 `item(data)` 方法来生成单个资源的转换对象

```ts
import { Controller, Get, resource } from '@dazejs/framework';
import UserResource from '../resources/user'

@Controller('/users')
export default class User {
  @Get('/:id')
  show() {
    return resource(UserResource).item({
      username: 'Dazejs',
    })
  }
}

```

---

## 资源集合

使用 `collection(data)` 方法来生成资源集合的转换对象

```ts
import { Controller, Get, resource } from '@dazejs/framework';
import UserResource from '../resources/user'

@Controller('/users')
export default class User {
  @Get()
  index() {
    const users = [{
        age,
        name: 'Dazejs',
      },{
        age,
        name: 'Zewail',
      }];
    return resource(UserResource).collection(users)
  }
}

```

## 数据包装

默认情况下，被转换的数据被包裹到 `data` 属性中：

```json
{
  "data": [{
    "age": 18,,
    "name": "Dazejs",
  },{
    "age": 18,
    "name": "Zewail",
  }]
}
```

如果想要禁止包装最外层资源，可以调用资源类提供的 `withoutKey()` 方法

```ts
import { Controller, Get, resource } from '@dazejs/framework';
import UserResource from '../resources/user'

@Controller('/users')
export class User {
  @Get()
  index() {
    const users = [{
        age: 18,
        name: 'Dazejs',
      },{
        age: 18,
        name: 'Zewail',
      }];
    return resource(UserResource).collection(users).withoutKey();
  }
}

```

如果想修改包装属性，可以调用资源类提供的 `setKey(key)` 方法

---

## 资源嵌套

有时候我们需要在一个资源中调用另一个资源做为资源，我们可以使用 `资源嵌套` 的方式，例如我们转换 `user` 数据的嵌套 `comments` 资源：

`comment` 资源定义:

```ts {7}
import { Resourcer } from '@dazejs/framework';

@Resourcer()
export class Comment {
  resolve(data) {
    return {
      cid: data.id,
      content: data.content,
      /// ...more
    };
  }
}

```

`user` 资源定义:

```ts {8}
import { BaseResource, Resourcer } from '@dazejs/framework';
import CommentResource from './comment'

@Resourcer()
export class User extends BaseResource {
  resolve(user) {
    return {
      username: user.username,
      sex: user.sex == 1 ? 'man' : 'woman',
      comments: this.resource(CommentResource).collection(user.comments),
    };
  }
}

```

输入数据：

```json
{
  "username": "Dazejs",
  "sex": 1,
  "comments": [
    {
      "id": 100,
      "content": "im comment"
    }
  ]
}
```

输出数据：

```json {3,6}
{
  "username": "Dazejs",
  "sex": "man",
  "comments": [
    {
      "cid": 100,
      "content": "im comment"
    }
  ]
}
```

---
