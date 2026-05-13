import React from 'react';

import {
  Users,
  BookOpen,
  Trophy,
  Settings,
} from 'lucide-react';

import {
  useAuthStore,
} from '../../lib/store';

function Dashboard() {

  const { user } =
    useAuthStore();

  // ADMIN CHECK

  if (
    !user ||
    user.role !== 'admin'
  ) {

    return (

      <div className="flex items-center justify-center min-h-[70vh]">

        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-3xl p-10 text-center">

          <h1 className="text-3xl font-bold text-red-500">

            Access Denied

          </h1>

          <p className="text-gray-500 mt-3">

            You are not authorized
            to access admin dashboard.

          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-4xl font-black text-slate-900 dark:text-white">

            Admin Dashboard

          </h1>

          <p className="text-gray-500 mt-2">

            Manage platform data and users

          </p>

        </div>

        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl transition-all">

          <Settings className="h-5 w-5" />

          Settings

        </button>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* USERS */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-7">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Total Users

              </p>

              <h2 className="text-5xl font-black mt-2 text-green-600">

                12K+

              </h2>

            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl">

              <Users className="h-8 w-8 text-green-600" />

            </div>

          </div>

        </div>

        {/* LESSONS */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-7">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Lessons

              </p>

              <h2 className="text-5xl font-black mt-2 text-blue-600">

                145

              </h2>

            </div>

            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl">

              <BookOpen className="h-8 w-8 text-blue-600" />

            </div>

          </div>

        </div>

        {/* QUIZZES */}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-7">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Quizzes

              </p>

              <h2 className="text-5xl font-black mt-2 text-yellow-500">

                320

              </h2>

            </div>

            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-2xl">

              <Trophy className="h-8 w-8 text-yellow-500" />

            </div>

          </div>

        </div>

      </div>

      {/* RECENT USERS */}

      <div className="mt-10 bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6 dark:text-white">

          Recent Users

        </h2>

        <div className="space-y-5">

          {[1, 2, 3].map((item) => (

            <div
              key={item}
              className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 pb-4"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center font-bold text-green-600">

                  U

                </div>

                <div>

                  <h3 className="font-semibold dark:text-white">

                    Eco User {item}

                  </h3>

                  <p className="text-gray-500 text-sm">

                    eco{item}@gmail.com

                  </p>

                </div>

              </div>

              <span className="text-sm text-gray-400">

                Joined Today

              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;