const getDb = require('../util/database').getDb
const bcrypt = require('bcryptjs')

class User {
    constructor (username, email, password) {
        this.username = username
        this.email = email
        this.password = password
    }

    async save(){
        const db = getDb()
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        return db.collection('users').insertOne(this);
    }

    static async findOne(username, password) {
        const db = getDb();

        const user = await db.collection('users').findOne({ username: username});
        if (!user) {
            return null; 
        }

        const passwordMatch = await bcrypt.compare(password, user.password); 
        if (passwordMatch) {
            return user;
        } else {
            return null;
        }
    }
}

module.exports = User