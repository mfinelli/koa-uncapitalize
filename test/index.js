const agent = require("supertest-koa-agent"),
  expect = require("chai").expect,
  Koa = require("koa"),
  uncapitalize = require("../");

var app = null;
var subject = null;

beforeEach(() => {
  app = new Koa();

  app.use(uncapitalize);
  app.use(function* (next) {
    if (this.path.toLowerCase() != "/test") {
      return yield next;
    }

    this.body = "OK";
  });

  subject = agent(app);
});

describe("koa uncapitalize", () => {
  describe("lowercase routes", () => {
    it("should not redirect", (done) => {
      subject.get("/test").expect(200, done);
    });
  });

  describe("uppercase routes", () => {
    it("should redirect", (done) => {
      subject.get("/TEST").expect(301, done);
    });
  });
});
