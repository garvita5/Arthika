import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthForm = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let userCredential;
      if (mode === 'login') {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      localStorage.setItem('arthikaUser', JSON.stringify(userCredential.user));
      onAuthSuccess(userCredential.user);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please log in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Please sign up.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <div className="flex justify-center mb-6">
        {/* <button
          className="px-4 py-2 rounded-lg border bg-blue-100 text-blue-700 cursor-default"
          disabled
        >
          Email
        </button> */}
      </div>
      <form onSubmit={handleEmailAuth}>
        <input
          type="email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <div className="text-center mt-4">
        {mode === 'login' ? (
          <span>Don't have an account?{' '}
            <button className="text-blue-600 hover:underline" onClick={() => setMode('signup')}>Sign Up</button>
          </span>
        ) : (
          <span>Already have an account?{' '}
            <button className="text-blue-600 hover:underline" onClick={() => setMode('login')}>Login</button>
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthForm; 