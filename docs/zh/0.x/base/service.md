# 服务层
我们将控制器中的部分逻辑（用于调用其他应用服务的逻辑）分离出来，单独组成一个服务层

这个在做 node 中间层架构的时候非常有用
### 工具

使用`DAZE CLI`提供的 `daze make service` 命令创建服务文件：

```sh
daze make service <serviceName>
```

例如，创建一个 User 服务：

```sh
$ daze make service user
```

> 加上目录会自动创建目录


## 服务对象
在控制器中我们需要调用服务时，我们可以通过注入的方式获取服务对象：

> Service 装饰器会将加载的服务对象以路径的方式挂载到注入参数中

```js
const { Service } = require('@dazejs/framework').Decorators

class Post {
    @Service('pathto/user') userService = null;

	@Service('pathto/post')
    index(postService) {
        // postService and this.userService
    }
}

```
注入多个服务对象：
```js
const { Service } = require('@dazejs/framework').Decorators

class Post {
	@Service(['pathto/post', 'pathto/user', 'member'])
    index(service) {
        const [postService, userService, memberService] = service
        // ...
    }
}
```

## 依赖注入

服务类也支持注入：

```js
const { Request } = require('@dazejs/framework').Decorators

class Post {
    @Request()
    getItems(request) {
        // ...
    }
}
```

或者通过继承基础服务类

```js
const { Service } = require('@dazejs/framework')

class Post extends Service {
    getItems() {
        console.log(this.request)
    }
}
```

如果使用构造函数，需要传入 context 给父类

```js
const { Service } = require('@dazejs/framework')

class Post extends Service {
    constructor(context) {
        super(context)
        // ...
    }
    getItems() {
        console.log(this.request)
    }
}
```

