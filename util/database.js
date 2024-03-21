const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = callback => {
  MongoClient.connect('mongodb://localhost:27017/')
  .then(client => {
    console.log('Conexão realizada com sucesso!');
    _db = client.db()
    callback(client)
  })
  .catch(err => {
    throw err;
  })
}

const getDb = () => {
  if(_db) {
    return _db
  }
  throw 'Nenhum banco foi encontrado!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb