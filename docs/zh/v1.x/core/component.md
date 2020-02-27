# 组件模式

在 `Daze.js` 中，以特定方式在容器中注册的模块我们都叫做 `组件`，例如 `Service`、`Middleware`、`Validator` 等等都是组件

## 注册到容器

组件就是一个普通的类，借助于框架的自动加载机制，我们使用 `@Component(name)` 装饰器来进行组件的注册：

```ts {3}
import { Component } from '@dazejs/framework'

@Component('example')
export default class Example {
  // ...
}
```

::: tip
如果组件继承了系统组件的基类(`Service`、`Middleware`、`Validator` 等等), 框架还会对这些组件进行进一步分类
:::

## 使用组件

对于普通组件，我能可以通过 `@useComponent(name)` 装饰器进行注入来进行使用

```ts
import { Controller, Route, Http, useComponent } from '@dazejs/framework'

@Route('/example')
export default class Example extends Controller {
  @useComponent('example') exampleComponent;

  @Http.Get('/:id')
  show() {
    // use this.exampleComponent
  }
}

```

对于系统内置组件，框架封装了对应的获取装饰器从指定分类中获取（防止命名冲突）,使用 `@useService(name)` 类似的装饰器进行注入

