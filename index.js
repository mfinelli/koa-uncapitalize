module.exports = async function (ctx, next) {
  if (/[A-Z]/.test(ctx.request.url)) {
    ctx.status = 301;
    ctx.redirect(ctx.url.toLowerCase());
  } else {
    await next();
  }
};
