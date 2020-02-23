# 依赖注入

依赖注入（`Dependency Injection`）简称 `DI`, 它是实现控制反转（`Inversion of Control – IoC`）的一个模式, `DI `的本质目的是为了解耦，保持组件之间的松散耦合，为设计开发带来灵活性。

## 认识 `Component`

在 `Daze.js` 中，容器中注册的所有模块我们都称之为 `组件（Component）`, 组件之间可以相互依赖， 我们通过 `@Component` 装饰器来声明组件

```ts {3}
import { Component } from '@dazejs/framework'

@Component('example')
export default class Example {
  // ...
}
```

## 注入

使用 `@userComponent` 来注入组件

- 注入到类属性中

```ts {5}
import { Route, Http, Controller, useComponent } from '@dazejs/framework'

@Route('/examples')
export default class Example extends Controller {
  @useComponent('example') exampleComponent;

  @Http.Get()
  index() {
    // ...
  }
}

module.exports = Example;
```

- 注入到类方法中

```ts {6}
import { Route, Http, Controller, useComponent } from '@dazejs/framework'

@Route('/examples')
export default class Example extends Controller {
  @Http.Get()
  @useComponent('example')
  index(exampleComponent) {
    // ...
  }
}
```

- 注入到类构造函数中

```ts {4}
import { Route, Http, Controller, useComponent } from '@dazejs/framework'

@Route('/examples')
@useComponent('example')
export default class Example extends Controller {
  constructor(exampleComponent) {
    this.exampleComponent = exampleComponent;
  }
  @Http.Get()
  index(exampleComponent) {
    // ...
  }
}
```