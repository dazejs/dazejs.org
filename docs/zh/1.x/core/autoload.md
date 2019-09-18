# 加载机制

`Daze.js` 会自动扫描 `src/app` 目录，按功能分类加载，我们可以通过继承不同类型的基类，来进行功能分类

## 文件分类
### 控制器类

继承 `Controller` 基础类

```js
const { Route, Controller } = require('@daze/framework');

@Route('example')
class Example extends Controller {
  // ...
}

module.exports = Example;
```

### 中间件类
继承 `Middleware` 基础类

```js
const { Middleware, Component } = require('@daze/framework');

@Component('example')
class Example extends Middleware {
  resolve(request, next) {
    // ...
    return next()
  }
}

module.exports = Example;
```


### 服务类

继承 `Service` 基础类

```js
const { Service, Component } = require('@daze/framework');

@Component('example')
class Example extends Service {
  // ...
}

module.exports = Example;
```

### 验证器类

继承 `Validator` 基础类

```js
const { Validator, Component } = require('@daze/framework');

@Component('example')
class Example extends Validator {
  resolve(data) {
    return data;
  }
}

module.exports = Example;
```

### 资源类

继承 `Resource` 基础类

```js
const { Resource, Component } = require('@daze/framework');

@Component('example')
class Example extends Resource {
  // ...
}

module.exports = Example;
```

### 通用类

```js
const { Component } = require('@daze/framework');

@Component('example')
class Example {
  // ...
}

module.exports = Example;
```

## 忽略加载

有时候我们不希望自动加载机制加载某个模块，可以使用 `@Ignore()` 标识

```js
const { Component, Ignore } = require('@daze/framework');

@Ignore()
@Component('example')
class Example {
  // ...
}

module.exports = Example;
```