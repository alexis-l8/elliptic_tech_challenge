const axios = require('axios')
const { chunk, flatten } = require('lodash')
const { wait } = require('../utils/wait')

const createBlockchainClient = (httpClient = axios) => {
  const http = httpClient.create({
    baseURL: 'https://api.blockchair.com/bitcoin'
  })

  /* :: (string, ?object) -> Promise<any> */
  const fetch = async (url, config) => {
    try {
      const response = await http.get(url, config)
      return response
    } catch (error) {
      if (error.response.status === 402) {
        console.log('402 - hit rate limit') // eslint-disable-line no-console
        await wait(60 * 1e3)
        return fetch(url, config)
      }

      throw error
    }
  }

  /* :: () -> Promise<number> */
  const getLatestBlockId = async () => {
    const response = await fetch('/blocks?limit=1')
    const [{ id: blockId }] = response.data.data
    return blockId
  }

  /* :: number -> Promise<object[]> */
  const getBlockInfo = async blockId => {
    const response = await fetch(`/dashboards/block/${blockId}`)
    const blockInfo = response.data.data[blockId].block

    return blockInfo
  }

  /* :: number -> Promise<object[]> */
  const getBlockTransactionsHashes = async blockId => {
    const { transaction_count: transactionCount } = await getBlockInfo(blockId)
    const params = { limit: transactionCount }
    const result = await fetch(`dashboards/block/${blockId}`, { params })
    const transactionsHashes = result.data.data[blockId].transactions

    return transactionsHashes
  }

  /* :: (number, ?Function) -> Promise<object[]> */
  const getBlockTxInfo = async (blockId, filter = () => true) => {
    const allHashes = await getBlockTransactionsHashes(blockId)
    const txLimitPerCall = 10
    const txHashChunks = chunk(allHashes, txLimitPerCall)

    const txHashChunkPromises = txHashChunks.map(txHashChunk => {
      const lazyPromise = async () => {
        const response = await fetch(`/dashboards/transactions/${txHashChunk.join(',')}`)
        return Object.values(response.data.data).filter(filter)
      }
      return lazyPromise
    })

    const getTxChunks = async (txChunkPromises, maxConcurrency) => {
      const result = []

      // eslint-disable-next-line no-restricted-syntax
      for (const lazyPromiseBatch of chunk(txChunkPromises, maxConcurrency)) {
        const promises = lazyPromiseBatch.map(fn => fn())
        // eslint-disable-next-line no-await-in-loop
        const resultFromBatch = await Promise.all(promises)

        result.push(...resultFromBatch)
      }

      return result
    }

    const txChunks = await getTxChunks(txHashChunkPromises, 1)
    const transactions = flatten(txChunks)

    return transactions
  }

  const api = {
    getLatestBlockId,
    getBlockInfo,
    getBlockTransactionsHashes,
    getBlockTxInfo
  }

  return api
}

const client = createBlockchainClient()

module.exports = {
  client,
  createBlockchainClient
}
