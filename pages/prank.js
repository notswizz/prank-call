import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoginButton from '../components/Login';
import ContactForm from '../components/ContactForm';
import UserContacts from '../components/UserContacts';
import PrankForm from '../components/PrankForm';
import UserPranks from '../components/UserPranks';
import Form from '../components/Form';

export default function Prank() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

 

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4 items-center">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-md w-full mt-4 mb-4">
          <div className="flex items-center space-x-4">
            <img src="/prank.png" alt="Prank" className="w-8 h-8 rounded-full border-2 border-gray-300" />
            <p className="text-gray-700 font-semibold">{session.user.email}</p>
          </div>
          <LoginButton />
        </div>
        
        <div className="flex flex-col space-y-4 w-full">
          <div className="overflow-y-auto bg-white shadow-lg rounded-lg p-4">
            <Form />
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full mt-8">
          <div className="overflow-y-auto bg-white shadow-lg rounded-lg p-4">
            <UserPranks />
            <br></br>
            <UserContacts />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}