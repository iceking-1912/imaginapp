import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {
    'name': {
        '$type': 'string'
    },
    'prompt': {
        '$type': 'string'
    },
    'photo': {
        '$type': 'string'
    }
};

const client = await MongoClient.connect(
    'mongodb://localhost:27017/imaginapp'
);
const coll = client.db('imaginapp').collection('posts');
const cursor = coll.find(filter);
const result = await cursor.toArray();
console.log(result);

await client.close();