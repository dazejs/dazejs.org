# 加载机制

`Daze.js` 会自动扫描 `src/app` 目录，按功能分类加载

## 文件分类
### 控制器类

使用 `@Controller(name)` 装饰的类

```js
const { Controller } = require('@daze/framework');

@Controller('example')
class Example {
  // ...
}

module.exports = Example;
```

### 中间件类
使用 `@Middleware(name)` 装饰的类

```js
const { Middleware } = require('@daze/framework');

@Middleware('example')
class Example {
  resolve(request, next) {
    // ...
    return next()
  }
}

module.exports = Example;
```


### 服务类

使用 `@Service(name)` 装饰的类

```js
const { Service } = require('@daze/framework');

@Service('example')
class Example {
  // ...
}

module.exports = Example;
```

### 验证器类

使用 `@Validator(name)` 装饰的类

```js
const { Validator } = require('@daze/framework');

@Validator('example')
class Example {
  resolve(data) {
    return data;
  }
}

module.exports = Example;
```

### 资源类

使用 `@Resource(name)` 装饰的类

```js
const { Resource } = require('@daze/framework');

@Resource('example')
class Example {
  // ...
}

module.exports = Example;
```

### 通用组件类

使用 `@Component(name)` 装饰的类

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