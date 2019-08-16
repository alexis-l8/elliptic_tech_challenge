const { app } = require('./api/app')

const port = process.env.PORT || 3000
app.listen(3000, () => {
  console.log(`Api started, running on port ${port}...`) // eslint-disable-line no-console
})
