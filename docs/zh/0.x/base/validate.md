# 验证
框架提供了多种验证方式来验证请求数据，包括描述对象验证与装饰器验证

## 快速开始

我们创建了一个 `Hello` 控制器并编写了` store` 方法用于保存数据，并校验 `title` 和 `desc` 字段，我们可以使用 `request` 对象的 `validate` 方法快速验证，验证失败会抛出状态码为`422`的通用异常

```js
const { Decorators, Controller } = require('@dazejs/framework')

@Decorators.Router()
class Hello extends Controller {
  @Decorators.Post()
  async store() {
      this.request.validate({
          title: [
              ['notEmpty', [], { message: '标题不能为空' }]
              ['length', [10, 20], { message: '标题长度必须在10-20之间' }],
          ],
          desc: [
              ['maxLength', [100], { message: '简介最大限制为100个字符'}]
          ]
      })
      
      // 保存数据
  }
}

module.exports = Hello
```





## 验证器

我们可以创建一个类并对类的属性添加装饰器来创建一个验证器

创建验证器类
```js
// src/app/validate/userPost.js

const { Validate } = require('@dazejs/framework')

const { Email } = Validate

class UserPost {
  @Email()
  username;
}

module.exports = UserPost

```

这样就创建好了一个验证器，校验 `username` 属性必须为一个邮箱，然后在控制器中调用验证器类来校验请求数据

```js

const { Decorators, Controller, Validate } = require('@dazejs/framework')
const UserPost = require('../validate/userPost')

@Decorators.Router()
class Hello extends Controller {
  @Decorators.Post()
  async store() {
    const validate = new Validate(this.request.param(), new UserPost())
    if (validate.fails) {
      console.log(validate.errors.all())
    }
    return 'hello dazejs'
  }
}

module.exports = Hello

```
