exports.catchErrors = fn =>
  function(ctx, next) {
    return fn(ctx, next).catch(next);
  };

exports.notFound = (ctx, next) => {
  const err = new Error('Not Found');
  ctx.err.status = 404;
  next(err);
};

exports.validationErrors = (err, ctx, next) => {
  if (!err.errors) return next(err);

  const errorKeys = Object.keys(err.errors);
  errorKeys.forEach(key => ctx.flash('error', err.errors[key].message));
  ctx.redirect('back');
};

exports.developmentErrors = (err, ctx, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
  };

  ctx.status(err.status || 500);
  ctx.format({
    'text/html': () => {
      ctx.render('error', errorDetails);
    },
    'application/json': () => ctx.json(errorDetails),
  });
};

exports.productionErrors = (err, ctx, next) => {
  ctx.status(err.status || 500);
  ctx.render('error', {
    message: err.message,
    error: {},
  });
};