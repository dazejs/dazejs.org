# 自动加载

`Daze.js` 会自动扫描 `src/app` 目录，按功能分类加载，我们可以通过不用的类型装饰器来表示

---

## 模块分类
### 控制器类

使用 `@Controller()` 装饰器

```ts
import { Controller } from '@dazejs/framework'

@Controller('/example')
export class Example{
  // ...
}

```

> 同时提供了大写的别名 `@Controller()`

### 中间件类
使用 `@Middleware()` 装饰器

```ts
import { Middleware, MiddlewareInterface } from '@dazejs/framework'

@Middleware()
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

使用 `@Service()` 装饰器

```ts
import { Service } from '@dazejs/framework'

@Service()
export class Example {
  // ...
}
```

> 同时提供了大写的别名 `@Service()`

### 验证器类

使用 `@Validator()` 装饰器

```ts
import { Validator, IsEmail } from '@dazejs/framework'

@Validator()
export default class Example {
  @IsEmail()
  email: string;
}
```

> 同时提供了大写的别名 `@Validator()`

### 资源类

使用 `@Resource()` 装饰器

```ts
import { Resource, ResourceInterface } from '@dazejs/framework'

@Resource()
export class Example implements ResourceInterface {
  // ...
}

```

> 资源类需要实现 `ResourceInterface` 接口
> 同时提供了大写的别名 `@Resource()`

### 通用类

```ts
import { Component } from '@dazejs/framework'

@Component()
export class Example {
  // ...
}

```

> 同时提供了大写的别名 `@Component()`

---

## 忽略加载

有时候我们不希望自动加载机制加载某个模块，可以使用 `@ignore` 标识

```ts
import { Ignore } from '@dazejs/framework'

@Ignore
export class Example {
  // ...
}
```

> 同时提供了大写的别名 `@Ignore`

---

> 依赖注入详见 [依赖注入](#/docs/core/di) 章节