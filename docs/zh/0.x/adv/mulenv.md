# 多环境
框架支持根据不同环境加载配置

## 设置环境
使用环境变量 `DAZE_ENV` 来指定运行环境：
```bash
$ DAZE_ENV=dev npm run dev
```

## NODE_ENV

当 `NODE_ENV` 未配置的时候，框架会根据 `DAZE_ENV` 的值自动配置 `NODE_ENV`：

| DAZE_ENV | NODE_ENV    |
| -------- | ----------- |
| dev      | development |
| test     | test        |
| prod     | production  |

除了以上对应关系，任何 `DAZE_ENV` 的值都会使 `NODE_ENV` 的值为 `production`

`DAZE_ENV` 还可以被用来加载多环境配置文件

所以我们只需要（强烈建议）配置 `DAZE_ENV` 的值即可



## 自定义环境
例如我们需要增加一个模拟生产环境，我们只需要将 `DAZE_ENV` 设置为 `sim`，应用启动时就会加载以 `.sim.js` 为后缀的配置文件
