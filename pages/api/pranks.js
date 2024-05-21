import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prankTitle, prankIdea, tone, username, requestData } = req.body;

   

    try {
      const client = await clientPromise;
      const db = client.db('your_database_name');
      const collection = db.collection('pranks');

      await collection.insertOne({ prankTitle, prankIdea, tone, username, requestData });

      return res.status(201).json({ message: 'Prank saved successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}