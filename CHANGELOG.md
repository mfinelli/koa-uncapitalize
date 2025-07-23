# Change Log

This file keeps track of notable changes to the `koa-uncapitalize` project.
It aims to adhere to [semantic versioning](http://semver.org).

## unreleased

- **BREAKING:** Drop support for node < 20
- **BREAKING:** Lowercase only the request path using the host as a base and
  stop lowercasing request query strings
- **BREAKING:** Require koa v3. This probably still works with koa v2 but we're
  only testing with v3 going forward

## [2.0.3] - 2021-08-15

Fix to cross publish to GitHub packages.

## [2.0.2] - 2021-08-15

Fix `repository` for publish automation.

## [2.0.1] - 2021-08-15

Fix for publish automation.

## [2.0.0] - 2021-08-15

- **BREAKING:** Upgrade to koa v2 middleware signature
- Add: basic tests

## [1.0.0] - 2016-04-30

Initial release.
