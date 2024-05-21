import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Set the app element for accessibility

export default function PrankDetailsModal({ isOpen, onRequestClose, prank }) {
  if (!prank) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Prank Details"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="relative p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-full"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{prank.prankTitle}</h2>
        <p className="text-lg mb-2">{prank.prankIdea}</p>
        <p className="text-lg mb-2"><strong>Tone:</strong> {prank.tone}</p>
        <div>
      
          <ul className="list-disc list-inside">
            {prank.requestData.map((item, index) => (
              <li key={index}>
                <strong>{item.label}:</strong> {item.data}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}