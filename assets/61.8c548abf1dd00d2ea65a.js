(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[61],{

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 模型\n\n模型可以理解为数据抽象层，模型提供了许多便捷的数据操作接口\n\n---\n\n## 实体\n\n#### 定义\n\n定义一个实体类可以用来描述一个模型, 通过继承 `@entity()` 来定义一个实体，下面是一个 `User` 实体:\n\n```ts\nimport { entity, table, column, autoIncrementPrimaryColumn } from '@dazejs/framework';\n\n@entity()\nexport class User {\n\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n}\n```\n\n#### 表名\n\n每个实体都需要配置一个对应的表名，通过使用 `@table()` 来定义表名:\n\n```ts\nimport { entity, table, column, autoIncrementPrimaryColumn } from '@dazejs/framework';\n\n@table('users')\n@entity()\nexport class User {\n\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n}\n```\n\n#### 字段\n\n通过字段定义可以描述模型对应的数据库字段\n\n```ts\nimport { entity, table, column, autoIncrementPrimaryColumn } from '@dazejs/framework';\n\n@table('users')\n@entity()\nexport class User extends Entity {\n\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @column()\n  age: number;\n\n  @column()\n  gender: 'M' | 'F';\n}\n```\n\n#### 主键\n\n每个实体都至少需要配置一个主键\n\n**普通主键**\n\n```ts\nimport { entity, table, column, primaryColumn } from '@dazejs/framework';\n\n@table('users')\n@entity()\nexport class User extends Entity {\n\n  @primaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n}\n```\n\n**自增主键**\n\n```ts\nimport { entity, table, column, autoIncrementPrimaryColumn } from '@dazejs/framework';\n\n@table('users')\n@entity()\nexport class User {\n\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n}\n```\n\n---\n\n## 模型实例\n\n控制器中可以使用控制器基类的 `model` 方法来创建\n\n```ts\nimport { controller, http } from '@dazejs/framework'\nimport { UserEntity } from '../entities/user'\n\n@controller()\nexport default class {\n  @http.get()\n  index() {\n    const model = this.model(UserEntity)\n  }\n}\n```\n\n或者通过继承 `BaseEntity` 来直接实例化\n\n```ts\nimport { entity, BaseEntity, table, column, autoIncrementPrimaryColumn } from '@dazejs/framework';\n\n@table('users')\n@entity()\nexport class User extends BaseEntity {\n\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n}\n```\n直接实例化\n\n```ts\nimport { controller, http } from '@dazejs/framework'\nimport { UserEntity } from '../entities/user'\n\n@controller()\nexport default class {\n  @http.get()\n  index() {\n    const model = new UserEntity();\n  }\n}\n```\n\n---\n\n## 查询模型\n\n#### 查询单个模型\n\n根据主键值获取单条记录\n\n```ts\nconst user = new User();\nconst res = await user.get(1);\nconsole.log(res.age)\n```\n\n根据查询构建器获取单条记录\n\n```ts\nconst user = new User();\nconst res = await user.createQueryBuilder().where('id', 1).first();\nconsole.log(res.age)\n```\n\n\n#### 查询多个模型\n\n遍历主键获取\n```ts\nconst user = new User();\nfor (const id of [1, 2, 3]) {\n  const res = await user.get(id);\n  console.log(res.age)\n}\n```\n\n使用查询构建器查询\n```ts\nconst user = new User();\nconst res = await user.createQueryBuilder().whereIn('id', [1, 2, 3]).find();\n\nfor (const item of res) {\n  console.log(item.age)\n}\n```\n\n---\n\n## 新增模型\n\n模型数据的新增和数据库的新增数据有所区别，数据库的新增只是单纯的写入数据，而模型的新增则会包含自动时间戳，软删除等功能\n\n#### 新增单个模型\n\n```ts\nconst user = new User();\nuser.name = 'dazejs';\nuser.age = 10';\nawait user.save();\n```\n\n也可以使用 `create` 方法传入数据对象\n\n```ts\nconst user = new User();\nawait user.create({\n  name: 'dazejs',\n  age: 10\n});\n```\n\n---\n\n## 更新模型\n\n更新数据前我们需要先取出数据，然后进行更新\n\n```ts\nconst user = new User();\nconst res = await user.get(1);\nres.name = 'dazejs'\nres.age = 10\nawait res.save();\n```\n\n> `save` 方法会自动判断是更新还是新增操作\n> \n> 不要调用 `save` 方法进行多次数据写入。\n\n---\n\n## 删除模型\n\n#### 删除当前模型\n\n使用 `delete` 方法删除当前模型, 删除前需要先取出模型\n\n```ts\nconst user = new User();\nconst res = await user.get(1);\nawait res.delete();\n```\n\n#### 根据主键删除\n\n使用 `destroy` 根据主键删除模型\n\n```ts\nconst user = new User();\nuser.destroy(1, 2, 3)\n```\n\n---\n\n## 自动时间戳\n\n模型支持配置自动插入/更新时间戳字段的能力\n\n### 自动插入时间戳\n\n该模型在每次创建数据的时候，都会自动插入 `created_at` 为当前时间戳，默认 `int` 类型:\n\n```ts\nimport { entity, BaseEntity, table, column, autoIncrementPrimaryColumn, createTimestampColumn } from '@dazejs/framework';\n\n@table('users')\n@entity()\nexport class User extends BaseEntity {\n\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @createTimestampColumn()\n  created_at: number;\n}\n```\n\n如果需要修改为其他类型的时间戳字段，可以通过 `createTimestampColumn` 的参数修改\n\n支持 `int`、`timestamp`、`date`、`time`、`year`、`datetime`\n\n```ts\nimport { entity, BaseEntity, table, column, autoIncrementPrimaryColumn, createTimestampColumn } from '@dazejs/framework';\n\n@table('users')\n@entity()\nexport class User extends BaseEntity {\n\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @createTimestampColumn('timestamp')\n  created_at: string;\n}\n```\n\n### 自动更新时间戳\n\n该模型在每次更新数据的时候，都会自动修改 `updated_at` 为当前时间戳，默认 `int` 类型:\n\n```ts\nimport { entity, BaseEntity, table, column, autoIncrementPrimaryColumn, updateTimestampColumn } from '@dazejs/framework';\n\n@table('users')\n@entity()\nexport class User extends BaseEntity {\n\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @updateTimestampColumn()\n  updated_at: number;\n}\n```\n\n---\n\n## 软删除\n\n在实际项目中，对数据频繁使用删除操作会导致性能问题，软删除的作用就是把数据加上删除标记，而不是真正的删除，同时也便于需要的时候进行数据的恢复\n\n通过配置软删除字段来开启软删除功能, 示例模型在删除操作的时候会自动更新 `deleted_at` 字段为当前时间戳，默认 `int` 类型\n\n```ts\nimport { entity, BaseEntity, table, column, autoIncrementPrimaryColumn, softDeleteColumn } from '@dazejs/framework';\n\n@table('users')\n@entity()\nexport class User extends BaseEntity {\n\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @softDeleteColumn()\n  deleted_at: number;\n}\n```\n\n定义好模型后，我们就可以通过模型的删除方法来进行删除操作, 数据并不会在数据库中真实删除:\n\n```ts\nconst user = new User();\nconst res = await user.get(1);\nawait res.delete();\n```\n\n并且无法直接查询该数据\n\n```ts\nconst user = new User();\nawait user.destory(1);\nconst res = await user.get(1);\nconsole.log(res)\n```\n\n---\n\n## 模型输出\n\n一般通过模型查询到的结果否是模型实例, 我们可以通过模型方法来获取模型的真实数据\n\n**getAttribute(name)**\n\n根据字段名获取字段值\n\n```ts\nconst user = new User();\nconst res = await user.get(1);\nconsole.log(res.getAttribute('age'))\n```\n\n**getAttributes()**\n\n获取模型数据\n\n```ts\nconst user = new User();\nconst res = await user.get(1);\nconsole.log(res.getAttributes())\n```\n\n---\n\n## 关联关系\n\n通过模型关联操作把数据表的关联关系对象化，关联操作比起常规的数据库联表操作更加直观\n\n### 一对一关联\n\n#### 定义关联关系\n\n使用 `hasOne(() => Entity, { foreignKey: string, localKey: string })` 来定义一对一的实体关联，第一个参数接收一个返回关联实体类的匿名函数 (为了解决循环依赖的问题), `foreignKey` 用来定义自定义外键名, 默认使用 `关联实体表名的单数形式_id` , `localKey` 用来定义主键名, 默认当前模型主键名\n\n定义 `User` 实体\n\n```ts\nimport { entity, BaseEntity, table, autoIncrementPrimaryColumn, column, hasOne } from '@dazejs/framework';\nimport { Profile } from './profile';\n\n@table('users')\n@entity()\nexport class User extends BaseEntity {\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @hasOne(() => Profile)\n  profile: Profile;\n}\n```\n\n定义 `Profile` 实体, 使用 `belongsTo()` 定义一对一的反向实体关联\n\n```ts\nimport { entity, BaseEntity, table, autoIncrementPrimaryColumn, column, belongsTo } from '@dazejs/framework';\nimport { User } from './user';\n\n@table('users')\n@entity()\nexport class Profile extends BaseEntity {\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @belongsTo(() => User)\n  user: User;\n}\n```\n\n### 一对多关联\n\n\n使用 `hasMany(() => Entity, { foreignKey: string, localKey: string })` 来定义一对多的实体关联，第一个参数接收一个返回关联实体类的匿名函数, `foreignKey` 用来定义自定义外键名, 默认使用 `关联实体表名的单数形式_id` , `localKey` 用来定义主键名, 默认当前模型主键名\n\n定义 `User` 实体\n\n```ts\nimport { Entity, BaseEntity, table, autoIncrementPrimaryColumn, column, hasMany } from '@dazejs/framework';\nimport { Profile } from './profile';\n\n@table('users')\n@entity()\nexport class User extends BaseEntity {\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @hasMany(() => Profile)\n  profiles: Profile[];\n}\n```\n\n定义 `Profile` 实体, 使用 `belongsTo()` 定义一对一的反向实体关联\n\n```ts\nimport { entity, BaseEntity, table, autoIncrementPrimaryColumn, column, belongsTo } from '@dazejs/framework';\nimport { User } from './user';\n\n@table('users')\n@entity()\nexport class Profile extends BaseEntity {\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @belongsTo(() => User)\n  user: User;\n}\n```\n\n### 多对多关联\n\n\n使用 `hasMany(() => Entity, { foreignKey: string, localKey: string })` 来定义多对多的实体关联，第一个参数接收一个返回关联实体类的匿名函数, `foreignPivotKey` 用来定义中间表外键名, 默认使用 `主表名的单数形式_id` , `relatedPivotKey` 用来定义中间表关联外键名, 默认使用 `关联表名的单数形式_id`\n\n定义 `User` 实体\n\n```ts\nimport { entity, BaseEntity, table, autoIncrementPrimaryColumn, column, belongsToMany } from '@dazejs/framework';\nimport { Profile } from './profile';\n\n@table('users')\n@entity()\nexport class User extends BaseEntity {\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @belongsToMany(() => Profile)\n  profiles: Profile[];\n}\n```\n\n定义 `Profile` 实体, 使用 `belongsToMany()` 定义多对多的反向实体关联\n\n```ts\nimport { entity, BaseEntity, table, autoIncrementPrimaryColumn, column, belongsToMany } from '@dazejs/framework';\nimport { User } from './user';\n\n@table('users')\n@entity()\nexport class Profile extends BaseEntity {\n  @autoIncrementPrimaryColumn()\n  id: number;\n\n  @column()\n  name: string;\n\n  @belongsToMany(() => User)\n  users: Use[]r;\n}\n```\n\n### 关联查询\n\n使用 `with` 方法查询关联数据\n\n```ts\nconst user = new User();\nconst res = await user.with('profile').get(1);\nconsole.log(res)\n```");

/***/ })

}]);