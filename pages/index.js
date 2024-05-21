import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoginButton from '../components/Login';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/prank');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white relative bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
      <button
        onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/prank` })}
        className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 absolute top-4 right-4"
      >
        <Image src="/google.png" alt="Google Logo" width={24} height={24} className="mr-3" />
        Login with Google
      </button>
      <main className="flex flex-col items-center">
        <LoginButton />
      </main>
      <footer className="mt-8 text-center">
        <p className="text-sm">long live prank calls</p>
      </footer>
    </div>
  );
}