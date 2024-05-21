import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Modal from 'react-modal';
import PrankForm from './PrankForm';
import PrankDetailsModal from './PrankDetailsModal';

Modal.setAppElement('#__next'); // Set the app element for accessibility

export default function UserPranks() {
  const { data: session } = useSession();
  const [pranks, setPranks] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedPrank, setSelectedPrank] = useState(null);
  const [showPranks, setShowPranks] = useState(false);

  useEffect(() => {
    if (session) {
      setUserEmail(session.user.email);
      fetchPranks(session.user.email);
    }
  }, [session]);

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

  const openDetailsModal = (prank) => {
    setSelectedPrank(prank);
    setDetailsModalIsOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-2xl font-bold text-gray-800 cursor-pointer"
          onClick={() => setShowPranks(!showPranks)}
        >
          Pranks
        </h2>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-gradient-to-r from-green-400 via-pink-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300 border border-gray-300"
          >
            AI Prank
          </button>
          <button
            onClick={() => setModalIsOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Add Prank
          </button>
        </div>
      </div>

      {showPranks && (
        <ul className="space-y-4 h-64 overflow-y-auto bg-white p-4 rounded-lg shadow-lg">
          {pranks.map((prank) => (
            <li
              key={prank._id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
              onClick={() => openDetailsModal(prank)}
            >
              <p className="text-lg font-semibold text-gray-700">{prank.prankTitle}</p>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Prank"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="relative p-6 bg-white rounded-lg shadow-lg">
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-full"
          >
            &times;
          </button>
          <PrankForm />
        </div>
      </Modal>

      <PrankDetailsModal
        isOpen={detailsModalIsOpen}
        onRequestClose={() => setDetailsModalIsOpen(false)}
        prank={selectedPrank}
      />
    </div>
  );
}