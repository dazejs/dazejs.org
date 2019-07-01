# 控制器

控制器负责处理传入的请求，并返回对客户端的响应，控制器文件推荐放在 `src/app/controller` 目录下。

## 定义控制器

我们使用 `@Controller([prefix])` 装饰器来表示一个控制器类：

```js {3}
const { Controller } = require('@dazejs/framework')

@Controller()
class UserController {
  // ...
}

module.exports = UserController
```

我们也可以使用 `Daze CLI` 工具创建控制器：

```txt
daze make controller <controllerName> <options>
Options:
    -r, --resource  创建 Rest 资源控制器
```

例如，创建一个 User 控制器：

```bash
$ daze make controller user
```

创建一个带资源方法的 Rest 资源控制器：

```bash
daze make controller home/user -r
```

## 路由端点

框架提供了 `Get`, `Post`, `Put`,`Patch`,`Del`,`Head`,`Option`, `All` 装饰器（位于 `Http` 命名空间下），用于创建访问端点：

```js
const { Controller, Http } = require('@dazejs/framework')

// 当前控制器的端点访问以 '/users' 开头
@Controller('users')
class User {
    // get /users
    @Http.Get()
    index() {
        // ...
    }

    // put /users/:id
    @Http.Put(':id')
    update(id) {
        // ...
    }
}
```

上面代码会自动创建`get`方法访问的`/users`的端点与`put`方法访问的`/users/:id`的端点

::: warning
`@All` 装饰器会使用所有 `http` 模块支持的方法，详细信息见 `http` 模块的 `http.METHODS` 属性
:::

## 路由参数

端点的参数框架会自动注入到控制器方法中：

```js
const { Controller, Http } = require('@dazejs/framework')

@Controller()
class User {
    @Http.Get('/:name/:age')
    index(name, age) {
        // ...
    }
}
```

::: tip
路由参数根据定义顺序注入
:::

## REST 控制器

使用 `@RestController` 装饰器代替 `@Controller` 装饰器，并且默认 `Rest` 方法无需添加装饰器:

```js
const { RestController } = require('@dazejs/framework')

@RestController('posts')
class Post {
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
| get      | /posts          | index      | 索引/列表        |
| get      | /posts/create   | create     | 创建（显示表单)  |
| post     | /posts          | store      | 保存你创建的数据 |
| get      | /posts/:id      | show       | 获取对应id的内容 |
| get      | /posts/:id/edit | edit       | 编辑（显示表单） |
| put      | /posts/:id      | save       | 保存你编辑的数据 |
| delete   | /posts/:id      | destroy    | 删除对应id的内容 |

## 控制器属性

框架提供了控制器内置属性，用来强化控制器的功能, 我们可以用过控制器实例非常便捷的获取请求数据，操作响应等等：
```js
const { Controller, Http } = require('@dazejs/framework')

@Controller()
class User {
    @Http.Get(':id')
    show(id) {
        console.log(this.request) // 获取请求实例
        console.log(this.query) // 获取请求 query
        console.log(this.querystring) // 获取请求 querystring
        // 更多属性...
    }
}

module.exports = User
```

控制器提供了以下内置属性：

| 属性/方法 | 说明                   |
| --------- | ---------------------- |
| app       | 框架 Application 对象  |
| config    | 配置对象               |
| messenger | IPC通信对象            |
| request   | 请求对象               |
| response  | 响应对象               |
| redirect  | 跳转对象               |
| cookie    | Cookie 对象            |
| session   | Session 对象           |
| view      | 模板对象               |
| body      | 请求对象的 body        |
| params    | 路由对象的所有参数     |
| query     | 请求对象的 query       |
| headers   | 请求对象的 headers     |
| render()  | 模板对象的 rende r方法 |
| assign()  | 模板对象的 assign 方法 |

<!-- ## Service 层

如果需要对控制器进行分层 -->
