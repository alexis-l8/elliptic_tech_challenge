const { createBlockchainTxFetcher } = require('./services/blockchainTxFetcher')
const { client: blockchainClient } = require('./services/blockchainClient')
const { blockchainTxs } = require('./model/blockchainTxs')

// const isTxInteresting = () => {}

const startWorker = async () => {
  const blockchainTxFetcher = createBlockchainTxFetcher()

  try {
    const latestBlockId = await blockchainClient.getLatestBlockId()
    console.log(`Blockchain fetcher starting at block ${latestBlockId}`)
    blockchainTxFetcher.start(latestBlockId)

    blockchainTxFetcher.on('data', (blockId, txs) => {
      blockchainTxs.set('bitcoin', blockId, txs)
      console.log(`${txs.length} interesting transactions stored for block ${blockId}`)
    })
  } catch (error) {
    console.log(error)
    console.log('Worker has failed to start. Exiting process')
    process.exit(1)
  }
}

module.exports = {
  startWorker
}
