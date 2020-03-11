# 资源层

资源层就是在服务接口与返回给用户的 `JSON` 之间添加一层转换层

---

## 资源定义

资源是一种特殊的组件，通过继承 `Resource` 基础类来表示这是一个资源类

```ts
import { Resource } from '@dazejs/framework';

export default class User extends Resource {
  resolve(data) {
    return {
      ...data,
    };
  }
}

```

> 每个资源类都需要实现 `resolve` 方法 

---

## 核心概念

资源类本质上是一个对象或数组的转换规则，可以将某一类数据以抽象的方式定义成一类资源，在需要的地方调用资源类进行数据转换，好处是可以抽象化资源数据，方便管理

每一个资源类都必须实现一个 `resolve` 方法，该方法接收一个对象参数，表示单个资源数据 

## 资源转换

在控制器中，我们可以直接返回 `this.resource()` 生成的 `Resource` 实例，框架会自动处理

```ts
import { Controller, route,  http } from '@dazejs/framework';
import UserResource from '../resources/user'

@route('/users')
export default class User extends Controller {
  @http.get('/:id')
  show() {
    return this.resource(UserResource).item({
      username: 'Dazejs',
    })
  }
}

```

如果不是在控制器中，我们可以调用 `Resource` 实例的 `transform()` 方法来手动转换


```ts
import { Service } from '@dazejs/framework';
import UserResource from '../resources/user'

export default class User extends Service {
  getItemById(id) {
    const user = {
      id,
      username: 'Dazejs',
    };
    return this.resource(UserResource).item(user).transform();
  }
}

```

> 也可以使用 `this.item(data, validator)` 来调用

---

## 单个资源

可以使用 `item(data)` 方法来生成单个资源的转换对象

```ts
import { Controller, Route, Http } from '@dazejs/framework';
import UserResource from '../resources/user'

@route('/users')
export default class User extends Controller {
  @http.get('/:id')
  show() {
    return this.resource(UserResource).item({
      username: 'Dazejs',
    })
  }
}

```

---

## 资源集合

使用 `collection(data)` 方法来生成资源集合的转换对象

```ts
import { Controller, route, http } from '@dazejs/framework';
import UserResource from '../resources/user'

@Route('/users')
export default class User extends Controller {
  @http.get()
  index() {
    const users = [{
        age,
        name: 'Dazejs',
      },{
        age,
        name: 'Zewail',
      }];
    return this.resource(UserResource).collection(users)
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
import { Controller, route, http } from '@dazejs/framework';
import UserResource from '../resources/user'

@Route('/users')
export default class User extends Controller {
  @http.get()
  index() {
    const users = [{
        age: 18,
        name: 'Dazejs',
      },{
        age: 18,
        name: 'Zewail',
      }];
    return this.resource(UserResource).collection(users).withoutKey();
  }
}

```

如果想修改包装属性，可以调用资源类提供的 `setKey(key)` 方法

---

## 资源嵌套

有时候我们需要在一个资源中调用另一个资源做为资源，我们可以使用 `资源嵌套` 的方式，例如我们转换 `user` 数据的嵌套 `comments` 资源：

`comment` 资源定义:

```ts {7}
import { Resource } from '@dazejs/framework';

export default class Comment extends Resource {
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
import { Resource } from '@dazejs/framework';
import CommentResource from './comment'

export default class User extends Resource {
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

## 自定义名称

使用通用的 `@component()` 装饰器为 `Resource` 类命名

```ts
import { Resource, component } from '@dazejs/framework';

@component('userResource')
export default class User extends Resource {
  resolve(data) {
    return {
      ...data,
    };
  }
}

```

使用自定义名称注入

```ts
import { Controller, route, http, inject } from '@dazejs/framework';
import UserResource from '../resources/user'

@Route('/users')
export default class User extends Controller {

  @inject() userResource: UserResource;

  @http.get()
  index() {
    const users = [{
        age: 18,
        name: 'Dazejs',
      },{
        age: 18,
        name: 'Zewail',
      }];
    return this.userResource.collection(users);
  }
}

```

> 当需要注入的属性名与自定义名称一致的时候，可以省略参数
