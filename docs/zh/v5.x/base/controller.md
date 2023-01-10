# 控制器

控制器负责处理传入的请求，并返回对客户端的响应。

---

## 定义

控制器使用装饰器 `@Controller()`

```ts {3}
import { Controller } from '@dazejs/framework'

@Controller()
export default class User {
  // ...
}

```

---

## 定义路由

控制器使用 `@Controller([prefix])` 装饰器来表示该控制器使用了路由功能

```ts
import { Controller } from '@dazejs/framework'

// 当前控制器的端点访问以 '/users' 开头 (可省略开头 '/')
@Controller('/users')
export default class {
  // ...
}
```

框架提供了 `Get`, `Post`, `Put`,`Patch`,`Del`,`Head`,`Options`, `All` 装饰器，用于创建访问路由：

```ts
import { Controller } from '@dazejs/framework'

// 当前控制器的端点访问以 '/users' 开头 (可省略开头 '/')
@Controller('users')
export class User {
    // Get /users
    @Get()
    index() {
        // ...
    }

    // put /users/:id
    @Put(':id')
    update(id) {
        // ...
    }
}
```

上面代码会自动创建`Get`方法访问的`/users`的端点与`put`方法访问的`/users/:id`的端点

> `@http.all` 装饰器会使用所有 `http` 模块支持的方法，详细信息见 `http` 模块的 `http.METHODS` 属性


### 路由多前缀

在某些情况下，我们可能需要支持一个控制器多个路由前缀的情况

```ts
import { Controller } from '@dazejs/framework'

// 通过添加多个 `@route` 参数来注册多个前缀的路由
@Controller('/users', '/users-old')
export default class User {
    // Get /users
    @Get()
    index() {
        // ...
    }

    // put /users/:id
    @Put(':id')
    update(id) {
        // ...
    }
}
```

### 方法多路由


在某些情况下，我们也可能需要同一个控制器方法支持多个路由访问


```ts
import { Controller } from '@dazejs/framework'

@Controller('/users')
export class User {
    @Get()
    @Post('/post')
    index() {
        // ...
    }

    @All('/all', ['Get', 'post']) // 第二个参数可选，默认加载http所有method（不推荐）
    index2() {
        // ...
    }
}
```


---

## 路由参数

路由的参数框架会自动注入到控制器方法中：

```ts
import { Controller } from '@daze/framework';

@Controller()
export class User {
    @Get('/:name/:age')
    index(name, age) {
        // ...
    }
}
```

> 路由参数根据定义顺序注入



---

## REST 风格

使用 `@rest` 装饰器代替 `@route` 装饰器，并且默认 `Rest` 方法无需添加装饰器:

```ts
import { rest } from '@daze/framework';

@rest('posts')
export class Post {
   /**
   * Display a listing of the resource.
   */
  index() {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  create() {
    //
  }

  /**
   * Display the specified resource.
   * @param {number} id
   */
  show(id) {
    //
  }

  /**
   * Show the form for editing the specified resource.
   * @param {number} id
   */
  edit(id) {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  store() {
    //
  }

  /**
   * Update the specified resource in storage.
   * @param {number} id
   */
  update(id) {
    //
  }

  /**
   * Remove the specified resource from storage.
   * @param {number} id
   */
  destroy(id) {
    //
  }
}
```

内置 `Rest` 风格方法：

| 请求类型 | 资源地址        | 控制器方法 | 说明             |
| -------- | --------------- | ---------- | ---------------- |
| Get      | /posts          | index()      | 索引/列表        |
| Get      | /posts/create   | create()     | 创建（显示表单)  |
| Post     | /posts          | store()      | 保存你创建的数据 |
| Get      | /posts/:id      | show(id)       | 获取对应id的内容 |
| Get      | /posts/:id/edit | edit(id)       | 编辑（显示表单） |
| Put      | /posts/:id      | save(id)       | 保存你编辑的数据 |
| Delete   | /posts/:id      | destroy(id)    | 删除对应id的内容 |

---

## 路由原理

### 路由结构

`Daze.js` 采用了类似前缀树的数据结构来存储路由，例如我们有一个 `path`: `/business/users/posts/:post_id`, 那么它的结构就是一个链表:

```text
+----------+     +-----------+     +-------+     +----------+
| business | --> |   users   | --> | posts | --> | :post_id |
+----------+     +-----------+     +-------+     +----------+
```

接下来如果继续注册 `/business/orders/:order_id`, 那么这个结构就会变成


```text
+----------+     +-----------+     +-------+     +----------+
| business | --> |   users   | --> | posts | --> | :post_id |
+----------+     +-----------+     +-------+     +----------+
  |
  |
  v
+----------+     +-----------+
|  orders  | --> | :order_id |
+----------+     +-----------+
```

### 路由类型

为了增加匹配的性能，我们将路由分成了三种类型 `静态类型`, `正则类型`, `全匹配类型`

**静态类型**

静态类型就是指字符串完全匹配的类型，避免所有节点都需要正则匹配，降低性能

**正则类型**

只有注册了路由参数/正则的节点才会进行正则匹配

**全匹配类型**

全匹配类型是指以 `/*` 结尾的路由，它可以匹配后续任何参数

### 路由优先级

框架会自动为注册的路由指定优先级，优先级策略如下：

- 节点经过次数最多的路由，优先级最高
- 全匹配路由优先级最低，为了保证不会因为全匹配路由覆盖了其他类型的路由



