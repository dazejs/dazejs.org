(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 容器\n\n`Daze.js` 基于容器构建，容器用来管理依赖及依赖注入。\n\n## 绑定\n\n使用 `app.bind(abstract, concrete [, shared [, callable]])` 方法进行绑定\n- `abstract`: 绑定在容器的 `key`, 底层以 `Map` 的形式进行存储，所以也支持对象\n- `concrete`: 需要绑定的对象\n- `shared`: 实例是否共享，如果共享即以单例的形式保存，默认 `true`\n- `callable`: 如果绑定的 `concrete` 为函数类型，是否作为普通函数执行\n\n```js\n// 绑定一个对象，以 foo 作为标识\napp.bind('foo', {})\n// 通过 app 实例获取\napp.get('foo')\n```\n\n## 单例与多例\n\n### 单例\n\n当一个类以单例形式绑定在容器中，每次从容器中取出的都是该类的同一个实例\n\n使用 `app.singleton(abstract, concrete [, callable])` 方法进行绑定\n- `abstract`: 绑定在容器的 `key`, 底层以 `Map` 的形式进行存储，所以也支持对象\n- `concrete`: 需要绑定的对象\n- `callable`: 如果绑定的 `concrete` 为函数类型，是否作为普通函数执行\n\n### 多例\n\n当一个类以多例形式绑定在容器中，每次从容器中取出的都是该类的新的实例\n\n使用 `app.multiton(abstract, concrete [, callable])` 方法进行绑定\n- `abstract`: 绑定在容器的 `key`, 底层以 `Map` 的形式进行存储，所以也支持对象\n- `concrete`: 需要绑定的对象\n- `callable`: 如果绑定的 `concrete` 为函数类型，是否作为普通函数执行\n\n## 类型行为\n\n### 类\n\n容器具有自动实例化的功能，所以我们在取出类的时候取出的是类的实例\n\n```js\nclass Foo {};\n// 绑定一个类，以 foo 作为标识\napp.bind('foo', Foo)\n// 通过 app 实例调用 - 自动实例化\napp.get('foo')\n```\n\n### 函数\n函数是一个比较特殊的类型，在容器中，既可以作为构造函数进行实例化，也可以作为普通函数执行\n\n#### 作为普通函数\n如果需要作为普通函数执行，我们需要传递 `callable` 参数为 `true`\n\n- 绑定单例\n\n容器会将函数运行的结果作为单例保存在容器中。\n\n```js\nclass Foo {};\n// 单例形式绑定\napp.singleton('foo', () => {\n  return new Foo();\n}, true);\n// 每次都取出相同的 Foo 的实例\napp.get('foo');\n```\n\n- 绑定多例\n\n容器会保存该函数，在需要的时候运行函数取出结果\n\n```js\nclass Foo {};\n// 多例形式绑定\napp.multiton('foo', () => {\n  return new Foo();\n}, true);\n// 每次都取出新的 Foo 的实例\napp.get('foo');\n```\n\n#### 作为构造函数\n\n构造函数的行为与类一致\n\n```js\nconst Foo = function () {};\n// 绑定一个构造函数，以 foo 作为标识\napp.bind('foo', Foo)\n// 通过 app 实例调用 - 自动实例化\napp.get('foo')\n```\n### 实例对象\n\n\b所有对象类型的都会以单例形式保存在容器中\n\n```js\nconst foo = {};\n// 绑定一个对象，以 foo 作为标识\napp.bind('foo', foo)\n// 通过 app 实例调用\napp.get('foo')\n```\n\n### 其他类型\n\n容器也支持保存值类型，例如数字、字符串等，与对象的行为一致\n\n```js\n// 绑定一个日期\napp.bind('startTime', Date.now())\n// 通过 app 实例调用\napp.get('startTime')\n```\n\n## 容器事件\n\n### 绑定事件\n\n容器在每次执行绑定的时候都会触发 `binding` 事件\n\n```js\napp.on('binding', (obj) => {\n  console.log(obj) // obj 包含 abstract、concrete、shared、callable 属性\n})\n```\n\n\n### 解析事件\n\n容器在每次解析对象（包括执行函数、实例化等操作）的时候都会触发 `resolving` 事件\n\n```js\napp.on('resolving', (target) => {\n  console.log(target) // target 即为解析后的对象\n})\n```");

/***/ })

}]);