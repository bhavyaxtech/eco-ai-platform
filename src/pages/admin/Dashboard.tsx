import React from 'react';

import {
  Users,
  BookOpen,
  Trophy,
  Settings,
  Activity,
  ArrowUpRight,
} from 'lucide-react';

import { useAuthStore } from '../../lib/store';

function Dashboard() {

  const { user } = useAuthStore();

  if (!user || user.role !== 'admin') {

    return (

      <div className="flex items-center justify-center min-h-[70vh] px-6">

        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 shadow-sm rounded-3xl p-10 text-center max-w-md w-full">

          <h1 className="text-2xl font-semibold text-red-500">
            Access Denied
          </h1>

          <p className="text-gray-500 mt-3 text-sm leading-relaxed">
            You do not have permission to access the admin dashboard.
          </p>

        </div>

      </div>
    );
  }

  const stats = [
    {
      title: 'Total Users',
      value: '12,480',
      icon: Users,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },

    {
      title: 'Lessons',
      value: '145',
      icon: BookOpen,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
    },

    {
      title: 'Quizzes',
      value: '320',
      icon: Trophy,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-500/10',
    },

    {
      title: 'Platform Activity',
      value: '89%',
      icon: Activity,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-500/10',
    },
  ];

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>

          <p className="text-sm text-emerald-500 font-medium mb-2">
            Admin Panel
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Monitor users, lessons, quizzes, and platform performance.
          </p>

        </div>

        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-2xl transition-all text-sm font-medium shadow-sm">

          <Settings className="h-4 w-4" />

          Settings

        </button>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-semibold mt-3 text-gray-900 dark:text-white">
                    {item.value}
                  </h2>

                </div>

                <div className={`${item.bg} p-4 rounded-2xl`}>

                  <Icon className={`h-6 w-6 ${item.color}`} />

                </div>

              </div>

              <div className="flex items-center gap-2 mt-6 text-emerald-500 text-sm font-medium">

                <ArrowUpRight className="h-4 w-4" />

                +12% this month

              </div>

            </div>
          );
        })}

      </div>

      {/* RECENT USERS */}

      <div className="mt-10 bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm p-8">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Users
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              New users who joined recently
            </p>

          </div>

          <button className="text-sm text-emerald-500 hover:text-emerald-600 font-medium">
            View All
          </button>

        </div>

        <div className="space-y-5">

          {[1, 2, 3, 4].map((item) => (

            <div
              key={item}
              className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-5"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-semibold">

                  U

                </div>

                <div>

                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Eco User {item}
                  </h3>

                  <p className="text-sm text-gray-500">
                    eco{item}@gmail.com
                  </p>

                </div>

              </div>

              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl text-gray-500">
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