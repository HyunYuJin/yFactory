const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'src')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'))
})

app.get('/question', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/question.html'))
})

app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/result.html'))
})

app.listen(3000, () => {
  console.log('Server running on 3000!')
})