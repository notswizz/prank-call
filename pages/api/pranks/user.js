import clientPromise from '../../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('your_database_name');
      const collection = db.collection('pranks');

      const pranks = await collection.find({ username }).toArray();

      return res.status(200).json({ pranks });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}