# Koa Uncapitalize

A [koajs](https://github.com/koajs/koa) middleware to uncapitalize routes
based on a similar module that was created for express:
[express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize).

## Installation

Install the package using [npm](https://www.npmjs.com/):

```shell
$ npm install --save koa-uncapitalize
```

## Usage

Usage is easy: just require the module and `app.use` it:

```javascript
const uncapitalize = require('koa-uncapitalize');
app.use(uncapitalize);
```

Or all at once:

```javascript
app.use(require('koa-uncapitalize'));
```

Now all users accessing uppercase routes will be redirected (301) to the
lowercase equivalent: `http://example.com/TEST` -> `http://example.com/test`.

## License

Licensed under the [MIT license](https://opensource.org/licenses/MIT). For
more information please see the LICENSE file that should have been included
with the project.
