(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[92],{

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("# 响应\n\n可以通过友好的响应对象操作 `Http` 响应\n\n---\n\n## 数据输出\n\n大部分情况只要直接在控制器方法返回数据即可\n```ts {7}\nimport { Controller, Get } from '@dazejs/framework'\n\n@Controller('/users')\nexport default class User {\n    @Get('/:id')\n    show(id: number) {\n        return `user id: ${id}`\n    }\n}\n```\n\n也可以使用 `response()` 助手函数\n```ts {7}\nimport { response, Controller, Get } from '@dazejs/framework'\n\n@Controller('users')\nexport default class User {\n    @Get()\n    show(id: number) {\n        return response('im a data', 200)\n    }\n}\n```\n\n也可以直接实例化响应对象\n```ts {7}\nimport { Response, Controller, Get } from '@dazejs/framework'\n\n@Controller('users')\nexport default class User {\n    @Get()\n    show(id: number) {\n        return new Response('im a data', 200)\n    }\n}\n```\n\n### `response([data [, code = 200 [, headers = {}]]])`\n\n`Response` 构造函数或者 `reponse()` 函数可以接收3个参数\n- `data`: 响应数据\n- `code`: 响应状态码, 默认200\n- `headers`: 响应头\n\n---\n\n## 响应数据\n\n我们也可以使用 `response().setData([data])` 方法设置需要响应的数据\n\n```ts\nimport { Controller, Get, response } from '@dazejs/framework'\n\n@Controller('posts')\nexport default class Post {\n    @Get()\n    index() {\n        return response().setData({\n            name: 'Dazejs'\n        })\n    }\n}\n```\n\n---\n\n## 响应状态码\n\n使用 `response().setCode([code])` 方法设置需要响应状态码\n\n```ts\nimport { Controller, Get } from '@dazejs/framework'\n\n@Controller('posts')\nexport default class Post {\n    @Get(), response\n    index() {\n        return response().setData({\n            name: 'Dazejs'\n        }).setCode(200)\n    }\n}\n```\n\n---\n\n## 响应头\n\n使用 `response().setHeader(<name>, [value])` 方法设置响应头\n\n```ts {10,11}\nimport { Controller, Get, response } from '@dazejs/framework'\n\n@Controller('posts')\nexport default class Post {\n    @Get()\n    index() {\n        return response()\n            .setData({ name: 'Zewail' })\n            .setCode(200)\n            .setHeader('content-type', 'application/json')\n            .setHeader({ 'Version': 'v1' })\n    }\n}\n```\n\n> setData、setCode、setHeader 等方法支持链式调用，状态码默认为 200\n\n## 成功响应\n\n使用 `response.success([data [, code = 200]])` 方法返回一个成功响应：\n\n```ts {7}\nimport { Controller, Get, response } from '@dazejs/framework'\n\n@Controller('/posts')\nexport default class Post {\n    @Get('/:id')\n    show(id) {\n        return response().success('im a data', 200)\n    }\n}\n```\n\n框架对常用成功状态码进行了封装，可以简单的调用这些方法，返回想要的信息和状态码:\n\n```ts {8}\nimport { Controller, Get, response } from '@dazejs/framework'\n\n@Controller('/users')\nexport default class User {\n    @Get('/:id')\n    show(id) {\n        // 返回一个 200 状态码的响应\n        return response().OK('im a data')\n    }\n}\n```\n\n> 所有方法都提供了对应的 `小驼峰` 和 `大驼峰` 写法\n\n| 状态码 | 方法                          |\n| ------ | ----------------------------- |\n| 100    | Continue()                      |\n| 101    | SwitchingProtocols()            |\n| 102    | Processing()                    |\n| 103    | EarlyHints()                    |\n| 200    | OK()                            |\n| 201    | Created()                       |\n| 202    | Accepted()                      |\n| 203    | NonAuthoritativeInformation()   |\n| 204    | NoContent()                     |\n| 205    | ResetContent()                  |\n| 206    | PartialContent()                |\n| 207    | MultiStatus()                   |\n| 208    | AlreadyReported()               |\n| 226    | IMUsed()                        |\n| 300    | MultipleChoices()               |\n| 302    | Found()                         |\n| 303    | SeeOther()                      |\n| 304    | NotModified()                   |\n| 305    | UseProxy()                      |\n| 306    | Unused()                        |\n| 307    | TemporaryRedirect()             |\n| 308    | PermanentRedirect()             |\n\n\n---\n\n## 错误响应\n\n使用 `response().error([message [, code = 404]])` 方法来抛出一个 `http` 异常：\n\n```ts {10}\nimport { Controller, Get, response } from '@dazejs/framework'\n\n@Controller('users')\nexport default class User {\n    @Get(':id')\n    show(id) {\n        // ...\n        if (!user) {\n            // 抛出一个404异常\n            return response().error('no user!', 404)\n        }\n    }\n}\n```\n\n框架对常用错误状态码进行了封装，可以简单的调用这些方法，返回想要的信息和状态码:\n\n```ts {10}\nimport { Controller, Get, response } from '@dazejs/framework'\n\n@Controller('users')\nexport default class User {\n    @Get(':id')\n    show(id) {\n        // ...\n        if (!user) {\n            // 抛出一个404异常\n           return response().NotFound('no user!')\n        }\n    }\n}\n```\n\n| 状态码 | 方法                          |\n| ------ | ----------------------------- |\n| 400    | BadRequest()                    |\n| 401    | Unauthorized()                  |\n| 402    | PaymentRequired()               |\n| 403    | Forbidden()                     |\n| 404    | NotFound()                      |\n| 405    | MethodNotAllowed()              |\n| 406    | NotAcceptable()                 |\n| 407    | ProxyAuthenticationRequired()   |\n| 408    | RequestTimeout()                |\n| 409    | Conflict()                      |\n| 410    | Gone()                          |\n| 411    | LengthRequired()                |\n| 412    | PreconditionFailed()            |\n| 413    | PayloadTooLarge()               |\n| 414    | URITooLong()                    |\n| 415    | UnsupportedMediaType()          |\n| 416    | RangeNotSatisfiable()           |\n| 417    | ExpectationFailed()             |\n| 418    | ImATeapot()                     |\n| 421    | MisdirectedRequest()            |\n| 422    | UnprocessableEntity()           |\n| 423    | Locked()                        |\n| 424    | FailedDependency()              |\n| 425    | UnorderedCollection()           |\n| 426    | UpgradeRequired()               |\n| 428    | PreconditionRequired()          |\n| 429    | TooManyRequests()               |\n| 431    | RequestHeaderFieldsTooLarge()   |\n| 451    | UnavailableForLegalReasons()    |\n| 500    | InternalServerError()           |\n| 501    | NotImplemented()                |\n| 502    | BadGateway()                    |\n| 503    | ServiceUnavailable()            |\n| 504    | GatewayTimeout()                |\n| 505    | HTTPVersionNotSupported()       |\n| 506    | VariantAlsoNegotiates()         |\n| 507    | InsufficientStorage()           |\n| 508    | LoopDetected()                  |\n| 509    | BandwidthLimitExceeded()        |\n| 510    | NotExtended()                   |\n| 511    | NetworkAuthenticationRequired() |\n\n---\n\n## 重定向\n\n#### 重定向到地址\n\n使用 `redirect` 函数:\n```ts\nimport { Controller, Get, redirect } from '@dazejs/framework'\n\n@Controller()\nexport default class User {\n    @Get(':id')\n    show(id) {\n        return redirect('http://www.google.com/')\n    }\n}\n```\n\n\n使用 `Redirect` 实例的 `go` 方法:\n\n```ts\nimport { Controller, Get, redirect } from '@dazejs/framework'\n\n@Controller()\nexport default class Post {\n     @Get()\n    index() {\n        // ...\n    }\n\n    @http.post()\n    store() {\n        // store success\n        return redirect().go('/index')\n    }\n    \n}\n```\n\n#### 带一次性 session 的重定向\n\n我们可以在重定向的时候添加一次性的 session，该 session 会在下次请求的时候被清除，这在处理页面错误提示的时候非常有用\n\n```ts\nimport { Controller, Get, Post, redirect } from '@dazejs/framework'\n\n@Controller()\nexport default class Post {\n    @Get()\n    index() {\n        // ...\n    }\n    \n    @Post()\n    store() {\n        // store success\n        return redirect().go('/index').with('username', '用户名不能为空')\n    }\n}\n```\n\n```html\n<!-- ... -->\n<input name='username'/>\n<p>\n  {% if session.username %}\n    {{ session.username }}\n  {% endif %}\n</p>\n<!-- ... -->\n```\n\n---\n\n## 下载文件\n\n使用 `download`来下载文件\n\n```ts\nimport { Controller, Get, response } from '@dazejs/framework'\n\n@Controller()\nexport default class Post {\n    \n    @Get()\n    download() {\n        // store success\n        const fileStream = /* 创建文件流 */\n        return response().download(fileStream, 'xxx.pdf')\n    }\n}\n```\n\n");

/***/ })

}]);