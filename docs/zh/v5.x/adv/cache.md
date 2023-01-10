# 缓存

## 配置

应用的缓存配置位于配置文件 `config/cache.ts`：

```ts
export default {
    /**
     * 默认使用的存储器
     * 可选：memory ｜ redis
     */
    store: 'memory'
    
}
```

缓存默认使用内存作为存储器，我们还支持第三方存储器 `Redis`

如果使用 redis 作为存储器, 会默认使用 `cache` 连接，如果未定义 `cache` 连接，则使用 `default` 连接，也可以直接手动指定连接

## 获取缓存实例

我们可以通过便捷函数或者依赖注入的方式获取缓存实例

**便捷函数**

```ts
import { cache } from '@dazejs/framework'

cache().get('example') // 使用 cache() 函数直接获取实例
cache('redis').get('example') // 手动指定使用 redis 作为存储器
cache('redis', 'myConnectionName').get('example') // 手指定 redis 作为存储器并指定自定义的 redis 连接
```

**依赖注入**


```ts
import { Cache, Controller, Get, Autowired } from '@dazejs/framework'

@Controller()
export class Example {

    @Autowired
    cache: Cache

    @Get()
    index() {
        // 直接使用
        this.cache.set('example', true, 100)
        // 使用redis自定义连接
        this.cache.store('redis').set('example', true, 100)
        // 使用redis
        this.cache.store('redis', 'myConnectionName').set('example', true, 100)
    }
}

```

## 缓存使用

> 所有方法均为异步函数

#### 从缓存中获取数据

使用 get 方法来获取一个缓存，如果需要的话你可以传递第二个参数到 get 方法指定缓存项不存在时返回的自定义默认值

```ts
const value = await cache().get('key')
const value = await cache().get('key', 'default')
```

#### 检查缓存项是否存在

使用 has 方法来判断缓存项是否存在

```ts
if (await cache().has('key')) {
    // TODO
}
```

#### 数值增加/减少

increment 和 decrement 方法可用于调整缓存中的整型数值。这两个方法都可以接收第二个参数来指明缓存项数值增加和减少的数目, 默认为 1：

```ts
await cache().increment('key')
await cache().increment('key', amount)
await cache().decrement('key')
await cache().decrement('key', amount)
```

#### 在缓存中存储数据

使用 set 方法来存储数据, 需要指定存储时间

```ts
await cache().set('key', 'value', seconds)
```

#### 永久存储数据

forever 方法用于持久化存储数据到缓存，这些值必须通过 remove 方法手动从缓存中移除：

```ts
await cache().forever('key', 'value')
```
> 如果使用 redis 存储器，则根据 redis 策略决定是否移除

#### 从缓存中移除数据

使用 remove 方法从缓存中移除缓存项数据：

```ts
await cache().remove('key')
```

如果要清除所有缓存，可以通过 flush 方法
```ts
await cache().flush()
```
> ⚠️⚠️⚠️ 清除缓存是从缓存系统中移除所有数据，所以在使用这个方法时如果其他应用与本应用有共享缓存时需要格外注意。
