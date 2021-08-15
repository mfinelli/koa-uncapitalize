module.exports = function* (next) {
  if (/[A-Z]/.test(this.request.url)) {
    this.status = 301;
    this.redirect(this.url.toLowerCase());
  } else {
    yield next;
  }
};
