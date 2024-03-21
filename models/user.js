const getDb = require('./util/database').getDb
const mongodb = require('mongodb')

class User {
    constructor (email, password) {
        this.email = email
        this.password = password
    }

    save(){
        const db = getDb()
        return db.collection('users').insertOne(this)
    }

    static findById(userId) {
        const db = getDb();
        const objectId = mongodb.ObjectId.createFromTime(parseInt(userId.substring(0, 8), 16));
        return db.collection('users').findOne({_id: objectId})
    }
}