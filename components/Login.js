import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded shadow-md transition duration-300"
    >
      Logout
    </button>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 mb-2 border-4 border-white p-4 rounded-lg shadow-2xl">
  PR<span className="text-yellow-400">AI</span>NK
</h1>
      <h2 className="text-2xl font-semibold text-gray-300 mb-6">AI Prank Call app</h2>
      <div className="relative w-64 h-64 mb-10 mx-auto transform transition duration-500 hover:scale-110 hover:border-yellow-400">
  <Image
    src="/prank.png"
    alt="Logo"
    layout="fill"
    className="rounded-full border-4 border-yellow-400 shadow-2xl transition duration-500 hover:border-yellow-500"
  />
</div>
    </div>
  );
}