import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import logo from '../assets/arthika-logo.png';

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
    <div className="min-h-screen flex items-center justify-center gradient-bg py-12 px-4">
      <div className="card w-full max-w-md mx-auto animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-2">
            <img src={logo} alt="Arthika Logo" className="w-16 h-16 object-contain" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight" style={{letterSpacing: '-0.5px'}}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </h2>
        </div>
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 mb-2 text-center font-medium animate-bounce-in">{error}</div>}
          <button
            type="submit"
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center mt-4">
          {mode === 'login' ? (
            <span>Don't have an account?{' '}
              <button className="text-cyan-600 hover:underline font-semibold" onClick={() => setMode('signup')}>Sign Up</button>
            </span>
          ) : (
            <span>Already have an account?{' '}
              <button className="text-cyan-600 hover:underline font-semibold" onClick={() => setMode('login')}>Login</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm; 