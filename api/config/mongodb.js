const { MongoClient } = require('mongodb');
const { mongo } = require('./vars');

let cachedDb = null;

const connectToDB = async () => {
    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(mongo.uri);
    const db = await client.db('fangstocks');
    cachedDb = db;
    return db;
}

module.exports = connectToDB;
