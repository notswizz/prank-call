import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, phone, username } = req.body;

    if (!name || !phone || !username) {
      return res.status(400).json({ message: 'Name, phone, and username are required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('your_database_name');
      const collection = db.collection('contacts');

      await collection.insertOne({ name, phone, username });

      return res.status(201).json({ message: 'Contact saved' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}