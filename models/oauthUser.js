const getDb = require('../util/database').getDb;

class OAuthUser {
    constructor(id, username) { 
        this.id = id
        this.username = username
    }

    async findOrCreate(profile){
        const db = getDb()
        const user = await db.collection('oauthUsers').findOne({ id: profile.id});
        if (user) {
            return user
        } else {
            const newUser = new OAuthUser({id:profile.id, username: profile.username})
            return db.collection('oauthUsers').insertOne(newUser);
        }
    }
}

module.exports = OAuthUser;