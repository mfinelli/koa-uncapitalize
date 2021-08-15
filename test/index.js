const koa = require("koa"),
  expect = require("expect"),
  uncapitalize = require("../"),
  app = koa();

app.use(uncapitalize);
app.use(function* (next) {
  if (this.path.toLowerCase() != "/test") {
    return yield next;
  }

  this.body = "OK";
});

const request = require("supertest").agent(app.listen());

describe("koa uncapitalize", function () {
  describe("lowercase routes", function () {
    it("should not redirect", function (done) {
      request.get("/test").expect(200, done);
    });
  });

  describe("uppercase routes", function () {
    it("should redirect", function (done) {
      request.get("/TEST").expect(301, done);
    });
  });
});
