# Redis

Redis 是一个开源的、高级的键值对存储系统，经常被用作数据结构服务器，因为其支持字符串、Hash、列表、集合和有序集合等数据结构。

## 配置

应用的 `Redis` 配置位于配置文件 `config/redis.ts`：

```ts

export default {
    default: {
        host: 'localhost',
        port: 6379
    }
}

```

默认服务器配置可以满足开发需要, 如果你需要指定其他场景的配置，例如 `cahce`, `schedule` 等，你可以为它们指定特殊的连接或者自定义一个连接:

```ts

export default {
    default: {
        host: 'localhost',
        port: 6379
    },
    /**
     * 缓存专用默认 reids 连接
     * 未定义的情况下，默认使用 default 连接
     */
    cache: {
        host: 'localhost',
        port: 6379
    },

    /**
     * 任务调度专用默认 reids 连接
     * 未定义的情况下，默认使用 default 连接
     */
    schedule: {
        host: 'localhost',
        port: 6379
    },
    // 自己指定一个连接名称
    myConnectionName: {
        host: 'localhost',
        port: 6379
    },
}

```

#### 配置集群

```ts

export default {
    default: {
        cluster: true,
        nodes: [
            { host: 'localhost', port: 6377 },
            { host: 'localhost', port: 6378 },
            { host: 'localhost', port: 6379 },
        ]
    }
}

```

## 与 Redis 交互

使用便捷函数或者依赖注入来获取 redis 实例

**便捷函数**

```ts
import { redis } from '@dazejs/framework'


redis() // 直接获取默认连接
redis('myConnectionName') // 获取自定义连接
```

**依赖注入**

```ts
import { Redis, Controller, Get, Autowired } from '@dazejs/framework'

@Controller()
export class Example {

    @Autowired
    redis: Redis

    @Get()
    index() {
        // 直接使用
        this.redis.setex('example', true, 100)
        // 使用自定义连接
        this.redis.connection('myConnectionName').setex('example', true, 100)
    }
}

```
> 我们底层基于 [ioredis](https://github.com/luin/ioredis) 所以，我们可以通过连接调用 ioredis 的所有 api
> 如果要使用 Redis 作为缓存驱动，可以参考[缓存文档](/docs/adv/cache), 如果要使用 Redis 作为任务调度驱动，可以参考[任务调度文档](/document/adv/schedule)。