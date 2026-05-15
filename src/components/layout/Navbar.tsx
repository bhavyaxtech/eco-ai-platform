import React, { useState } from 'react';

import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import {
  Leaf,
  Sparkles,
  Bot,
  Trophy,
  BookOpen,
  User,
  Menu,
  X,
  LayoutDashboard,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useAuthStore } from '../../lib/store';

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const {
    user,
    logout,
  } = useAuthStore();

  const links = [
    {
      name: 'Home',
      path: '/',
      icon: Leaf,
    },

    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },

    {
      name: 'Lessons',
      path: '/lessons',
      icon: BookOpen,
    },

    {
      name: 'Quizzes',
      path: '/quizzes',
      icon: Sparkles,
    },

    {
      name: 'Leaderboard',
      path: '/leaderboard',
      icon: Trophy,
    },

    {
      name: 'Profile',
      path: '/profile',
      icon: User,
    },
  ];

  return (

    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#071018]/90 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 h-[74px] flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <motion.div
            whileHover={{ rotate: 8 }}
            className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg"
          >

            <Leaf className="h-5 w-5 text-white" />

          </motion.div>

          <div>

            <h1 className="text-xl font-bold text-white tracking-tight">

              EcoLearn AI

            </h1>

            <p className="text-[11px] text-emerald-300">

              Sustainability Platform

            </p>

          </div>

        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden lg:flex items-center gap-2">

          {links.map((item, index) => {

            const Icon = item.icon;

            return (

              <Link
                key={index}
                to={item.path}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300

                ${
                  location.pathname === item.path
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }
                `}
              >

                <Icon className="h-4 w-4" />

                {item.name}

              </Link>
            );
          })}

        </nav>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-3">

          {/* AI BUTTON */}

          <Link
            to="/ai-assistant"
            className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-all text-white px-5 py-2.5 rounded-xl font-medium shadow-lg"
          >

            <Bot className="h-4 w-4" />

            AI Assistant

          </Link>

          {/* LOGIN / LOGOUT */}

          {user ? (

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="hidden md:flex items-center gap-2 border border-red-500/20 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            >

              Logout

            </button>

          ) : (

            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            >

              <Sparkles className="h-4 w-4" />

              Login

            </Link>

          )}

          {/* MOBILE MENU */}

          <button
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="lg:hidden h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
          >

            {mobileOpen ? (
              <X />
            ) : (
              <Menu />
            )}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (

        <div className="lg:hidden px-6 pb-6">

          <div className="bg-[#0d1720] border border-white/10 rounded-2xl p-4 space-y-2">

            {links.map((item, index) => {

              const Icon = item.icon;

              return (

                <Link
                  key={index}
                  to={item.path}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all

                  ${
                    location.pathname === item.path
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-300 hover:bg-white/5'
                  }
                  `}
                >

                  <Icon className="h-5 w-5" />

                  {item.name}

                </Link>
              );
            })}

            {/* MOBILE AI BUTTON */}

            <Link
              to="/ai-assistant"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500 text-white"
            >

              <Bot className="h-5 w-5" />

              AI Assistant

            </Link>

            {user ? (

              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full mt-3 bg-red-500 text-white py-3 rounded-xl font-medium"
              >

                Logout

              </button>

            ) : (

              <Link
                to="/login"
                className="block text-center mt-3 bg-emerald-500 text-white py-3 rounded-xl font-medium"
              >

                Login

              </Link>

            )}

          </div>

        </div>

      )}

    </header>
  );
}

export default Navbar;