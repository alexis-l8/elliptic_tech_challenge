const axios = require('axios')
const { chunk } = require('lodash')
const { wait } = require('../utils/wait')

const createBlockchainClient = (httpClient = axios) => {
  const http = httpClient.create({
    baseURL: 'https://api.blockchair.com/bitcoin'
  })

  const fetch = async (url, config) => {
    try {
      const response = await http.get(url, config)
      return response
    } catch (error) {
      console.log('error', error) // eslint-disable-line no-console
      if (error.response.status === 402) {
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
    // const { transaction_count: transactionCount } = await getBlockInfo(blockId)
    // const params = { limit: transactionCount }
    const params = { limit: 6 }
    const result = await fetch(`dashboards/block/${blockId}`, { params })
    const { transactions: transactionsHashes } = result.data.data[blockId]

    return transactionsHashes
  }

  const getBlockTxInfo = async blockId => {
    const allHashes = await getBlockTransactionsHashes(blockId)
    const txLimitPerCall = 2
    const txHashChunks = chunk(allHashes, txLimitPerCall)

    const txHashChunkPromises = txHashChunks.map(txHashChunk => {
      const lazyPromise = async () => {
        const response = await fetch(`/dashboards/transactions/${txHashChunk.join(',')}`)
        return Object.values(response.data.data)
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
    return txChunks
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
