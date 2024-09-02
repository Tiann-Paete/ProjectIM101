import React, { useState, useEffect } from 'react';

const GCashModal = ({ isOpen, onClose, onConfirm, amount }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [gcashNumber, setGcashNumber] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white p-8 rounded-lg max-w-md w-full transform transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">GCash Payment Confirmation</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="GCash Number"
          value={gcashNumber}
          onChange={(e) => setGcashNumber(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <p className="mb-4">Amount to Pay: ₱{amount.toFixed(2)}</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(fullName, gcashNumber)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Proceed Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default GCashModal;