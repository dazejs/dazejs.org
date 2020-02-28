# 数据库

数据库模块提供了数据库连接、查询构建器等功能

## 连接数据库

**配置**

数据库配置文件位于 `src/config/database.ts`

```ts
export default {
  default: {
    type: 'mysql',
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 13306,
    database: 'orm'
  },
};
```

使用 `this.db()` 来连接数据库, 默认参数 `default`, 即 `database` 配置文件的 `default` 属性 

```ts
this.db('default')
```

---

## 原生查询

连接好数据库后可以调用方法来执行原生 sql, 框架为每种操作提供了对应的方法: `select`, `insert`, `delete`, `update`

**`select` 查询**

示例：
```ts
import { Controller, http, route } from '@dazejs/framework';

@route('/users')
export default class extends Controller {
  @http.get()
  async index() {
    // 使用 ? 进行占位
    const users = await this.db().select('select * from users where age > ?', [20]);
    return users;
  }
}
```

**`insert` 插入**

该方法用于执行插入语句，返回第一条插入成功的 `id`
```ts
const id = await this.db().insert('insert into users (name, age) values (?, ?)', ['dazejs', 18]);
```

**`update` 更新**

该方法用于更新数据库中已存在的记录，返回受更新语句影响的行数
```ts
const affected = await this.db().update('update users set age = 20 where name = ?', ['dazejs']);
```

**`delete` 删除**

该方法用于删除数据库中已存在的记录，返回受更新语句影响的行数
```ts
const affected = await this.db().delete('delete from users where age > ?', [20]);
```

**`query` 通用查询**

有些数据库语句不返回任何值，比如新增表，修改表，删除表等，对于这种类型的操作，可以使用 `query` 方法
```ts
await this.db().query('drop table users')
```

---

## 查询构建器

### 查询数据

`table` 方法为给定表返回一个链式查询构建器实例

**查询单条数据**

使用 `first()` 方法查询单条数据
```ts
this.db().table('users').first()
```
最终生成的SQL语句可能是：
```sql
SELECT * FROM `users` LIMIT 1
```

**查询多条数据**

使用 `find()` 方法查询多条数据
```ts
this.db().table('users').find()
```
最终生成的SQL语句可能是：
```sql
SELECT * FROM `users`
```

### 插入数据

**插入单条数据**

使用 `insert` 方法插入单条数据
```ts
this.db().table('users').insert({
  name: 'dazejs',
  age: 18
})
```

**插入多条数据**

使用 `insertAll` 方法插入单条数据
```ts
this.db().table('users').insertAll([
  {
    name: 'dazejs1',
    age: 18
  },
  {
    name: 'dazejs2',
    age: 18
  }
])
```

### 更新数据

使用 `update` 方法更新数据

```ts
this.db().table('users')
  .where('id', 1)
  .update({
    name: 'dazejs',
    age: 18
  })
```

### 删除数据

使用 `delete` 方法删除数据

```ts
this.db().table('users')
  .where('id', 1)
  .delete()
```

### `Where` 子句

#### `where` / `orWhere`

使用 `where` 方法来添加 `where` 子句到查询中，`where` 方法需要传递 3 个参数，第一个参数为字段名，第二个参数为数据库支持的操作符，第三个参数是该列要比较的值
```ts
const users = await this.db()
  .table('users')
  .where('age', '>', 18)
  .find()
```

如果操作符为 `=`, 可以忽略不写

```ts
const user = await this.db()
  .table('users')
  .where('id', 1)
  .first()
```

如果要将多个条件合并可以多次调用, 默认使用 `and` 连接符

```ts
const users = await this.db()
  .table('users')
  .where('age', '>', 18)
  .where('age', '<', 30)
  .find()
```

如果需要使用 `or` 连接符，使用 `orWhere` 方法

```ts
const users = await this.db()
  .table('users')
  .where('age', '<', 18)
  .orWhere('age', '>', 30)
  .find()
```

#### `whereIn` / `orWhereIn` / `whereNotIn` / `orWhereNotIn`

`whereIn` 用于验证给定列的值是否在给定数组中
```ts
const users = await this.db()
  .table('users')
  .whereIn('age', [18, 28, 38])
  .find()
```

`whereNotIn` 用于验证给定列的值不在给定数组中
```ts
const users = await this.db()
  .table('users')
  .whereNotIn('age', [18, 28, 38])
  .find()
```

#### `whereNull` / `orWhereNull` / `whereNotNull` / `orWhereNotNull`

`whereNull` 用于验证给定列的值是否为 `NULL`
```ts
const users = await this.db()
  .table('users')
  .whereNull('description')
  .find()
```

`whereNotNull` 用于验证给定列的值不为 `NULL`
```ts
const users = await this.db()
  .table('users')
  .whereNotNull('description')
  .find()
```

#### `whereColumn` / `orWhereColumn`

`whereColumn` 用于验证两个字段是否相等
```ts
const users = await this.db()
  .table('users')
  .whereColumn('name', 'description')
  .find()
```

也可以使用比较运算符比较两个字段
```ts
const users = await this.db()
  .table('users')
  .whereColumn('height', '>', 'weight')
  .find()
```

### 聚合查询

**`count`**

统计数量，参数是要统计的字段名, 可选参数
```ts
const users = await this.db().table('users').count()
```

**`max`**

获取最大值，参数是要统计的字段名
```ts
const users = await this.db().table('users').max('score')
```

**`min`**

获取最小值，参数是要统计的字段名
```ts
const users = await this.db().table('users').min('score')
```

**`avg`**

获取平均值，参数是要统计的字段名
```ts
const users = await this.db().table('users').avg('score')
```

**`sum`**

获取累加值，参数是要统计的字段名
```ts
const users = await this.db().table('users').sum('score')
```

### 连接查询

**内连接**

使用 `join` 方法来实现简单的内连接，第一个参数为需要连接的表名，其他参数为连接的约束，例如
```ts
const users = await this.db()
  .table('users')
  .columns('users.*', 'orders.price')
  .join('orders', 'users.id', '=', 'orders.user_id')
  .find()
```

**左连接/右连接**

使用 `leftJoin` 和 `rightJoin` 来执行左连接 / 右连接, 用法与 `join` 一致
```ts
const users = await this.db().table('users')
            .leftJoin('posts', 'users.id', '=', 'posts.user_id')
            .find();
const users = await this.db().table('users')
            .rightJoin('posts', 'users.id', '=', 'posts.user_id')
            .find();
```

#### 高级用法

可以在 `join` 方法中传递一个回调函数， 该函数接收一个 `joinQuery` 构建器，该构建器还支持`on/orOn`, `where` 等方法

```ts
const users = await this.db().table('users')
            .join((joinQuery) => {
              return joinQuery.table('posts')
                .on('users.id', '=', 'orders.user_id')
                .where('users.id', '>', 100)
            })
            .find();
```



### 联合查询

`union` 用于联合两个查询

```ts
const users = await this.db()
  .table('users')
  .where('age', 18)
  .union(
    this.db().table('users').where('age', 20)
  )
  .find()
```

### 排序与分组

#### `orderBy`

`orderBy` 用于对结果集进行排序，该方法需要2个参数， 第一个是需要排序的字段名，第二个字段为排序的方向（asc 或 desc）

```ts
const users = await this.db()
  .table('users')
  .orderBy('id', 'asc')
  .find()
```

#### `groupBy` / `having`

`groupBy` 和 `having` 方法用于对结果集进行分组，`having` 的使用方法与 `where` 方法类似

```ts
const users = await this.db()
  .table('users')
  .groupBy('location_id')
  .having('location_id', '>', 100)
  .find()
```
如果需要多个列进行分组，可以传递多个字段到 `groupBy`
```ts
const users = await this.db()
  .table('users')
  .groupBy('location_id', 'status)
  .having('location_id', '>', 100)
  .find()
```

### 限定与分页

#### `take`(`limit`) / `skip`(`offset`)

使用 `skip` 和 `take` 方法来限定查询返回的结果集的数目，或者在查询中跳过给定数目的结果
```ts
const users = await this.db()
  .table('users')
  .skip(10)
  .take(10)
  .find()
```
也可以使用别名 `limit` 和 `offset`
```ts
const users = await this.db()
  .table('users')
  .offset(10)
  .limit(10)
  .find()
```

使用事务处理的话，需要数据库引擎支持事务处理。比如 `MySQL` 的 `MyISAM` 不支持事务处理，需要使用 `InnoDB` 引擎。

#### 

### 悲观锁

悲观锁（Pessimistic Concurrency Control）, 是一种并发控制的方法。它可以阻止一个事务以影响其他用户的方式来修改数据。如果一个事务执行的操作读某行数据应用了锁，那只有当这个事务把锁释放，其他事务才能够执行与该锁冲突的操作。

悲观锁主要用于数据争用激烈的环境，以及发生并发冲突时使用锁保护数据的成本要低于回滚事务的成本的环境中。

**共享锁**

使用 `sharedLock` 来创建共享锁， 共享锁可以避免被选择的行被修改直到事务提交

```ts
const users = await this.db()
  .table('users')
  .sharedLock()
  .find()
```

**排他锁**

使用 `lockForUpdate` 来创建排他锁， 避免选择行被其他人修改或删除

```ts
const users = await this.db()
  .table('users')
  .lockForUpdate()
  .find()
```

> 加锁时所有扫描过的行都会被锁上，因此使用悲观锁务必确定走了索引，而不是全表扫描，全表扫描相当于锁表操作
> 
> `update`、`delete`、`insert` 操作会自动给语句加排他锁，所以在这三种语句后面不能加 `lockForUpdate`/`sharedLock`，否则会报错
> 
> 事务提交、进程结束、进程中断都会自动释放锁
> 
> 无论加共享锁还是排他锁都不影响普通 `select` 查询，因为普通查询时不会给语句加锁

---

## 事务处理

**自动处理**

使用 `transaction` 方法自动处理事务，该方法会在发生异常的时候自动回滚数据

```ts {8,9,10,11}
import { Controller, http, route } from '@dazejs/framework';

@route('/users')
export default class extends Controller {
  @http.get()
  async index() {

    await this.db().transaction(async (conn) => {
      await conn.table('users').insert({ name: 'example1' })
      await conn.table('users').insert({ name: 'example2' })
    })

    return this.response().Created();
  }
}
```

**手动处理**

也支持手动处理事务

```ts {1,6,8}
const conn = await this.db().beginTransaction();

try {
  await conn.table('users').insert({ name: 'example1' });
  await conn.table('users').insert({ name: 'example2' });
  await conn.commit();
} catch (err) {
  await conn.rollback();
}

```