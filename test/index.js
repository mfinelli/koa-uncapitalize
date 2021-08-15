const agent = require("supertest-koa-agent"),
  expect = require("chai").expect,
  Koa = require("koa"),
  uncapitalize = require("../");

var app = null;
var subject = null;

beforeEach(() => {
  app = new Koa();

  app.use(uncapitalize);
  app.use((ctx, next) => {
    if (ctx.path.toLowerCase() != "/test") {
      return next();
    }

    ctx.response.body = "OK";
  });

  subject = agent(app);
});

describe("koa uncapitalize", () => {
  describe("lowercase routes", () => {
    it("should not redirect", (done) => {
      subject.get("/test").expect(200, "OK", done);
    });
  });

  describe("uppercase routes", () => {
    it("should redirect", (done) => {
      subject.get("/TEST").expect(301, done);
    });
  });
});
