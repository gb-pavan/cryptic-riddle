// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

// const handleEncrypt = async () => {
//   const res = await fetch('/api/encrypt', {
//     headers: {
//       'x-api-key': 'supersecureapikey123',
//     },
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     alert(error.error);
//     return;
//   }

//   const json = await res.json();
//   setData(json);
// };


// export default function HomePage() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4">
//       <h1 className="text-4xl font-bold mb-4">🎉 Tailwind is working!</h1>
//       <p className="text-lg">This is a styled component using Tailwind CSS.</p>
//       <button className="mt-6 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
//         Test Button
//       </button>
//     </main>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { generateEncryptedMessage } from '../actions/encrypt';

// export default function HomePage() {
//   const [data, setData] = useState<{ key: string; encryptedMessage: string } | null>(null);

//   const handleEncrypt = async () => {
//     const res = await generateEncryptedMessage();
//     setData(res);
//   };

//   return (
//     <main className="p-8">
//       <h1 className="text-2xl font-bold mb-4">🔐 Encrypt Message</h1>
//       <button
//         onClick={handleEncrypt}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Encrypt
//       </button>

//       {data && (
//         <div className="mt-6">
//           <p><strong>Key:</strong> {data.key}</p>
//           <p><strong>Encrypted Message:</strong> {data.encryptedMessage}</p>
//         </div>
//       )}
//     </main>
//   );
// }

'use client';

import { generateEncryptedMessage } from '@/actions/encrypt';
import { useState } from 'react';

export default function EncryptPage() {
  const [result, setResult] = useState<any>(null);

  const handleClick = async () => {
    const res = await generateEncryptedMessage();
    setResult(res);
  };

  return (
    <div className="p-6">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Encrypt Message
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><strong>Encrypted Text:</strong> {result.encryptedText}</p>
          <p><strong>Key:</strong> {JSON.stringify(result.key)}</p>
          <p><strong>IV:</strong> {result.iv.join(', ')}</p>
        </div>
      )}
    </div>
  );
}



