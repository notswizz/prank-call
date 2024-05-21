// Assuming you're using Next.js API routes

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const response = await fetch('https://api.bland.ai/v1/calls', {
          method: 'GET',
          headers: {
            'Authorization': 'sk-fz74dpfy7lo8t37mjhf798k0h7xw41uetwj3qrm0ztdgxzi8cr1af217a9h57xee69', // Replace with your actual authorization token
          },
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
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  