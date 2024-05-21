import { useState, useEffect } from 'react';
import Details from './Details';

const List = () => {
  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCallId, setSelectedCallId] = useState(null);

  useEffect(() => {
    const fetchCalls = async () => {
      setIsLoading(true);
      const response = await fetch('/api/getCalls');
      const data = await response.json();
      setCalls(data.calls);
      setIsLoading(false);
    };

    fetchCalls();
  }, []);
  

  const handleCallClick = (callId) => {
    setSelectedCallId(callId);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedCallId(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Call List</h1>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Call ID</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-center">Call Length (min)</th>
              <th className="py-3 px-6 text-center">To</th>
              <th className="py-3 px-6 text-center">From</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Answered By</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {calls.map((call) => (
           <tr
           className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
           key={call.call_id}
           onClick={() => handleCallClick(call.call_id)} // Bind the click event here
         >
                <td className="py-3 px-6 text-left whitespace-nowrap">{call.call_id}</td>
                <td className="py-3 px-6 text-left">{new Date(call.created_at).toLocaleString()}</td>
                <td className="py-3 px-6 text-center">{call.call_length.toFixed(2)}</td>
                <td className="py-3 px-6 text-center">{call.to}</td>
                <td className="py-3 px-6 text-center">{call.from}</td>
                <td className="py-3 px-6 text-center">{call.completed ? 'Completed' : 'Incomplete'}</td>
                <td className="py-3 px-6 text-center">{call.answered_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCallId && <Details callId={selectedCallId} onClose={handleCloseModal} />}
    </div>
  );
};

export default List;
