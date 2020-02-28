# 模型

模型可以理解为数据抽象层，模型提供了许多便捷的数据操作接口

---

## 实体

#### 定义

定义一个实体类可以用来描述一个模型, 通过继承 `Entity` 来定义一个实体，下面是一个 `User` 实体:

```ts
import { Entity, table, column, autoIncrementPrimaryColumn } from '@dazejs/framework';

@table('users')
export class User extends Entity {

  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;
}
```

#### 表名

每个实体都需要配置一个对应的表名，通过使用 `@table()` 来定义表名:

```ts
import { Entity, table, column, autoIncrementPrimaryColumn } from '@dazejs/framework';

@table('users')
export class User extends Entity {

  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;
}
```

#### 字段

通过字段定义可以描述模型对应的数据库字段

```ts
import { Entity, table, column, autoIncrementPrimaryColumn } from '@dazejs/framework';

@table('users')
export class User extends Entity {

  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @column()
  age: number;

  @column()
  gender: 'M' | 'F';
}
```

#### 主键

每个实体都至少需要配置一个主键

**普通主键**

```ts
import { Entity, table, column, primaryColumn } from '@dazejs/framework';

@table('users')
export class User extends Entity {

  @primaryColumn()
  id: number;

  @column()
  name: string;
}
```

**自增主键**

```ts
import { Entity, table, column, autoIncrementPrimaryColumn } from '@dazejs/framework';

@table('users')
export class User extends Entity {

  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;
}
```

---

## 查询模型

#### 查询单个模型

根据主键值获取单条记录

```ts
const user = new User();
const res = await user.get(1);
console.log(res.age)
```

根据查询构建器获取单条记录

```ts
const user = new User();
const res = await user.createQueryBuilder().where('id', 1).first();
console.log(res.age)
```


#### 查询多个模型

遍历主键获取
```ts
const user = new User();
for (const id of [1, 2, 3]) {
  const res = await user.get(id);
  console.log(res.age)
}
```

使用查询构建器查询
```ts
const user = new User();
const res = await user.createQueryBuilder().whereIn('id', [1, 2, 3]).find();

for (const item of res) {
  console.log(item.age)
}
```

---

## 新增模型

模型数据的新增和数据库的新增数据有所区别，数据库的新增只是单纯的写入数据，而模型的新增则会包含自动时间戳，软删除等功能

#### 新增单个模型

```ts
const user = new User();
user.name = 'dazejs';
user.age = 10';
await user.save();
```

也可以使用 `create` 方法传入数据对象

```ts
const user = new User();
await user.create({
  name: 'dazejs',
  age: 10
});
```

---

## 更新模型

更新数据前我们需要先取出数据，然后进行更新

```ts
const user = new User();
const res = await user.get(1);
res.name = 'dazejs'
res.age = 10
await res.save();
```

> `save` 方法会自动判断是更新还是新增操作
> 
> 不要调用 `save` 方法进行多次数据写入。

---

## 删除模型

#### 删除当前模型

使用 `delete` 方法删除当前模型, 删除前需要先取出模型

```ts
const user = new User();
const res = await user.get(1);
await res.delete();
```

#### 根据主键删除

使用 `destroy` 根据主键删除模型

```ts
const user = new User();
user.destroy(1, 2, 3)
```

---

## 自动时间戳

模型支持配置自动插入/更新时间戳字段的能力

### 自动插入时间戳

该模型在每次创建数据的时候，都会自动插入 `created_at` 为当前时间戳，默认 `int` 类型:

```ts
import { Entity, table, column, autoIncrementPrimaryColumn, createTimestampColumn } from '@dazejs/framework';

@table('users')
export class User extends Entity {

  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @createTimestampColumn()
  created_at: number;
}
```

如果需要修改为其他类型的时间戳字段，可以通过 `createTimestampColumn` 的参数修改

支持 `int`、`timestamp`、`date`、`time`、`year`、`datetime`

```ts
import { Entity, table, column, autoIncrementPrimaryColumn, createTimestampColumn } from '@dazejs/framework';

@table('users')
export class User extends Entity {

  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @createTimestampColumn('timestamp')
  created_at: string;
}
```

### 自动更新时间戳

该模型在每次更新数据的时候，都会自动修改 `updated_at` 为当前时间戳，默认 `int` 类型:

```ts
import { Entity, table, column, autoIncrementPrimaryColumn, updateTimestampColumn } from '@dazejs/framework';

@table('users')
export class User extends Entity {

  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @updateTimestampColumn()
  updated_at: number;
}
```

---

## 软删除

在实际项目中，对数据频繁使用删除操作会导致性能问题，软删除的作用就是把数据加上删除标记，而不是真正的删除，同时也便于需要的时候进行数据的恢复

通过配置软删除字段来开启软删除功能, 示例模型在删除操作的时候会自动更新 `deleted_at` 字段为当前时间戳，默认 `int` 类型

```ts
import { Entity, table, column, autoIncrementPrimaryColumn, softDeleteColumn } from '@dazejs/framework';

@table('users')
export class User extends Entity {

  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @softDeleteColumn()
  deleted_at: number;
}
```

定义好模型后，我们就可以通过模型的删除方法来进行删除操作, 数据并不会在数据库中真实删除:

```ts
const user = new User();
const res = await user.get(1);
await res.delete();
```

并且无法直接查询该数据

```ts
const user = new User();
await user.destory(1);
const res = await user.get(1);
console.log(res)
```

---

## 模型输出

一般通过模型查询到的结果否是模型实例, 我们可以通过模型方法来获取模型的真实数据

**getAttribute(name)**

根据字段名获取字段值

```ts
const user = new User();
const res = await user.get(1);
console.log(res.getAttribute('age'))
```

**getAttributes()**

获取模型数据

```ts
const user = new User();
const res = await user.get(1);
console.log(res.getAttributes())
```

---

## 关联关系

通过模型关联操作把数据表的关联关系对象化，关联操作比起常规的数据库联表操作更加直观

### 一对一关联

#### 定义关联关系

使用 `hasOne(() => Entity, { foreignKey: string, localKey: string })` 来定义一对一的实体关联，第一个参数接收一个返回关联实体类的匿名函数 (为了解决循环依赖的问题), `foreignKey` 用来定义自定义外键名, 默认使用 `关联实体表名的单数形式_id` , `localKey` 用来定义主键名, 默认当前模型主键名

定义 `User` 实体

```ts
import { Entity, table, autoIncrementPrimaryColumn, column, hasOne } from '@dazejs/framework';
import { Profile } from './profile';

@table('users')
export class User extends Entity {
  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @hasOne(() => Profile)
  profile: Profile;
}
```

定义 `Profile` 实体, 使用 `belongsTo()` 定义一对一的反向实体关联

```ts
import { Entity, table, autoIncrementPrimaryColumn, column, belongsTo } from '@dazejs/framework';
import { User } from './user';

@table('users')
export class Profile extends Entity {
  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @belongsTo(() => User)
  user: User;
}
```

### 一对多关联


使用 `hasMany(() => Entity, { foreignKey: string, localKey: string })` 来定义一对多的实体关联，第一个参数接收一个返回关联实体类的匿名函数, `foreignKey` 用来定义自定义外键名, 默认使用 `关联实体表名的单数形式_id` , `localKey` 用来定义主键名, 默认当前模型主键名

定义 `User` 实体

```ts
import { Entity, table, autoIncrementPrimaryColumn, column, hasMany } from '@dazejs/framework';
import { Profile } from './profile';

@table('users')
export class User extends Entity {
  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @hasMany(() => Profile)
  profiles: Profile[];
}
```

定义 `Profile` 实体, 使用 `belongsTo()` 定义一对一的反向实体关联

```ts
import { Entity, table, autoIncrementPrimaryColumn, column, belongsTo } from '@dazejs/framework';
import { User } from './user';

@table('users')
export class Profile extends Entity {
  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @belongsTo(() => User)
  user: User;
}
```

### 多对多关联


使用 `hasMany(() => Entity, { foreignKey: string, localKey: string })` 来定义多对多的实体关联，第一个参数接收一个返回关联实体类的匿名函数, `foreignPivotKey` 用来定义中间表外键名, 默认使用 `主表名的单数形式_id` , `relatedPivotKey` 用来定义中间表关联外键名, 默认使用 `关联表名的单数形式_id`

定义 `User` 实体

```ts
import { Entity, table, autoIncrementPrimaryColumn, column, belongsToMany } from '@dazejs/framework';
import { Profile } from './profile';

@table('users')
export class User extends Entity {
  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @belongsToMany(() => Profile)
  profiles: Profile[];
}
```

定义 `Profile` 实体, 使用 `belongsToMany()` 定义多对多的反向实体关联

```ts
import { Entity, table, autoIncrementPrimaryColumn, column, belongsToMany } from '@dazejs/framework';
import { User } from './user';

@table('users')
export class Profile extends Entity {
  @autoIncrementPrimaryColumn()
  id: number;

  @column()
  name: string;

  @belongsToMany(() => User)
  users: Use[]r;
}
```

### 关联查询

使用 `with` 方法查询关联数据

```ts
const user = new User();
const res = await user.with('profile').get(1);
console.log(res)
```