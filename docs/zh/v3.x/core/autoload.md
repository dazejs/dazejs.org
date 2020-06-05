# 自动加载

`Daze.js` 会自动扫描 `src/app` 目录，按功能分类加载，我们可以通过不用的类型装饰器来表示

---

## 模块分类
### 控制器类

使用 `@controller()` 装饰器

```ts
import { controller } from '@daze/framework'

@controller('/example')
export class Example{
  // ...
}

```

> 同时提供了大写的别名 `@Controller()`

### 中间件类
使用 `@middleware()` 装饰器

```ts
import { middleware, MiddlewareInterface } from '@daze/framework'

@middleware('example-middleware')
export class Example implements MiddlewareInterface {
  resolve(request, next) {
    // ...
    return next()
  }
}

```
> 中间件类需要实现 `MiddlewareInterface` 接口
> 同时提供了大写的别名 `@Middleware()`

### 服务类

使用 `@service()` 装饰器

```ts
import { service } from '@daze/framework'

@service('exampleService')
export class Example {
  // ...
}
```

> 同时提供了大写的别名 `@Service()`

### 验证器类

使用 `@validator()` 装饰器

```ts
import { validator, isEmail } from '@daze/framework'

@validator('exampleValidator')
export default class Example {
  @isEmail()
  email: string;
}
```

> 同时提供了大写的别名 `@Validator()`

### 资源类

使用 `@resource()` 装饰器

```ts
import { resource, ResourceInterface } from '@daze/framework'

@resource('exampleResource')
export class Example implements ResourceInterface {
  // ...
}

```

> 资源类需要实现 `ResourceInterface` 接口
> 同时提供了大写的别名 `@Resource()`

### 通用类

```ts
import { component } from '@daze/framework'

@component('exampleComponent')
export class Example {
  // ...
}

```

> 同时提供了大写的别名 `@Component()`

---

## 忽略加载

有时候我们不希望自动加载机制加载某个模块，可以使用 `@ignore` 标识

```ts
import { ignore } from '@daze/framework'

@ignore
export class Example {
  // ...
}
```

> 同时提供了大写的别名 `@Ignore`

---

## 模块命名

使用框架提供的 `@service()`, `@component()`, `@validator()`, `@resource()` 等装饰器来为模块进行重命名操作（实际上增加了绑定到容器的 `key`）。

```ts
import { service } from '@daze/framework'

@service('exampleService')
export class Example {
  sayHello() {
    return 'hello dazejs';
  }
}
```

**默认名称**

默认使用 `class` 的名称的小驼峰

默认绑定名字 `exampleService`
```ts
import { service } from '@daze/framework'

@service()
export class ExampleService {
  sayHello() {
    return 'hello dazejs';
  }
}
```

自动识别变量名进行注入 (根据注入的变量名找到自定义的模块名称进行注入)

```ts {5}
import { controller, http, inject } from '@dazejs/framework';
import ExampleService from '../service/example'

@controller('/examples')
export default class Example {
  @inject() 
  exampleService: ExampleService;

  @http.get()
  index() {
    return this.exampleService.sayHello()
  }
}
```

> 依赖注入详见 [依赖注入](#/docs/core/di) 章节