---
home: true
heroImage: /logo.svg
heroText: Daze.js
tagline: Node.js Web Framework
actionText: Get Start
actionLink: /zh/1.x/quick-start
---

----

### Easy to use
```bash
# install CLI tools
$ npm install -g @dazejs/cli

# create Daze.js project
$ daze create daze-example

# goto project dir
$ cd daze-example

# start service, default port is 8000
$ npm start
```

### Make the best development experience possible
```js
const { Controller, Route, Http } = require('@dazejs/framework')

@Route('/superman')
class Superman extends Controller {
  @Http.Get('/create')
  create() {
    return this.response().Created()
  }
}
```