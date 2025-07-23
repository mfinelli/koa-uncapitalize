const { URL } = require("url");

module.exports = async function (ctx, next) {
  const originalUrl = ctx.request.url;

  if (/[A-Z]/.test(originalUrl)) {
    const parsed = new URL(originalUrl, `http://${ctx.host}`);
    ctx.status = 301;
    ctx.redirect(parsed.pathname.toLowerCase() + parsed.search);
  } else {
    await next();
  }
};
