# 容器

`Daze.js` 基于容器模式构建，容器用来管理依赖及依赖注入。

---

## 绑定

使用 `app.bind(abstract, concrete [, shared [, callable]])` 方法进行绑定
- `abstract`：绑定在容器的 `key`, 底层以 `Map` 的形式进行存储，所以也支持对象
- `concrete`：需要绑定的对象
- `shared`：实例是否共享，如果共享即以单例的形式保存，默认 `true`
- `callable`：如果绑定的 `concrete` 为函数类型，是否作为普通函数执行

```js
// 绑定一个对象，以 foo 作为标识
app.bind('foo', {})
// 通过 app 实例获取
app.get('foo')
```

---

## 单例与多例

### 单例

当一个类以单例形式绑定在容器中，每次从容器中取出的都是该类的同一个实例

使用 `app.singleton(abstract, concrete [, callable])` 方法进行绑定
- `abstract`：绑定在容器的 `key`, 底层以 `Map` 的形式进行存储，所以也支持对象
- `concrete`：需要绑定的对象
- `callable`：如果绑定的 `concrete` 为函数类型，是否作为普通函数执行

### 多例

当一个类以多例形式绑定在容器中，每次从容器中取出的都是该类的新的实例

使用 `app.multiton(abstract, concrete [, callable])` 方法进行绑定
- `abstract`：绑定在容器的 `key`, 底层以 `Map` 的形式进行存储，所以也支持对象
- `concrete`：需要绑定的对象
- `callable`：如果绑定的 `concrete` 为函数类型，是否作为普通函数执行

---

## 类型行为

### 类

容器具有自动实例化的功能，所以我们在取出类的时候取出的是类的实例

```js
class Foo {};
// 绑定一个类，以 foo 作为标识
app.bind('foo', Foo)
// 通过 app 实例调用 - 自动实例化
app.get('foo')
```

### 函数
函数是一个比较特殊的类型，在容器中，既可以作为构造函数进行实例化，也可以作为普通函数执行

#### 作为普通函数
如果需要作为普通函数执行，我们需要传递 `callable` 参数为 `true`

**绑定单例**

容器会将函数运行的结果作为单例保存在容器中。

```js
class Foo {};
// 单例形式绑定
app.singleton('foo', () => {
  return new Foo();
}, true);
// 每次都取出相同的 Foo 的实例
app.get('foo');
```

**绑定多例**

容器会保存该函数，在需要的时候运行函数取出结果

```js
class Foo {};
// 多例形式绑定
app.multiton('foo', () => {
  return new Foo();
}, true);
// 每次都取出新的 Foo 的实例
app.get('foo');
```

#### 作为构造函数

构造函数的行为与类一致

```js
const Foo = function () {};
// 绑定一个构造函数，以 foo 作为标识
app.bind('foo', Foo)
// 通过 app 实例调用 - 自动实例化
app.get('foo')
```
### 实例对象

所有对象类型的都会以单例形式保存在容器中

```js
const foo = {};
// 绑定一个对象，以 foo 作为标识
app.bind('foo', foo)
// 通过 app 实例调用
app.get('foo')
```

### 其他类型

容器也支持保存值类型，例如数字、字符串等，与对象的行为一致

```js
// 绑定一个日期
app.bind('startTime', Date.now())
// 通过 app 实例调用
app.get('startTime')
```

---

## 容器事件

### 绑定事件

容器在每次执行绑定的时候都会触发 `binding` 事件

```js
app.on('binding', (obj) => {
  console.log(obj) // obj 包含 abstract、concrete、shared、callable 属性
})
```


### 解析事件

容器在每次解析对象（包括执行函数、实例化等操作）的时候都会触发 `resolving` 事件

```js
app.on('resolving', (target) => {
  console.log(target) // target 即为解析后的对象
})
```