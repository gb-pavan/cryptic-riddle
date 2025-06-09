// import { NextResponse } from 'next/server';
// import crypto from 'crypto';

// export async function GET() {
//   // Generate a random key
//   const key = crypto.randomBytes(32);
//   const iv = crypto.randomBytes(16);

//   const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
//   const textToEncrypt = 'Hello, world!';
//   let encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');
//   encrypted += cipher.final('hex');

//   const output = {
//     key: key.toString('hex'),
//     iv: iv.toString('hex'),
//     encrypted_text: encrypted,
//   };

//   return NextResponse.json(output);
// }

// import { NextResponse } from 'next/server';

// export async function GET() {
//   const key = crypto.randomUUID(); // 🔐 Simulated key generation
//   const encryptedMessage = Buffer.from('Hello Secure World!').toString('base64');

//   return NextResponse.json({
//     key,
//     encryptedMessage,
//   });
// }
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.ENCRYPT_API_KEY!;

export async function GET(req: NextRequest) {
  const authKey = req.headers.get('x-api-key');

  // ✅ Step 1: Check for valid API key
  if (authKey !== API_KEY) {
    console.warn('[SECURITY WARNING] Unauthorized access attempt to /api/encrypt', {
      ip: req.headers.get('x-forwarded-for') || 'unknown',
      time: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // ✅ Step 2: Simulate encryption logic
  const key = crypto.randomUUID();
  const encryptedMessage = Buffer.from('Hello Secure World!').toString('base64');

  console.log('[INFO] Successful encryption request', {
    ip: req.headers.get('x-forwarded-for') || 'unknown',
    time: new Date().toISOString(),
  });

  return NextResponse.json({
    key,
    encryptedMessage,
  });
}


