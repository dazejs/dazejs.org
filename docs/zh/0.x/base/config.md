# 配置

框架提供了强大的配置管理功能，可以根据环境运行不同的配置

配置文件位于 `src/config` 目录下

## 配置实例

框架在初始化的时候在容器中实例化了配置类，我们可以简单的获取配置实例来操作配置：

##### 注入
```js
const { Decorators } = require('@dazejs/framework')

@Decorators.Router('users)
class User {
  @Decorators.Config() config = null;

  @Decorators.Get()
  index() {
    console.log(this.config.get('app.port'))
  }
}

module.exports = User
```
> 我们也可以通过 构造函数，类方法等注入方式注入，这里使用类属性注入作为示例

##### 继承基础组件

```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router('users)
class User extends Controller {

  @Decorators.Get()
  index() {
    console.log(this.config.get('app.port'))
  }
}

module.exports = User
```
> 基础组件包括 `Controller` `Service` `Middleware` 等

## 读取配置

我们可以使用 `Config#get([name [, default]])` 方法读取配置:
- `name`: 配置名称，使用`文件名.属性名.属性名...` 的方式获取
- `default`: 默认值，当未获取到配置属性时，返回 `default` 的值

```js
// 获取 `src/config/app.js` 配置文件配置的端口号
this.config.get('app.port')
```

## 修改配置

在框架运行期间，我们可以使用 `Config#set(name, value)` 动态的修改配置或者添加配置：
```js
this.config.set('custom_config', 'haha')
```

> 修改配置对于修改应用初始化用到的配置属性无效, 例如端口号等，并且只对**当前进程(多进程)**有效

## 自定义配置

基于配置的读取与获取方式，框架支持自定义配置文件：

首先我们需要在 `src/config/` 目录下创建一个新的文件，例如 `custom.js`

然后我们在该文件中填充以下内容：
```js
module.exports = {
  prop1: 1,
  prop2: 2,
}
```

然后我们就可以使用 `get` 方法获取配置内容了：
```js
this.config.get('custom.prop1')
```

根据这个原理，我们甚至可以定义导出类型为函数或者数组的配置文件

```js
module.exports = function () {
  return 'haha'
}
```
或者 

```js
module.exports = [1, 2]
```
然后我们只需要使用文件名作为参数:

```js
this.config.get('custom')
```

## 多环境配置
框架拥有根据不同运行环境来读取不同配置的能力

```txt
src
|- config
| |- app.js  
| |- app.prod.js
| |- app.dev.js
```

`app.js` 为框架默认加载的配置文件，`app.dev.js` 为框架在开发环境加载的配置文件，`app.prod.js` 为框架在生产环境加载的配置文件，也就是说，当运行环境为生产环境时，框架会使用 `app.prod.js` 覆盖 `app.js` 中的同名属性（如果为对象）
> 对象同名属性直接替换，不会再进行二次比较