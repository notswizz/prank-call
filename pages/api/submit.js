// pages/api/submit.js
import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received form submission:', req.body);

    try {
      const client = await clientPromise;
      const db = client.db('your_database_name');

      const submission = await db.collection('submissions').insertOne({
        phoneNumber: req.body.phoneNumber,
        task: req.body.task,
        callId: req.body.callId,
        submittedAt: new Date(),
      });

      console.log('Inserted submission with ID:', submission.insertedId);
      res.status(200).json({ message: `Submission received with ID: ${submission.insertedId}` });
    } catch (error) {
      console.error('Error connecting to database:', error);
      res.status(500).json({ error: 'Error connecting to database' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
