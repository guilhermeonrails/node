const getDb = require('../util/database').getDb
const mongodb = require('mongodb')

class User {
    constructor (name, email, password) {
        this.name = name
        this.email = email
        this.password = password
    }

    save(){
        const db = getDb()
        return db.collection('users').insertOne(this);
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({ email: email, password: password });
    }
}

module.exports = User