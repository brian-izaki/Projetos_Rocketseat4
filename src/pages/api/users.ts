/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';

// variaveis criadas fora da funçãp default a lambda rexonhece que quer
// compartilhar com outras funcionalidades serverless (essas são conhecidas como hotstart)

// com o cachedDb ele mantem um estado entre as execuções,
// evitando assim conexões em excesso.
let cachedDB: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDB) {
    return cachedDB;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('moveit');

  cachedDB = db;

  return db;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    login,
    avatarUrl,
    name,
    level,
    completedChallenges,
    experience,
  } = req.body;
  const { method } = req;

  const db = await connectToDatabase(process.env.MONGO_URI);
  const collection = db.collection('users');

  const existedUser = await collection.findOne({ login });

  switch (method) {
    case 'POST': {
      if (!existedUser) {
        await collection.insertOne({
          login,
          name,
          avatarUrl,
          level: 1,
          completedChallenges: 0,
          experience: 0,
          registeredAt: new Date(),
        });
      }
      return res.status(201).json({ status: 'ok' });
      break;
    }
    case 'GET': {
      const listUsers = await collection.find({}).toArray();
      return res.status(200).json({ users: listUsers });
      break;
    }
    case 'PUT': {
      await collection.updateOne({ login }, {
        $set: {
          level,
          completedChallenges,
          experience,
        },
      });
      return res.status(200).json({ put: 'alterado' });
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};
