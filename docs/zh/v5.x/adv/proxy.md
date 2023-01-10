# Http 代理

通过 Http 代理，可以把请求转发到其他服务

## 如何使用

框架提供了 `HttpProxy` 类，来声明返回的结果为一个代理器

```ts
import { Controller, Get, HttpProxy } from '@dazejs/framework'

@Controller()
export class ExampleController {
  @Get('/xhr/path-to-request/*')
  index() {
    return new HttpProxy().target('http://100.10.10.10:8080')
  }
}
```

上述例子将会把请求 `/xhr/path-to-request/any-path` 转发到 `http://100.10.10.10:8080/xhr/path-to-request/any-path`

## 路径重写

`HttpProxy` 实例提供了 `rewrite` 路径重写功能

```ts
import { Controller, Get, HttpProxy } from '@dazejs/framework'

@Controller()
export class ExampleController {
  @Get('/xhr/path-to-request/*')
  index() {
    return new HttpProxy()
      .target('http://100.10.10.10:8080')
      .rewrite((path) => {
        return path.replace(/^/my_xhr/i, '/xhr')
      })
  }
}
```

## 修改请求头

```ts
httpProxy.headers({ Host: 'my.example.com' })
```

## 修改 Origin

```ts
httpProxy.changeOrigin()
```

## 代理配置化

框架支持配置化的代理方式

在 `src/config` 目录下，新建一个 `proxy.ts` 文件

```ts
export default {
  '/xhr/example/*': {
    target: 'http://example/com',
    rewrite: (p: string) => {
      return p.replace('/xhr/example', '')
    }
  }
}
```