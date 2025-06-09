'use server';

import { decryptMessage } from '@/lib/encrypt';

export async function generateDecryptedMessage(
  encryptedText: string,
  key: JsonWebKey,
  iv: number[]
) {
  const decrypted = await decryptMessage({ encryptedText, key, iv });
  return { decryptedMessage: decrypted };
}
