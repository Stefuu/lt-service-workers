const handlePost = require('./routes/handlePost')
const express = require('express')
const app = express()
const port = 9001

app.get('/post/1', handlePost)

app.listen(port, () => console.log(`Listening at port: ${port}`))
