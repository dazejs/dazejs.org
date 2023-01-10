# 任务调度
框架内置的定时任务模块，基于 [GNU crontab](https://www.gnu.org/software/mcron/manual/html_node/Crontab-file.html) 实现

## 模块定义

基于框架的自动加载模块能力，使用 `@Schedule()` 装饰器来定义一个定时任务模块

```ts {3}
import { Schedule } from '@dazejs/framework';

@Schedule()
export class ExampleSchedule {

}

```

## 设置执行时间

使用 `Crontab` 命名空间内的装饰器来为你的方法设置执行时间:

### `@Corntab.corn(expression: string)`

根据 `GNU crontab` 表达式来设置定时任务的执行时间

```ts {5}
import { Schedule, Crontab } from '@dazejs/framework';

@Schedule()
export class ExampleSchedule {
    @Crontab.corn('* * * * *')
    my_func_name() {
        console.log('每分钟执行一次')
    }
}

```

## Corn 语法

```
 # ┌────────────── 秒 (可选)
 # │ ┌──────────── 分
 # │ │ ┌────────── 时
 # │ │ │ ┌──────── 天/月
 # │ │ │ │ ┌────── 月
 # │ │ │ │ │ ┌──── 天/星期
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

其中每个位置可设置的值为：

|     字段    |        值        |
|--------------|---------------------|
|    秒    |         0-59        |
|    分    |         0-59        |
|    时    |         0-23        |
|    天/月  |         1-31        |
|     月    |     1-12 (或者名称 - 英) |
|  天/星期 |     0-7 (或者名称 - 英， 0/7 都可表示为星期日)  |

使用多个值：

```ts
@Corntab.corn('1,2,3,4,5 * * * *')
```

使用范围:

```ts
@Corntab.corn('1-5 * * * *')
```

使用步长：

```ts
@Corntab.corn('*/2 * * * *')
```

使用名称：

```ts
@Corntab.corn('* * * January,September *')
@Corntab.corn('* * * Jan,Sep *')
```

**推荐使用封装好的便捷方法**

```ts
// 定义任务每分钟执行一次
@Corntab.everyMinute()
// 约束任务只在工作日进行
@Corntab.weekdays()
```

> 更多便捷方法参考 [便捷方法](#便捷方法) 段落
 
## 在单台服务器上运行任务
> 要使用这个功能必须启用 Redis 作为第三方存储

如果你的应用运行在多台服务器上，可能需要限制调度任务只在某台服务器上运行。

要告知任务只在单台服务器上运行，在定义调度任务时使用 `@Corntab.runOnSingletonServer()` 装饰器即可。第一台获取到该任务的服务器会给任务上一把原子锁以阻止其他服务器同时运行该任务：

```ts
import { Schedule, corntab } from '@dazejs/framework';

@Schedule()
export class ExampleSchedule {
    @Corntab.runOnSingletonServer()
    @Corntab.everyMinute()
    task1() {
        // TODO
    }
}
```

> 需要注意的是：runOnSingletonServer 只能作用在分钟级别的人物调度，即不支持低于1分钟的任务，否则会以1分钟作为执行间隔时间

#### 如何开启 redis 缓存



## 便捷方法

框架还对 `corntab` 做了一些常用的语法封装

### 调度计划

##### `everySecond()`

每秒执行一次任务

##### `everyTwoSeconds()`

每2秒执行一次任务

##### `everyThreeSeconds()`

每3秒执行一次任务

##### `everyFourSeconds()`

每4秒执行一次任务

##### `everyFiveSeconds()`

每5秒执行一次任务

##### `everyTenSeconds()`

每10秒执行一次任务

##### `everyFifteenSeconds()`

每15秒执行一次任务

##### `everyThirtySeconds()`

每30秒执行一次任务

##### `everyMinute()`

每分钟执行一次任务

##### `everyTwoMinutes()`

每2分钟执行一次任务

##### `everyThreeMinutes()`

每3分钟执行一次任务

##### `everyFourMinutes()`

每4分钟执行一次任务

##### `everyFiveMinutes()`

每5分钟执行一次任务

##### `everyTenMinutes()`

每10分钟执行一次任务

##### `everyFifteenMinutes()`

每15分钟执行一次任务

##### `everyThirtyMinutes()`

每30分钟执行一次任务

##### `hourly()`

每小时执行执行一次任务

##### `hourlyAt(offset: number | number[])`

固定时间(小时)执行, 例如 `hourlyAt([1, 5, 12])`

##### `everyTwoHours()`

每2个小时执行一次任务

##### `everyThreeHours()`

每3个小时执行一次任务

##### `everyFourHours()`

每4个小时执行一次任务

##### `everySixHours()`

每6个小时执行一次任务

##### `daily()`

每天 `00:00` 执行一次任务

##### `dailyAt(time: string)`

在每天的固定时间执行, 例如 `dailyAt('13')`, `dailyAt('13:00')`, `dailyAt('13:00:01')`

##### `weekly()`

每周日 00:00 执行一次任务

##### `weeklyOn(dayOfWeek: number | string, time = '0:0')`

每周的某一天某个时间执行一次任务

##### `monthly`

每月第一天 00:00 执行一次任务

##### `monthlyOn(dayOfMonth: string | number, time = '0:0')`

每月某一天的某个时间执行一次任务

##### `quarterly()`

每季度第一天 00:00 执行一次任务

##### `yearly()`

每年第一天 00:00 执行一次任务

##### `yearlyOn(month: string | number = 1, dayOfMonth: string | number = 1, time = '0:0')`

在每年的某个月的某一天的某个时间执行一次任务


### 约束条件

##### `weekdays()`

限制任务在工作日执行

##### `weekends()`

限制任务在周末执行

##### `mondays()`

限制任务在周一执行

##### `tuesdays()`

限制任务在周二执行

##### `wednesdays()`

限制任务在周三执行

##### `thursdays()`

限制任务在周四执行

##### `fridays()`

限制任务在周五执行

##### `saturdays()`

限制任务在周六执行

##### `sundays()`

限制任务在周日执行


