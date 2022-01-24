const server = http.createServer(async (req, res) => {
  // receive body from client
  const msg = new Promise((resolve, reject) => {
    const bufs = []
    req.on('data', (data) => {
      bufs.push(data)
    })
    req.on('error', (err) => {
      reject(err)
    })
    req.on('end', () => {
      let msg = 'hello'
      try {
        const ret = JSON.parse(Buffer.concat(bufs).toString('utf8'))
        msg = ret.msg
      } catch (e) {
        // receiveinvaild json data
      }

      resolve(msg)
    })
  })

  // response
  const responseJson = {
    msg: `receive: ${msg}`
  }
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(responseJson))
})
