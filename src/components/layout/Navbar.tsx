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
  Bell,
  Flame,
  LayoutDashboard,
  Mic,
  FileText,
  Calculator,
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

  const aiLinks = [
    {
      name: 'AI Chat',
      path: '/ai-chat',
      icon: Bot,
    },

    {
      name: 'Voice AI',
      path: '/voice-ai',
      icon: Mic,
    },

    {
      name: 'AI Reports',
      path: '/ai-reports',
      icon: FileText,
    },

    {
      name: 'Carbon AI',
      path: '/carbon-calculator',
      icon: Calculator,
    },
  ];

  return (

    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#07140d]/90 backdrop-blur-2xl">

      <div className="max-w-7xl mx-auto px-6 h-[85px] flex items-center justify-between">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-4"
        >

          <motion.div
            whileHover={{ rotate: 8 }}
            className="h-14 w-14 rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)]"
          >

            <Leaf className="h-7 w-7 text-white" />

          </motion.div>

          <div>

            <h1 className="text-3xl font-black text-white tracking-tight">

              EcoLearn AI

            </h1>

            <p className="text-xs text-green-300">

              Sustainability Intelligence Platform

            </p>

          </div>

        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden xl:flex items-center gap-3">

          {links.map((item, index) => {

            const Icon = item.icon;

            return (

              <Link
                key={index}
                to={item.path}
                className={`px-5 py-3 rounded-2xl flex items-center gap-2 text-sm font-semibold transition-all duration-300

                ${
                  location.pathname === item.path
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }
                `}
              >

                <Icon className="h-4 w-4" />

                {item.name}

              </Link>
            );
          })}

        </nav>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          {/* ECO POINTS */}

          {user && (

            <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">

              <div className="bg-green-500/20 p-2 rounded-xl">

                <Flame className="text-green-400 h-5 w-5" />

              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Eco Points
                </p>

                <p className="text-white font-bold">
                  {user.points}
                </p>

              </div>

            </div>

          )}

          {/* NOTIFICATION */}

          <button className="hidden md:flex h-12 w-12 rounded-2xl bg-white/5 border border-white/10 items-center justify-center text-gray-300 hover:bg-white/10 transition-all">

            <Bell className="h-5 w-5" />

          </button>

          {/* AI ASSISTANT */}

          <Link
            to="/ai-chat"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(34,197,94,0.35)]"
          >

            <Bot className="h-5 w-5" />

            AI Assistant

          </Link>

          {/* LOGIN / LOGOUT */}

          {user ? (

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="hidden md:block bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-red-300 px-5 py-3 rounded-2xl font-semibold transition-all"
            >
              Logout
            </button>

          ) : (

            <Link
              to="/login"
              className="hidden md:flex border border-white/10 bg-white/5 hover:bg-white/10 text-white px-5 py-3 rounded-2xl font-semibold transition-all duration-300 items-center gap-2"
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
            className="xl:hidden h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
          >

            {mobileOpen ? (
              <X />
            ) : (
              <Menu />
            )}

          </button>

        </div>

      </div>

      {/* MOBILE NAV */}

      {mobileOpen && (

        <div className="xl:hidden px-6 pb-6">

          <div className="bg-[#0d1d15] border border-white/10 rounded-3xl p-5 space-y-3">

            {/* MAIN LINKS */}

            {links.map((item, index) => {

              const Icon = item.icon;

              return (

                <Link
                  key={index}
                  to={item.path}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition-all

                  ${
                    location.pathname === item.path
                      ? 'bg-green-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }
                  `}
                >

                  <Icon className="h-5 w-5" />

                  {item.name}

                </Link>
              );
            })}

            {/* AI FEATURES */}

            <div className="border-t border-white/10 pt-4 mt-4">

              <p className="text-sm text-gray-400 mb-3 px-2">

                AI Features

              </p>

              {aiLinks.map((item, index) => {

                const Icon = item.icon;

                return (

                  <Link
                    key={index}
                    to={item.path}
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="flex items-center gap-3 px-4 py-4 rounded-2xl text-gray-300 hover:bg-white/10 transition-all"
                  >

                    <Icon className="h-5 w-5 text-green-400" />

                    {item.name}

                  </Link>
                );
              })}

            </div>

            {/* LOGIN / LOGOUT */}

            {user ? (

              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full mt-3 bg-red-500 text-white py-4 rounded-2xl font-bold"
              >
                Logout
              </button>

            ) : (

              <Link
                to="/login"
                className="block text-center mt-3 bg-green-500 text-white py-4 rounded-2xl font-bold"
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