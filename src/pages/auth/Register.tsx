import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuthStore } from '../../lib/store';
import { auth } from '../../lib/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    if (!username || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);

      const response = await auth.register(
        username,
        email,
        password
      );

      console.log('REGISTER RESPONSE:', response);

      const { token, user } = response;

      setAuth(token, user);

      navigate('/');
    } catch (err: any) {
      console.error('REGISTER ERROR:', err);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        {/* HEADER */}

        <div className="flex items-center justify-center mb-8">
          <UserPlus className="h-8 w-8 text-green-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* USERNAME */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full
                px-4
                py-3
                border
                border-gray-300
                rounded-xl
                text-gray-900
                bg-white
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                px-4
                py-3
                border
                border-gray-300
                rounded-xl
                text-gray-900
                bg-white
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
          </div>

          {/* PASSWORD */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                px-4
                py-3
                border
                border-gray-300
                rounded-xl
                text-gray-900
                bg-white
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-xl
              bg-green-600
              hover:bg-green-700
              text-white
              font-semibold
              transition
              disabled:opacity-50
            "
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* LOGIN LINK */}

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;