/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './mongoConnect';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { login } = req.query;

  const db = await connectToDatabase(process.env.MONGO_URI);
  const collection = db.collection('users');

  const {
    level,
    experience,
    completedChallenges,
  } = await collection.findOne({ login })
    .catch((err) => console.log(err));

  return res.status(200).json({ level, experience, completedChallenges });
};
