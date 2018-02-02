
exports.up = knex => knex.schema.createTable('pessoas', tb => {
  tb.increments('id')
  tb.string('nome', 50)
  tb.string('telefone', 11)
  tb.dateTime('datanascimento').defaultTo(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('pessoas')
