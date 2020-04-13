const handlePost = require('./routes/handlePost')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 9001

const corsOptions = {
  origin: 'http://localhost:9000',
  optionsSuccessStatus: 200
}

app.get('/post/1', cors(corsOptions), handlePost)

app.listen(port, () => console.log(`Listening at port: ${port}`))
