const express = require("express") // requires vs import, commonjs vs es modules

const app = express()

app.get('/', function (req, res) {
    res.send('Hello Benguela City!')
})

app.listen(3000)