const mySecret = process.env['MESSAGE_STYLE']

let express = require('express');
const bodyParser = require('body-parser');
let app = express();


console.log("Hello World")

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({ time: req.time })
})

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})
app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/", (req, res) => {
  res.send('Hello Express')
})

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({ 'message': 'HELLO JSON' })
  } else {
    res.json({ 'message': 'Hello json' })
  }
})

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word })
})

app.route("/name")
  .get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` })
  }).post((req, res) => {
    console.log(req.body.first)
    res.json({name: `${req.body.first} ${req.body.last}`})
  })


// app.route(path).get(handler).post(handler).


























module.exports = app;
