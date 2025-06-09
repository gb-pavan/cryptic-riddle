// 'use server';

// export async function generateEncryptedMessage() {
//   const key = crypto.randomUUID();
//   const encryptedMessage = Buffer.from('Hello Secure World!').toString('base64');

//   return {
//     key,
//     encryptedMessage,
//   };
// }

// 'use server';

// import { headers } from 'next/headers';
// import { rateLimiter } from '../lib/rateLimiter';

// export async function generateEncryptedMessage() {
//   const headerList = await headers();
//   const ip = headerList.get('x-forwarded-for') ?? 'anonymous';

//   const { success } = await rateLimiter.limit(ip);
//   if (!success) {
//     throw new Error('Too many requests, slow down.');
//   }

//   const key = crypto.randomUUID();
//   const encryptedMessage = Buffer.from('Hello Secure World!').toString('base64');

//   return {
//     key,
//     encryptedMessage,
//   };
// }

// 'use server';

// import { headers } from 'next/headers';
// import { rateLimiter } from '../lib/rateLimiter';
// import { encryptMessage } from '../lib/encrypt';

// export async function generateEncryptedMessage() {
//   const headerList = await headers();
//   const ip = headerList.get('x-forwarded-for') ?? 'anonymous';

//   const { success } = await rateLimiter.limit(ip);
//   if (!success) {
//     throw new Error('Too many requests, slow down.');
//   }

//   const { key, iv, encryptedText } = await encryptMessage('Hello Secure World!');

//   return {
//     key,
//     iv,
//     encryptedText,
//   };
// }

'use server';

import { encryptMessage } from '@/lib/encrypt';
import { headers } from 'next/headers';
import { rateLimiter } from '@/lib/rateLimiter';

export async function generateEncryptedMessage() {
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for') ?? 'anonymous';

  const { success } = await rateLimiter.limit(ip);
  if (!success) {
    throw new Error('Too many requests, slow down.');
  }

  const { key, iv, encryptedText } = await encryptMessage('Hello Secure World!');

  return {
    key,
    iv,
    encryptedText,
  };
}



