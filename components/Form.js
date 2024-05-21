import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set the app element for accessibility

export default function Form() {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [pranks, setPranks] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedPrank, setSelectedPrank] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchContacts(session.user.email);
      fetchPranks(session.user.email);
    }
  }, [session]);

  const fetchContacts = async (email) => {
    setIsLoading(true);
    const res = await fetch(`/api/contacts/user?username=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      setContacts(data.contacts);
    } else {
      alert('Failed to fetch contacts.');
    }
    setIsLoading(false);
  };

  const fetchPranks = async (email) => {
    setIsLoading(true);
    const res = await fetch(`/api/pranks/user?username=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      setPranks(data.pranks);
    } else {
      alert('Failed to fetch pranks.');
    }
    setIsLoading(false);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!selectedContact || !selectedPrank) {
      alert('Please select both a contact and a prank.');
      return;
    }
  
    const response = await fetch('/api/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: selectedContact.phone, // Adjusted to match the provided data structure
        task: selectedPrank.prankIdea, // Adjusted to match the provided data structure
        firstSentence: selectedPrank.notes, // Assuming 'notes' is the first sentence
        waitForGreeting: true, // Assuming this is a constant value
        request_data: selectedPrank.requestData, // Adjusted to match the provided data structure
      }),
    });
  
    if (response.ok) {
      alert('Call successfully queued!');
    } else {
      const data = await response.json();
      alert(`Failed to initiate call: ${data.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
       <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 mb-2 border-4 border-white p-4 rounded-lg shadow-2xl">
  PR<span className="text-yellow-400">AI</span>NK
</h1>
          <img src="/prank.png" alt="Prank" className="w-30 h-30 mx-auto mb-4" />
   
          <button onClick={nextStep} className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md border-2 border-blue-500 hover:border-purple-600 transition duration-300 transform hover:scale-105">
    Start Call
  </button>
        </div>
      )}
  
      {step === 2 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Select Contact</h2>
          <ul className="space-y-4 h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner">
            {contacts.map((contact) => (
              <li
                key={contact._id}
                className={`p-4 border border-gray-200 rounded-lg shadow-sm cursor-pointer transition duration-300 ${selectedContact === contact ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedContact(contact)}
              >
                <p className="text-lg font-semibold text-gray-700">{contact.name}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-6">
            <button onClick={prevStep} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
              Previous
            </button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300" disabled={!selectedContact}>
              Next
            </button>
          </div>
        </div>
      )}
  
      {step === 3 && (
         <div className="bg-white p-6 rounded-lg shadow-lg">
         <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Prank</h2>
         <ul className="space-y-4 h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner">
           {pranks.map((prank) => (
             <li
               key={prank._id}
               className={`p-4 border border-gray-200 rounded-lg shadow-sm cursor-pointer transition duration-300 ${selectedPrank === prank ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
               onClick={() => setSelectedPrank(prank)}
             >
               <p className="text-lg font-semibold text-gray-700">{prank.prankTitle}</p>
             </li>
           ))}
         </ul>
         <div className="flex justify-between mt-6">
           <button onClick={prevStep} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
             Previous
           </button>
           <button onClick={nextStep} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300" disabled={!selectedPrank}>
             Next
           </button>
         </div>
       </div>
     )}
 
     {step === 4 && (
       <div className="bg-white p-6 rounded-lg shadow-lg">
         <h2 className="text-3xl font-bold text-gray-800 mb-4">Confirmation</h2>

         <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6">
           <p className="text-lg font-semibold text-gray-700"><strong>Contact:</strong> {selectedContact?.name}</p>
           <p className="text-lg font-semibold text-gray-700"><strong>Prank:</strong> {selectedPrank?.prankTitle}</p>
                  
         </div>
         <img src="/prank.png" alt="Prank" className="w-30 h-30 mx-auto mb-4" />
         <div className="flex justify-between">
           <button onClick={prevStep} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
             Previous
           </button>
           <button onClick={handleSubmit} className="w-full px-6 py-4 ml-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold rounded-lg shadow-md border-4 border-green-500 hover:border-teal-600 transition duration-300 transform hover:scale-105">
    Prank Call
 </button>
         </div>
       </div>
     )}
   </div>
 );
  
}