// Next.js API route for analyzing a call

export default async function handler(req, res) {
    const { callId } = req.query;
    if (req.method === 'POST' && callId) {
      try {
        const response = await fetch(`https://api.bland.ai/v1/calls/${callId}/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'sk-fz74dpfy7lo8t37mjhf798k0h7xw41uetwj3qrm0ztdgxzi8cr1af217a9h57xee69', // Replace with your actual authorization token
          },
          body: JSON.stringify(req.body),
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      res.status(400).json({ message: 'Bad Request' });
    }
  }
  