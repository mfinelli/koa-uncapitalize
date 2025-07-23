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
    it("should redirect to lowercase path", (done) => {
      subject.get("/TEST").expect(301).expect("Location", "/test", done);
    });

    it("should preserve query string", (done) => {
      subject
        .get("/TEST?foo=Bar")
        .expect(301)
        .expect("Location", "/test?foo=Bar", done);
    });
  });
});

describe("uncapitalize middleware", () => {
  it("should redirect to a lowercase path with query string", async () => {
    const ctx = {
      request: {
        url: "/HELLO?Foo=Bar",
      },
      url: "/HELLO?Foo=Bar",
      host: "example.com",
      redirect: function (url) {
        this._redirectedTo = url;
      },
    };

    await uncapitalize(ctx, async () => {
      throw new Error("next() should not be called");
    });

    expect(ctx._redirectedTo).to.equal("/hello?Foo=Bar");
  });

  it("should not redirect to an external host even if schemeless", async () => {
    const ctx = {
      request: {
        url: "//evil.com/HELLO",
      },
      url: "//evil.com/HELLO",
      host: "example.com",
      redirect: function (url) {
        this._redirectedTo = url;
      },
    };

    await uncapitalize(ctx, async () => {
      throw new Error("next() should not be called");
    });

    expect(ctx._redirectedTo).to.equal("/hello");
    expect(ctx._redirectedTo).to.not.match(/^\/\//);
    expect(ctx._redirectedTo).to.not.match(/^https?:\/\//);
  });

  it("should call next() if URL is already lowercase", async () => {
    let nextCalled = false;

    const ctx = {
      request: {
        url: "/ok",
      },
      url: "/ok",
    };

    await uncapitalize(ctx, async () => {
      nextCalled = true;
    });

    expect(nextCalled).to.be.true;
  });
});
