const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      statusCode: ctx.status,
      error: err.message
    }
  }
}

module.exports = {
  errorHandler
}
