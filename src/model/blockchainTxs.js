const createModel = () => {
  const store = new Map()

  const getTransactions = (chain, { limit = 1000 } = {}) => {
    if (!store.has(chain)) return []

    const blocks = store.get(chain)
    const blockIds = Object.keys(blocks)
      .map(Number)
      .sort((x, y) => y - x)

    const transactions = []

    // eslint-disable-next-line no-restricted-syntax
    for (const blockId of blockIds) {
      const blockTxs = blocks[blockId]

      transactions.push(...blockTxs.slice(0, limit - transactions.length))

      if (transactions.length >= limit) {
        return transactions
      }
    }

    return transactions
  }

  const setTransactions = (chain, blockId, txs) => {
    if (!store.has(chain)) store.set(chain, {})

    const blocks = store.get(chain)
    if (!Array.isArray(blocks[blockId])) blocks[blockId] = []

    const blockTxs = blocks[blockId]
    const txIds = blockTxs.map(tx => tx.transaction.id)

    txs.forEach(tx => {
      if (!txIds.includes(tx.transaction.id)) {
        blockTxs.push(tx)
      }
    })
  }

  const api = {
    get: getTransactions,
    set: setTransactions
  }

  return api
}

const blockchainTxs = createModel()

module.exports = {
  createModel,
  blockchainTxs
}
