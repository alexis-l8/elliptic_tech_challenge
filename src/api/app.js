const Koa = require('koa')
const Router = require('koa-router')
const { errorHandler, notFoundHandler } = require('./middlewares')

const router = new Router()
router.get('/', ctx => {
  ctx.body = 'Hello World'
})

const app = new Koa()
app.use(errorHandler)
app.use(notFoundHandler)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = {
  app
}
