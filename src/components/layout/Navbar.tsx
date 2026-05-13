import React from 'react';

import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import {
  Leaf,
  Sparkles,
  Bot,
} from 'lucide-react';

import { useAuthStore } from '../../lib/store';

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const {
    user,
    logout,
  } = useAuthStore();

  const navLink =
    'text-[15px] font-medium text-slate-600 hover:text-green-600 transition-all duration-200';

  const active =
    'text-green-600 font-semibold';

  return (

    <header className="fixed top-0 left-0 w-full z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 h-[78px] flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">

            <Leaf className="h-6 w-6 text-white" />

          </div>

          <div>

            <h1 className="text-2xl font-black text-slate-900">
              EcoLearn
            </h1>

            <p className="text-xs text-slate-500">
              AI Sustainability Platform
            </p>

          </div>

        </Link>

        {/* NAV */}

        <nav className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className={`${navLink} ${location.pathname === '/' ? active : ''}`}
          >
            Home
          </Link>

          <Link
            to="/lessons"
            className={`${navLink} ${location.pathname === '/lessons' ? active : ''}`}
          >
            Lessons
          </Link>

          <Link
            to="/quizzes"
            className={`${navLink} ${location.pathname === '/quizzes' ? active : ''}`}
          >
            Quizzes
          </Link>

          <Link
            to="/leaderboard"
            className={`${navLink} ${location.pathname === '/leaderboard' ? active : ''}`}
          >
            Leaderboard
          </Link>

          <Link
            to="/profile"
            className={`${navLink} ${location.pathname === '/profile' ? active : ''}`}
          >
            Profile
          </Link>

        </nav>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          {/* AI BUTTON */}

          <Link
            to="/ai-assistant"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all duration-300 text-white px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg"
          >

            <Bot className="h-4 w-4" />

            AI Assistant

          </Link>

          {user ? (

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="bg-slate-900 hover:bg-black text-white px-5 py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              Logout
            </button>

          ) : (

            <Link
              to="/login"
              className="border border-slate-300 hover:border-green-500 hover:text-green-600 text-slate-700 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2"
            >

              <Sparkles className="h-4 w-4" />

              Login

            </Link>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;