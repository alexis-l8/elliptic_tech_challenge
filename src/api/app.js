const Koa = require('koa')
const Router = require('koa-router')
const { errorHandler, notFoundHandler } = require('./middlewares')
const { client } = require('../services/blockchainClient')

const router = new Router()
router.get('/', async ctx => {
  const latestBlockId = await client.getLatestBlockId()
  const result = await client.getBlockTxInfo(latestBlockId)

  ctx.body = result
})

const app = new Koa()
app.use(errorHandler)
app.use(notFoundHandler)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = {
  app
}
