import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function PrankForm() {
  const { data: session } = useSession();
  const [prankTitle, setPrankTitle] = useState('');
  const [prankIdea, setPrankIdea] = useState('');
  const [tone, setTone] = useState('');
  const [username, setUsername] = useState('');
  const [requestData, setRequestData] = useState([{ label: '', data: '' }]);

  useEffect(() => {
    if (session) {
      setUsername(session.user.email);
    }
  }, [session]);

  const handleRequestDataChange = (index, field, value) => {
    const newRequestData = [...requestData];
    newRequestData[index][field] = value;
    setRequestData(newRequestData);
  };

  const addRequestDataEntry = () => {
    setRequestData([...requestData, { label: '', data: '' }]);
  };

  const removeRequestDataEntry = (index) => {
    const newRequestData = requestData.filter((_, i) => i !== index);
    setRequestData(newRequestData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/pranks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prankTitle, prankIdea, tone, username, requestData }),
    });

    if (res.ok) {
      setPrankTitle('');
      setPrankIdea('');
      setTone('');
      setRequestData([{ label: '', data: '' }]);
      alert('Prank saved!');
      window.location.reload(); // Refresh the page
    } else {
      alert('Failed to save prank.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <br></br>
      <input
        type="text"
        placeholder="Prank Title"
        value={prankTitle}
        onChange={(e) => setPrankTitle(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <textarea
        placeholder="Prank Idea"
        value={prankIdea}
        onChange={(e) => setPrankIdea(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        placeholder="Tone"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <div>
        <h2 className="text-lg font-semibold mb-4">Important Info</h2>
        {requestData.map((item, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Label"
              value={item.label}
              onChange={(e) => handleRequestDataChange(index, 'label', e.target.value)}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Data"
              value={item.data}
              onChange={(e) => handleRequestDataChange(index, 'data', e.target.value)}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button type="button" onClick={() => removeRequestDataEntry(index)} className="px-4 py-2 bg-red-500 text-white rounded-md">
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addRequestDataEntry} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
          Add Entry
        </button>
      </div>
      <input
        type="hidden"
        value={username}
        readOnly
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Save Prank
      </button>
    </form>
  );
}