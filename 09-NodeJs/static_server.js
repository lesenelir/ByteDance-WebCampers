const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000

const folderPath = path.resolve(__dirname, './static')

const server = http.createServer((req, res) => {
  const info = url.parse(req.url)
  const filePath = path.resolve(folderPath, './', info.path)
  const filestream = fs.createReadStream(filePath)
  filestream.pipe(res)
})

server.listen(port, () => {
  console.log(`server listen on: ${port}`);
})
