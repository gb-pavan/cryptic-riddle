// lib/encrypt.ts

export async function encryptMessage(message: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // Generate a random 256-bit key
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  // Export the key for sharing
  const exportedKey = await crypto.subtle.exportKey('jwk', key);

  // Create a random IV (initialization vector)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  return {
    key: exportedKey, // JWK (JSON Web Key) — can be safely stored
    iv: Array.from(iv), // Need this for decryption
    encryptedText: Buffer.from(encrypted).toString('base64'),
  };
}

export async function decryptMessage({
  encryptedText,
  key,
  iv,
}: {
  encryptedText: string;
  key: JsonWebKey;
  iv: number[];
}) {
  const importedKey = await crypto.subtle.importKey(
    'jwk',
    key,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(iv),
    },
    importedKey,
    Buffer.from(encryptedText, 'base64')
  );

  return new TextDecoder().decode(decrypted);
}
