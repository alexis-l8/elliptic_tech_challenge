const EventEmitter = require('events')
const { client: blockchainClient } = require('./blockchainClient')

/* :: ?object -> object */
const createBlockchainTxFetcher = ({ client = blockchainClient } = {}) => {
  const eventEmitter = new EventEmitter()
  let fetchInProgress = false
  let intervalId
  let currentBlockId

  /* :: number -> Promise<void> */
  const fetchTxsForBlock = async blockId => {
    console.log(`Fetching transactions for block ${currentBlockId}`)
    fetchInProgress = true

    try {
      const txs = await client.getBlockTxInfo(blockId)
      eventEmitter.emit('data', blockId, txs)
    } catch (error) {
      console.log(error)
    }

    fetchInProgress = false
  }

  /* :: (number, ?number) -> Promise<void> */
  const start = (blockId, interval) => {
    clearInterval(intervalId)
    currentBlockId = blockId

    fetchTxsForBlock(blockId)

    const fetchNextBlock = () => {
      if (fetchInProgress) return

      currentBlockId += 1
      fetchTxsForBlock(currentBlockId)
    }

    intervalId = setInterval(fetchNextBlock, interval)
  }

  /* :: () => number */
  const stop = () => {
    clearInterval(intervalId)
    console.log(`Fetching stopped at block ${currentBlockId}`)
  }

  /* :: (string, Function) -> EvenEmitter */
  const on = eventEmitter.on.bind(eventEmitter)

  const api = {
    start,
    stop,
    on
  }

  return api
}

module.exports = {
  createBlockchainTxFetcher
}
