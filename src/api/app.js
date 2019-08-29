const Koa = require('koa')
const Router = require('koa-router')
const { errorHandler, notFoundHandler } = require('./middlewares')
const { blockchainTxs } = require('../model/blockchainTxs')

const router = new Router()
// Improve: The route could receive parameters for different blockchains and to filter for other types of interesting transactions
router.get('/transactions/interesting', async ctx => {
  const txs = blockchainTxs.get('bitcoin')

  ctx.body = {
    data: txs
  }
})

const app = new Koa()
app.use(errorHandler)
app.use(notFoundHandler)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = {
  app
}
