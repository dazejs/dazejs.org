# 依赖注入

依赖注入（`Dependency Injection`）简称 `DI`, 它是实现控制反转（`Inversion of Control – IoC`）的一个模式, `DI` 的本质目的是为了解耦，保持组件之间的松散耦合，为设计开发带来灵活性。

---

## 自动注入

使用 `@Autowried` 来进行自动识别注入

```ts {6}
import { Get, Controller, Autowired } from '@dazejs/framework'
import UserService from '../service/user'

@controller('/examples')
export class Example {

  @Autowired
  userService: UserService;

  @Get()
  index() {
    // this.userService.foo()
  }
}
```