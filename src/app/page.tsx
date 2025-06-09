'use client';

import { useState } from 'react';
import { generateEncryptedMessage } from '@/actions/encrypt';
import { generateDecryptedMessage } from '@/actions/decrypt';

export default function EncryptPage() {
  const [result, setResult] = useState<any>(null);
  const [decrypted, setDecrypted] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingEncrypt, setLoadingEncrypt] = useState(false);
  const [loadingDecrypt, setLoadingDecrypt] = useState(false);

  const handleEncrypt = async () => {
    setLoadingEncrypt(true);
    const res = await generateEncryptedMessage();
    setResult(res);
    setDecrypted(null);
    setLoadingEncrypt(false);
  };

  const handleDecrypt = async () => {
    if (!result) return;
    setLoadingDecrypt(true);
    const { encryptedText, key, iv } = result;
    const res = await generateDecryptedMessage(encryptedText, key, iv);
    setDecrypted(res.decryptedMessage);
    setShowModal(true);
    setLoadingDecrypt(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={handleEncrypt}
        disabled={loadingEncrypt}
        className={`${
          loadingEncrypt ? 'opacity-50 cursor-not-allowed' : ''
        } bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700`}
      >
        {loadingEncrypt ? 'Encrypting...' : 'Encrypt Message'}
      </button>

      {loadingEncrypt && (
        <div className="mt-4 space-y-2 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded space-y-2">
          <p><strong>Encrypted Text:</strong> {result.encryptedText}</p>
          <p><strong>Key:</strong> {JSON.stringify(result.key)}</p>
          <p><strong>IV:</strong> {result.iv.join(', ')}</p>

          <button
            onClick={handleDecrypt}
            disabled={loadingDecrypt}
            className={`${
              loadingDecrypt ? 'opacity-50 cursor-not-allowed' : ''
            } mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700`}
          >
            {loadingDecrypt ? 'Decrypting...' : 'Decrypt Message'}
          </button>
        </div>
      )}

      {loadingDecrypt && (
        <div className="mt-4 space-y-2 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      )}


      {showModal && decrypted && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 text-center rounded shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-bold mb-2">🔓 Decrypted Message</h2>
      <p className="mb-2">{decrypted}</p>
      <p><strong>Name:</strong> John Doe</p>
      <p><strong>Email:</strong> john@example.com</p>
      <p><strong>Phone:</strong> +91-9876543210</p>
      <p><strong>Code:</strong> XYZ123</p>
      <button
        onClick={() => setShowModal(false)}
        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}



