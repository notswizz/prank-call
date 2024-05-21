import clientPromise from '../../utils/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('your_database_name');

      const user = await db.collection('users').findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({ email, userId: user._id });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Error logging in user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}