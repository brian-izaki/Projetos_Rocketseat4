import { MongoClient, Db } from 'mongodb';

// variaveis criadas fora da funçãp default a lambda rexonhece que quer
// compartilhar com outras funcionalidades serverless (essas são conhecidas como hotstart)

// com o cachedDb ele mantem um estado entre as execuções,
// evitando assim conexões em excesso.
let cachedDB: Db = null;

export async function connectToDatabase(uri: string): Promise<Db> {
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
