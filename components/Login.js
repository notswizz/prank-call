import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
    onClick={() => signOut({ callbackUrl: '/' })}
    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-full shadow-lg border-2 border-red-500 hover:border-pink-600 transition duration-300 transform hover:scale-105"
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