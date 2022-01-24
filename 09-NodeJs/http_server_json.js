const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  const bufs = []
  req.on('data', data => {
    bufs.pust(data)
  })
  req.on('end', () => {
    let reqData = {}
    try {
      reqData = JSON.parse(Buffer.concat(bufs).toString())
    } catch (err) {
    }
    res.setHeader('Content-type', 'applicaiton/json')
    res.end(JSON.stringify({
      echo: reqData.msg || 'Hello',
    }))
  })
})

server.listen(port, () => {
  console.log('listening on: ', port)
})
