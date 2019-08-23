# 提供者

框架底层是一个容器，所有的功能都是由提供者提供，提供者即提供能力的服务/模块，可以通过提供者文件将提供者注册到框架，自定义提供者位于 `src/app/provider` 文件夹

## 定义提供者

使用 `@Provider()` 装饰器标记这是一个提供者：
```js

const { Provider } = require('@dazejs/framework')

@Provider()
class CustomProvider {
  // ...
}

module.exports = CustomProvider;
```

## Hooks

框架在运行提供者的时候，会执行两个 `Hook` (`register` 和 `launch`):

### `register()`

每次注册提供者框架都会调用提供者的 `register` 方法

```js
const { Provider } = require('@dazejs/framework')

@Provider()
class CustomProvider {
  register() {
    // todo
  }
}

module.exports = CustomProvider;
```

::: tip
`register` 方法支持异步
:::

### `lanuch()`

框架会在执行完所有提供者的 `register Hook` 之后执行 `launch`, 所以我们可以在 `launch` 方法中获取到所有已注册的提供者，而无需关心注册顺序


```js
const { Provider } = require('@dazejs/framework')

@Provider()
class CustomProvider {
  lanuch() {
    // todo
  }
}

module.exports = CustomProvider;
```
::: tip
`lanuch` 方法支持异步
:::

## 注册时绑定

绝大部分情况我们都可以在 `register` 方法中进行绑定容器操作

```js
const { Provider } = require('@dazejs/framework')

@Provider()
class CustomProvider {
  constructor(app) {
    this.app = app
  }

  register() {
    this.app.singleton('some_key', (app) => {
      return new SomeCustomClass(app);
    }, true);
  }
}

module.exports = CustomProvider;
```
