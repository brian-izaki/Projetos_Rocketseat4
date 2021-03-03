/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './mongoConnect';

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
      const listUsers = await collection.find({})
        .sort({ completedChallenges: -1, experience: -1 })
        .toArray();
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
