const express = require('express')
const cfg = require('./knexfile')
const knex = require('knex')(cfg.development)
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/listpessoas', (req, res) => {
  knex('pessoas').select().then(pessoas => {
    res.send(JSON.stringify(pessoas))
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})

app.get('/listpessoas/:id', (req, res) => {

  knex('pessoas').select().where(req.params).then(pessoas => {
    res.send(JSON.stringify(pessoas))
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})

app.post('/addpessoa', (req, res) => {
  knex('pessoas').insert(req.query, 'id').then(id => {
    res.send(id)
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})

app.delete('/delpessoa/:id', (req, res) => {
  id = req.params.id
  console.log(id)
  knex('pessoas').del().where('id', id).then(() => {
    res.send('removido')
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})


knex.migrate.latest().then(() => {
  app.listen(3000, _ => {
    console.log('Server is running...')
  })
})