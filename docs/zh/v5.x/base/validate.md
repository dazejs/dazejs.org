# 验证器

对于请求数据或者其它数据，推荐使用便捷的验证器进行合法性验证

---

## 定义验证器

为具体的验证场景定义一个验证器类，在需要验证的时候调用该验证器

```ts
import { Validator, IsEmail } from '@dazejs/framework';

@Validator()
export default class User  {
  @IsEmail()
  email: string;
}

```

---

## 验证数据

在需要 `User` 验证器的控制器中，使用`validate()`进行验证：

```ts
import { Controller, Get } from '@dazejs/framework';
import UserValidator from '../validator/user'

@Controller('/posts')
export default class Post{
  @Get()
  index() {
    const data = {
      email: 'xxx@xxx.com'
    }
    const validator = validate(UserValidator).check()
    // 验证失败
    if (validator.fails) {
      console.log(validator.errors)
    }
  }
}

```

或者可以直接使用 `request.validate()` 来检查请求数据:

```ts
import { Controller, Get } from '@dazejs/framework';
import UserValidator from '../validator/user'

@Controller('/posts')
export default class Post{
  @Get()
  index() {
    this.request.validate(UserValidator);
    // todo
  }
}

```

> 如果检查失败，会根据请求类型返回相应的错误信息

---

## 验证规则

#### `message` 参数说明
- `$field` 表示字段名称
- `$1 - $n` 表示参数值

例如：

`@Length(10, 20, { message: '$field must be between $1 and $2' }) username;`

当字段值小于`10`或者大于`20` 时候，错误信息就会生成 `username must be between 10 and 20`

> 所有验证装饰器都提供了 `小驼峰` 和 `大驼峰` 的写法

### **通用规则**

### `@Passed(func [,options])`

使用自定义函数检查字段值, `func` 接收一个 `value` 作为参数, `value` 的值为字段值

### `@Accepted([options])`

检查字段值是否在 `['yes', 'on', true, 'true', 1, '1']` 中

### `@Is(comparison [,options])`

检查字段值和传入的值是否一致, 使用 `Object.is` 检查

### `@Required([options])`

检查字段值是否为非 `undefined`

### `@Equals(comparison [,options])`

检查字段值和传入的值是否相等, 使用 `===` 运算符检查

### `@NotEquals(comparison [,options])`

检查字段值和传入的值是否不相等

### `@IsEmpty([options])`

检查字段值是否为空，`null`, `undefined`, `''` 表示为空

### `@IsNotEmpty([options])`

检查字段值是否不为空，`null`, `undefined`, `''` 表示为空

### **数字规则**

### `@IsDivisibleBy(num [,options])`

检查字段值是否可以被传入的 `num` 值整除

### `@IsPositive([options])`

检查字段值是否是一个正数

### `@Min(min [, options])`

检查字段值是否大于 `min`

### `@Max(max [, options])`

检查字段值是否小于 `max`

### **日期规则**

### `@AfterDate(date [, options])`

检查字段值是否在 `date` 日期之后, `date` 必须为 `Date` 类型

### `@BeforeDate(date [, options])`

检查字段值是否在 `date` 日期之前, `date` 必须为 `Date` 类型

### **类型规则**

### `@IsBoolean([options])`

检查字段值是否为 `Boolean` 类型

### `@IsDate([options])`

检查字段值是否为 `Date` 类型

### `@IsString([options])`

检查字段值是否为 `String` 类型

### `@IsNumber([options])`

检查字段值是否为 `Number` 类型

### `@IsArray([options])`

检查字段值是否为 `Array` 类型

### `@IsError([options])`

检查字段值是否为 `Error` 类型

### `@IsFunction([options])`

检查字段值是否为 `Function` 类型

### `@IsBuffer([options])`

检查字段值是否为 `Buffer` 类型

### `@IsObject([options])`

检查字段值是否为 `Object` 类型

### `@IsRegExp([options])`

检查字段值是否为 `RegExp` 类型

### `@IsSymbol([options])`

检查字段值是否为 `Symbol` 类型

### `@IsNullOrUndefined([options])`

检查字段值是否为 `null` 或者 `undefined`

### `@IsNull([options])`

检查字段值是否为 `null`

### `@IsUndefined([options])`

检查字段值是否为 `undefined`

### **字符串规则**

### `@IsDateString([options])`

检查字段值是否是一个表示时间的字符串

### `@IsBooleanString([options])`

检查字段值是否是字符串 `'true'` 或者 `'false'`

### `@IsNumberString([options])`

检查字段值是否是一个数字字符串

### `@Contains(seed [,options])`

检查字段值是否包含 `seed` 字符串

### `@NotContains(seed [,options])`

检查字段值是否不包含 `seed` 字符串

### `@IsAlpha([options])`

检查字段值是否只包含字母 `a-zA-Z`

### `@IsAlphanumeric([options])`

检查字段值是否只包含字母和数字

### `@IsAscii([options])`

检查字段值是否只包含 `ASCII` 字符

### `@IsBase32([options])`

检查字符串是否是 `base32` 编码

### `@IsBase64([options])`

检查字符串是否是 `base64` 编码

### `@IsByteLength(min, max [,options])`

检查字段值长度 (使用 `utf-8` 字节) 是否在 `min` 和 `max` 之间

### `@IsCreditCard([options])`

检查字段值是否是一个信用卡号

### `@IsCurrency([options])`

检查字段值是否是货币字符串

### `@IsEmail([options])`

检查字段值是否是一个有效的 `Email` 格式字符串

### `@IsFQDN([options])`

检查字段值是否是一个域名

### `@IsFullWidth`

检查字符串是否包含 `Unicode` 全形字符

### `@IsHalfWidth([options])`

检查字段值是否包含 `Unicode` 半形字符

### `@IsHexColor([options])`

检查字段值是否是一个十六进制颜色值

### `@IsHexadecimal([options])`

检查字段值是否是一个十六进制数字

### `@IsIP([version [, options]])`

检查字段值是否是一个IP

### `@IsISBN([version [, options]])`

检查字符串是否是ISBN图书书号

### `@IsISSN([options])`

检查字符串是否是ISSN杂志编号

### `@IsISIN([options])`

检查字符串是否是ISIN证券编码

### `@IsISO8601([options])`

检查字符串是否是ISO8601格式时间

### `@IsJSON([options])`

检查字符串是否是JSON字符串


### `@IsLowercase([options])`

检查字符串是否是小写

### `@IsUppercase([options])`

检查字符串是否是大写

### `@IsMobilePhone([locale [, options]])`

检查字符串是否是合法的移动手机号


### `@IsMongoId([options])`

检查字符串是否是 `MongoDB ObjectID`


### `@IsMultibyte([options])`

检查字符串是否包含一个多字节字符


### `@IsSurrogatePair([options])`

检查字符串是否包含UTF-16扩展编码字符

### `@IsURL([options])`

检查字符串是否是一个 `URL` 地址


### `@IsUUID([version [, options]])`

检查字符串是否是一个UUID

### `@Length(min, max [, options])`

检查字符串长度

### `@MinLength(min [, options])`

检查字符串长度 ` >= min`

### `@MaxLength(max [, options])`

检查字符串长度 ` <= max`

### `@Matches(pattern [, modifiers [, options]])`

检查字符串是否匹配指定正则