const express = require('express')
const app = express()
const port = 3000
const userRouter = require('./routes/userRouter.ts');
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})