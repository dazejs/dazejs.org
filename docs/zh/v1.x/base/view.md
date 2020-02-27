# 视图
框架内置了 [nunjucks](https://mozilla.github.io/nunjucks/) 作为框架模板引擎

模板引擎的使用请参考 [Nunjucks 文档（中文）](https://mozilla.github.io/nunjucks/cn/templating.html)

## 渲染模板
使用 `render` 方法返回

```ts
import { Controller, Route, Http, View } from '@dazejs/framework'

@Route('examples')
export default class Example extends Controller {
  @Http.Get('create')
  create() {
    return this.render('hello.njk', {
      name: 'Zewail'
    })
  }
}


```

我们的模板文件存放于根目录下的 `views` 文件夹中，上例使用了 `views/hello.njk` 模板文件，`View` 的构造函数共接受 2 个参数，第一个为模板路径，第二个参数为需要传递给模板文件的数据，类型为一个对象

路径也支持子目录传递

```ts
return this.render('path/to/hello.njk', {
  name: 'Zewail'
})
```
这样就调用了 `views/path/to/hello.njk` 模板文件

## 传递数据

可以使用 `render` 方法的第二个参数进行传递
```text
this.render([template] [, vars])
```

或者使用 `assign` 方法传递数据给模板
```text
this.assign([key], [value])
```

### 示例
```ts
import { Controller, Route, Http } from '@dazejs/framework'

@Route('examples')
export default class Example extends Controller {
  // 示例一
  @Http.Get('create')
  create() {
    this.assign('name', 'Dazejs')
    return this.render('hello.njk')
  }

  // 示例二
  @Http.Get('edit')
  edit() {
    return this.render('hello.njk', {
      name: 'Dazejs',
    })
  }
}

```
