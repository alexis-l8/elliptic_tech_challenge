const { app } = require('./api/app')
const { startWorker } = require('./worker')

const port = process.env.PORT || 3000
app.listen(3000, () => {
  console.log(`Api started, running on port ${port}...`) // eslint-disable-line no-console
})

// Start collecting and storing interesting Bitcoin transactions
startWorker()
