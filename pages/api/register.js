import clientPromise from '../../utils/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('your_database_name');

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.collection('users').insertOne({
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      res.status(200).json({ email, userId: result.insertedId });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}