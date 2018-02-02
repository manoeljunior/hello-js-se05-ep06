const pessoas = [
  {
    nome: 'Sofia',
    telefone: '32232323'
  },
  {
    nome: 'Ada',
    telefone: '32231111'
  },
  {
    nome: 'Aparecida',
    telefone: '99898989'
  },
  {
    nome: 'Manoel',
    telefone: '98899889'
  },
  {
    nome: 'Ferreira',
    telefone: '32212121'
  }
]
exports.up = knex => knex('pessoas').insert(pessoas)

exports.down = knex => knex('pessoas').del()
  .whereIn('telefone', pessoas.map(item => item.telefone))
