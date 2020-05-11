# 提供者

框架底层是一个容器，所有的功能都是由提供者提供，提供者即提供能力的服务/模块，可以通过提供者文件将提供者注册到框架。

---

## 定义提供者


```ts
export class CustomProvider {
  // ...
}
```
---

## 加载提供者

定义好提供者后，我们需要配置框架让框架加载该提供者

加载提供者的配置在 `src/config/app.js` 配置文件中：

```ts
import CustomProvider from '../../privider/custom'

export default {
  // ...
  providers: [
    CustomProvider, 
  ],
  // ...
}
```

---

## 自动提供

使用 `@provide` 装饰器，可以将 `Provider` 上的方法自动绑定到容器中

```ts
import { provide } from '@dazejs/framework'

export class CustomProvider {
  @provide()
  redis() {
    return new Redis({
      // ...
    })
  }
}
```

上述例子中，该提供者像框架注册了以 `redis` 作为 key 将 `Redis` 注册到了容器中，如果想用其他 key，我可以传入参数到 `@provide` 实现

```ts
@provide('custom-key')
redis() {
  return new Redis({
    // ...
  })
}
```

默认情况下， `@provide` 以单例的形式绑定，如果想绑定多例, 可以将第二个参数 `isShared` 设置为 `false`

```ts
@provide('custom-key', false)
redis() {
  return new Redis({
    // ...
  })
}
```

---

## Hooks

框架在运行提供者的时候，会执行两个 `Hook` (`register` 和 `launch`):

### `register()`

每次注册提供者框架都会调用提供者的 `register` 方法

```ts

export class CustomProvider {
  register() {
    // todo
  }
}

```

> `register` 方法支持异步

### `lanuch()`

框架会在执行完所有提供者的 `register Hook` 之后执行 `launch`, 所以我们可以在 `launch` 方法中获取到所有已注册的提供者，而无需关心注册顺序


```ts

export default class CustomProvider {
  lanuch() {
    // todo
  }
}
```
> `lanuch` 方法支持异步


### 注册时绑定

绝大部分情况我们都可以在 `register` 方法中进行绑定容器操作

```ts

export class CustomProvider{
  register() {
    this.app.singleton('some_key', (app) => {
      return new SomeCustomClass(app);
    }, true);
  }
}
```

---

## 提供者之间的依赖

提供者之前也可以定义依赖，例如提供者 `A` 依赖了提供者 `B`, 我们只需要将 `A` 注册到框架，那么 `B` 也会注册到框架中

**提供者 B**
```ts
import { provide } from '@dazejs/framework'

export class B {
  @provide()
  b() {
    return 'b'
  }
}
```
使用 `@depend` 配置依赖关系

**提供者 A**
```ts
import { provide, depend } from '@dazejs/framework'
import { B } from './b'

@depend(B)
export class A {
  @provide()
  a() {
    return 'a'
  }
}
```

