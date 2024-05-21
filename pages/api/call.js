export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received prank call request:', req.body);

    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'sk-fz74dpfy7lo8t37mjhf798k0h7xw41uetwj3qrm0ztdgxzi8cr1af217a9h57xee69',
      },
      body: JSON.stringify({
        phone_number: req.body.phoneNumber,
        task: `you are a prank call app. try to be funny and go along with the prank set up. your scenario is the following: ${req.body.task}`,
        first_sentence: req.body.firstSentence,
        wait_for_greeting: req.body.waitForGreeting,
        voice: req.body.voice,
        request_data: req.body.request_data,
      }),
    });

    const data = await response.json();
    console.log('Bland AI response:', data);

    if (response.ok) {
      res.status(200).json({ message: 'Prank call successfully queued', callId: data.call_id });
    } else {
      res.status(500).json({ error: 'Failed to initiate prank call', details: data });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}