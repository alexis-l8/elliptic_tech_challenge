/* :: (object, Function) -> Promise<void> */
const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log(error) // eslint-disable-line no-console

    ctx.status = error.status || 500
    ctx.body = {
      statusCode: ctx.status,
      error: error.message
    }
  }
}

module.exports = {
  errorHandler
}
