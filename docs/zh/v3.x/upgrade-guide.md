# 升级指南

## 2.x -> 3.x

#### 详细更改：

- 移除自动绑定的类别前缀，这会使所有模块命名不允许重复， 例如 `@resource('user')` 和 `@service('user')` 无法同时使用，推荐使用 `@service('userService')` 来定义
- 对所有基类进行了重新命名 `Controller => BaseController`, `Service => BaseService` 等等, 使语义更加清晰，同时不会和装饰器命名产生冲突
- 添加 `@controller()` 装饰器，之前 `@route()` 装饰器作为 `@controller()` 装饰器的别名
- `@singleton()` , `@multiton()` , `@ignore()`， `@injectable()` 使用方式更改为 `@singleton` 类似直接使用，无需执行, 提升简洁度
- 添加 `@imports()` 装饰器，与 `@depends()` 对应， `@depends()` 会提前加载依赖的提供者, 而`@imports()` 会在当前提供者加载后加载, 并且移除了 `@depend()` 遗留版本的装饰的
- 类型 `TNext` 重命名为 `Next`
- 添加 `Application.create(...Providers)` 静态方法，可以通过该方法直接创建应用实例，并且可以传入 `Provider` 作为应用依赖的提供者
- 添加 `Application.createWithPath(path, ...Providers)` 静态方法, 可以自定义应用目录
- 添加 `@provider()` 装饰器，整合了 `@depends()` ,`@autoScan()`, `@imports()`， 如果需要同时实现3种功能，使用 `@provider()` 更为便捷
- `@config()` 装饰器重命名为 `@conf()`, 防止与 `Config` 类型冲突
