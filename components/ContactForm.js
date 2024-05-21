import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ContactForm() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (session) {
      setUsername(session.user.email);
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, username }),
    });

    if (res.ok) {
      setName('');
      setPhone('');
      alert('Contact saved!');
      window.location.reload(); // Refresh the page
    } else {
      alert('Failed to save contact.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
             <br></br>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="hidden"
        value={username}
        readOnly
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Save Contact
      </button>
    </form>
  );
}