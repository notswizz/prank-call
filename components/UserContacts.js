import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Modal from 'react-modal';
import ContactForm from './ContactForm';


Modal.setAppElement('#__next'); // Set the app element for accessibility

export default function UserContacts() {
  const { data: session } = useSession();
  const [contacts, setContacts] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    if (session) {
      setUserEmail(session.user.email);
      fetchContacts(session.user.email);
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

  

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
      <h2
      className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition duration-300"
      onClick={() => setShowContacts(!showContacts)}
    >
      Contacts
    </h2>
        <button
          onClick={() => setModalIsOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Add Contact
        </button>
      </div>

      {showContacts && (
        <ul className="space-y-4 h-64 overflow-y-auto bg-white p-4 rounded-lg shadow-lg">
          {contacts.map((contact) => (
            <li
              key={contact._id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
              onClick={() => openDetailsModal(contact)}
            >
              <p className="text-lg font-semibold text-gray-700">{contact.name}</p>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Contact"
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
          <ContactForm />
        </div>
      </Modal>

    
    </div>
  );
}