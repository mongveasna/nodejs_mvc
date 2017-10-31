api
===

The Node.js Rest API

```js

module.exports = {
    async landing(ctx, next) {
        await ctx.render("index", {})
    }
};
```
### Quick Start

inside [app root] directory open and modify route.js as below

```js
module.exports = exports = {
    root: {
        handler: 'Home@landing', // say which controller will handler this
        path: '/', // path for client request
        method: 'GET' //
    }
};
```

