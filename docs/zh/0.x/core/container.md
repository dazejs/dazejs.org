# 容器
容器作为 Daze.js 的核心，发挥着至关重要的功能，容器，顾名思义，就是用来装东西的器具，我们可以用它来装一个变量，一个对象，一个函数，一个类，一个实例等等。在这里，我们可以通过容器功能来实现解耦和依赖注入。

## 什么是容器
容器说白了就是一个用于管理依赖和进行依赖注入的工具, 目的是为了更好的解耦各个组件或者类之间的关系。在框架中，容器保存了框架的绝大多数服务

那么，容器是如何解决依赖问题的呢

我们举个一个生产汽车的工厂车间的例子

通常情况下我们是这么做的：
```js

const Engine = require('./Engine')
const Wheels = require('./Wheels')

class Car {
  constructor() {
    // 生成引擎
    this.engine = new Engine()
    // 生成4个轮子
    this.wheels = new Wheels(4)
    // ...
  }
}

const car = new Car()

```
在这种情况下，我们如果要改装汽车，例如换个发动机，我们就需要重新生产一辆汽车，效率可想而知

## 工厂模式
所以我们需要重新设计工厂车间，然生产出来的汽车发动机可以进行拆卸替换，这时候便诞生了工厂模式：

```js
const Engine = require('./Engine')
const Wheels = require('./Wheels')

// 零件工厂
class ComponentFactory {
  constructor() {
    this.components = {
      engine: Engine,
      wheels: Wheels
    }
  }
  make(component, ...params) {
    return new component(...params)
  }
}
```
然后我们使用这个零件工厂车间生产发动子轮子等汽车零件，原来的车间只是用来组装汽车
```js
class Car {
  constructor(modules) {
    const componentFactory = new ComponentFactory()
    for (const key of Object.keys(modules)) {
      this[key] = componentFactory.make(key, ...modules[key])
    }
  }
}

const car = new Car({
  // 引擎
  engine: [],
  // 4个轮子
  wheels: [4]
})
```
我们可以看到，我们现在需要在生产汽车的时候，不再需要生产发动机、轮子等零件，我们只需要告诉零件车间要什么零件，然后组装生产汽车, 将汽车对N多零件的以来变成了对零件车间的依赖

这时候，我们发现，生产汽车效率变高了，但是我们还是需要工人在车间去组装汽车，这个时代我们应该需要配备全自动的生产车间，我们只需要下达生产什么要的汽车的指令

## IOC 容器
这时候，我们就需要一个IOC容器来下达指令给自动化车间生产汽车, 

```js
const { Container } = require('@dazejs/framework')
const Engine = require('./Engine')
const Wheels = require('./Wheels')

class Car {
  constructor(modules) {
    for (const key of Object.keys(modules)) {
      this[key] = modules[key]
    }
  }
}

Container.bind('car', (modules) => {
  const res = {}
  for (const m of modules) {
    res[m] = Container.make(m)
  }
  return new Car(res)
})

Container.bind('engine', () => {
  return new Engine()
})

Container.bind('wheels', () => {
  return new Wheels()
})

// ...

// 开始下达生产指令
const car1 = Container.make('car', ['engine', 'wheels'])
const car2 = Container.make('car', ['engine', 'wheels'])
const car3 = Container.make('car', ['engine', 'wheels'])
const car4 = Container.make('car', ['engine', 'wheels'])

```

## 框架核心
通过上述的例子，我们知道了容器的原始功能（实际功能比上述例子要强大的多）与作用价值，而 Daze.js 正式基于这种容器作为核心，我们从这里也可以发现，框架的核心非常精简，是一个轻量级的架构，其余的例如路由、模板、日志、验证等模块都是绑定在容器中的功能模块。