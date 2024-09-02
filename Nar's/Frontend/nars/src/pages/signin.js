import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const CustomAlert = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4"
  >
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
      <p className="text-center text-gray-800 mb-4">{message}</p>
      <button
        onClick={onClose}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
      >
        Close
      </button>
    </div>
  </motion.div>
);

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post('http://localhost:8000/signin', 
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setAlertMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.error || 'An error occurred during signin');
    } finally {
      setIsLoading(false);
    }
  };

  const closeAlert = () => {
    setAlertMessage("");
    router.push('/home');
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AnimatePresence>
        {alertMessage && <CustomAlert message={alertMessage} onClose={closeAlert} />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <Image src="/Logo/narslogo.png" alt="Nar's Logo" width={100} height={100} />
          <h2 className="mt-4 text-2xl font-bold text-neutral-800">Sign In to Your Account</h2>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-600">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-neutral-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-600">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-neutral-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-orange-500 hover:text-orange-600">Forgot your password?</a>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </form>
        <p className="mt-6 text-center text-neutral-600">
          Don't have an account?{" "}
          <button
            onClick={() => router.push('/signup')}
            className="font-medium text-orange-500 hover:text-orange-600"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  );
}