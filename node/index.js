const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const random = require('uuid/v4')
const { fetchEmotion, writeFile } = require('./helpers.js')

const app = express()

app.use(morgan('dev'))
app.use(fileUpload())
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.text())
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/api/upload', (req, res) => {
  const fileName = random()
  const getFilePath = fileName => {
    // Dynamiclly get published url for captured image
    // Note that use cann't use localhost to create published url 
    const hostURL = req.protocol + '://' + req.get('host')
    return `${hostURL}/${fileName}`
  }

  const data = req.body.img.replace(/^data:image\/jpeg;base64,/, "")
  writeFile(`public/${fileName}.jpg`, data, 'base64')
    .then(getFilePath)
    .then(fetchEmotion)
    .then(emotion => res.send(emotion))
})

app.listen(process.env.PORT || 8000);
