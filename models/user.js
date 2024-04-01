const getDb = require('../util/database').getDb
const bcrypt = require('bcryptjs')

class User {
    constructor (name, email, password) {
        this.name = name
        this.email = email
        this.password = password
    }

    async save(){
        const db = getDb()
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        return db.collection('users').insertOne(this);
    }

    static async findUserBy(email, password) {
        const db = getDb();

        const user = await db.collection('users').findOne({ email: email});
        
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