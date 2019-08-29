const base58 = require('bs58')
const { createBlockchainTxFetcher } = require('./services/blockchainTxFetcher')
const { client: blockchainClient } = require('./services/blockchainClient')
const { blockchainTxs } = require('./model/blockchainTxs')

/* :: object -> boolean */
const isTxInteresting = tx => {
  const isInteresting = tx.inputs.some(input => {
    const bytes = Buffer.from(input.script_hex, 'hex')
    return base58.encode(bytes).includes('E')
  })

  return isInteresting
}

/* :: () -> Promise<void> */
const startWorker = async () => {
  const blockchainTxFetcher = createBlockchainTxFetcher({
    filter: isTxInteresting
  })

  try {
    const latestBlockId = await blockchainClient.getLatestBlockId()
    console.log(`Blockchain fetcher starting at block ${latestBlockId}`) // eslint-disable-line no-console
    blockchainTxFetcher.start(latestBlockId)

    blockchainTxFetcher.on('data', (blockId, txs) => {
      blockchainTxs.set('bitcoin', blockId, txs)
      console.log(`${txs.length} interesting transactions stored for block ${blockId}`) // eslint-disable-line no-console
    })
  } catch (error) {
    console.log(error) // eslint-disable-line no-console
    console.log('Worker has failed to start. Exiting process') // eslint-disable-line no-console
    process.exit(1)
  }
}

module.exports = {
  startWorker
}
