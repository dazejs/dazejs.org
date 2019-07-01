# 视图
框架内置了 [nunjucks](https://mozilla.github.io/nunjucks/) 作为框架模板引擎

模板引擎的使用请参考 [Nunjucks 文档（中文）](https://mozilla.github.io/nunjucks/cn/templating.html)

## 渲染模板
我们只需要在控制器中返回视图实例即可

##### 手动实例化
```js
const { Decorators, View } = require('@dazejs/framework')

@Decorators.Router('examples')
class Example{
  @Decorators.Get('create')
  create() {
    return new View('hello.njk', {
      name: 'Zewail'
    })
  }
}

module.exports = Example

```

##### 使用全局助手函数

```js
const { Decorators, View } = require('@dazejs/framework')

@Decorators.Router('examples')
class Example {
  @Decorators.Get('create')
  create() {
    return view('hello.njk', {
      name: 'Zewail'
    })
  }
}

module.exports = Example
```

##### 注入

```js
const { Decorators } = require('@dazejs/framework')

@Decorators.Router('examples')
class Example {
  @Decorators.Get('create')
  @Decorators.View()
  create(view) {
    return view.render('hello.njk')
  }
}

module.exports = Example
```

##### 继承基础控制器
```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router('examples')
class Example extends Controller {
  @Decorators.Get('create')
  create() {
    return this.render('hello.njk')
  }
}

module.exports = Example
```
> `this.render('hello.njk')` 等价于 `this.view.render('hello.njk')`

我们的模板文件存放于根目录下的 `views` 文件夹中，上例使用了 `views/hello.njk` 模板文件，`View` 的构造函数共接受 2 个参数，第一个为模板路径，第二个参数为需要传递给模板文件的数据，类型为一个对象

路径也支持子目录传递

```js
return new View('path/to/hello.njk', {
  name: 'Zewail'
})
```
这样就调用了 `views/path/to/hello.njk` 模板文件

## 传递数据

##### 实例化时传递
```txt
View#constructor([template] [, vars])
```

##### 助手函数传递
```txt
view([template] [, vars])
```

##### 调用渲染函数时传递
```txt
View#render([template] [, vars])
```

##### `assign` 方法传递
```text
View#assign([name, [value]])
```

### 示例
```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router('examples')
class Example extends Controller {

  // 实践一
  @Decorators.Get('create')
  create() {
    this.assign('name', 'Zewail')
    this.assign('age', 18)
    return this.render('hello.njk')
  }

  // 实践二
  @Decorators.Get('edit')
  edit() {
    return view('hello.njk', {
      name: 'Zewail',
      age: 18
    })
  }
}

module.exports = Example
```

  > `this.render()` 与 `this.assign()` 为 `this.view.render()` 与 `this.view.assign()` 的别名方法
