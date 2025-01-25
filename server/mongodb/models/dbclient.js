import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'

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