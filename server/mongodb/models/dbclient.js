import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

dotenv.config()


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

const client = await MongoClient.connect(process.env.MONGO_URI);

export default client