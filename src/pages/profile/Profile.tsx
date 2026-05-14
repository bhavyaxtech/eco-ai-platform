import React from 'react';

import { motion } from 'framer-motion';

import {
  User,
  Trophy,
  Leaf,
  Award,
  Flame,
  Star,
  Sparkles,
  Target,
  Activity,
  TrendingUp,
} from 'lucide-react';

import { useAuthStore } from '../../lib/store';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from 'recharts';

function Profile() {

  const {
    user,
    completedQuizzes,
    totalXP,
  } = useAuthStore();

  if (!user) return null;

  const level =
    Math.floor(user.points / 200) || 1;

  const streak =
    completedQuizzes.length + 3;

  const getRank = () => {

    if (user.points >= 3000)
      return 'Planet Guardian 🌍';

    if (user.points >= 2000)
      return 'Eco Champion 🌱';

    if (user.points >= 1500)
      return 'Green Warrior 🍃';

    return 'Eco Starter 🌿';
  };

  const ecoData = [
    {
      day: 'Mon',
      points:
        Math.floor(user.points * 0.2),
    },
    {
      day: 'Tue',
      points:
        Math.floor(user.points * 0.35),
    },
    {
      day: 'Wed',
      points:
        Math.floor(user.points * 0.48),
    },
    {
      day: 'Thu',
      points:
        Math.floor(user.points * 0.62),
    },
    {
      day: 'Fri',
      points:
        Math.floor(user.points * 0.74),
    },
    {
      day: 'Sat',
      points:
        Math.floor(user.points * 0.88),
    },
    {
      day: 'Sun',
      points: user.points,
    },
  ];

  const stats = [
    {
      title: 'Eco Points',
      value: user.points,
      icon: Trophy,
      color:
        'from-yellow-500 to-orange-500',
    },
    {
      title: 'Challenges',
      value: Math.floor(
        user.points / 50
      ),
      icon: Leaf,
      color:
        'from-green-500 to-emerald-500',
    },
    {
      title: 'Quizzes',
      value:
        completedQuizzes.length,
      icon: Award,
      color:
        'from-blue-500 to-cyan-500',
    },
    {
      title: 'Day Streak',
      value: streak,
      icon: Flame,
      color:
        'from-red-500 to-pink-500',
    },
  ];

  return (

    <div className="min-h-screen bg-[#071226] px-4 md:px-6 py-8">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 text-white shadow-[0_20px_80px_rgba(16,185,129,0.25)]"
        >

          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[120px]" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* LEFT */}

            <div className="flex items-center gap-6">

              <div className="bg-white/20 p-6 rounded-full border border-white/20">

                <User className="h-14 w-14" />

              </div>

              <div>

                <div className="flex items-center gap-3 flex-wrap">

                  <h1 className="text-4xl font-black">

                    {user.username}

                  </h1>

                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">

                    {getRank()}

                  </span>

                </div>

                <p className="text-green-100 mt-2">

                  {user.email}

                </p>

                <div className="flex gap-4 mt-6 flex-wrap">

                  <div className="bg-white/10 px-5 py-3 rounded-2xl">

                    <p className="text-sm text-green-100">
                      Level
                    </p>

                    <h2 className="text-2xl font-bold">
                      {level}
                    </h2>

                  </div>

                  <div className="bg-white/10 px-5 py-3 rounded-2xl">

                    <p className="text-sm text-green-100">
                      XP
                    </p>

                    <h2 className="text-2xl font-bold">
                      {totalXP}
                    </h2>

                  </div>

                  <div className="bg-white/10 px-5 py-3 rounded-2xl">

                    <p className="text-sm text-green-100">
                      Rank
                    </p>

                    <h2 className="text-2xl font-bold">
                      #{Math.max(
                        1,
                        100 -
                          completedQuizzes.length
                      )}
                    </h2>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10">

                <Sparkles className="h-8 w-8 mb-4" />

                <h2 className="text-4xl font-black">

                  {user.points}

                </h2>

                <p className="text-green-100 mt-2">

                  Eco Score

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10">

                <Target className="h-8 w-8 mb-4" />

                <h2 className="text-4xl font-black">

                  {completedQuizzes.length}

                </h2>

                <p className="text-green-100 mt-2">

                  Goals Completed

                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map(
            (item, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                }}
                className="bg-[#0f172a] border border-white/10 rounded-[28px] p-6 shadow-xl"
              >

                <div
                  className={`bg-gradient-to-r ${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white`}
                >

                  <item.icon className="h-7 w-7" />

                </div>

                <h2 className="text-4xl font-black text-white mt-5">

                  {item.value}

                </h2>

                <p className="text-gray-400 mt-2">

                  {item.title}

                </p>

              </motion.div>
            )
          )}

        </div>

        {/* CHART + XP */}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* CHART */}

          <div className="lg:col-span-2 bg-[#0f172a] rounded-[30px] p-7 border border-white/10 shadow-xl">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-black text-white">

                  Weekly Progress 📈

                </h2>

                <p className="text-gray-400 mt-1">

                  Sustainability growth

                </p>

              </div>

              <div className="bg-green-500/20 p-3 rounded-2xl">

                <TrendingUp className="text-green-400 h-6 w-6" />

              </div>

            </div>

            <div className="h-[280px]">

              <ResponsiveContainer>

                <AreaChart data={ecoData}>

                  <defs>

                    <linearGradient
                      id="colorPoints"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="5%"
                        stopColor="#22c55e"
                        stopOpacity={0.8}
                      />

                      <stop
                        offset="95%"
                        stopColor="#22c55e"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>

                  <XAxis
                    dataKey="day"
                    stroke="#94a3b8"
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="points"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorPoints)"
                    strokeWidth={4}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* XP CARD */}

          <div className="bg-gradient-to-br from-[#111827] to-[#0f172a] rounded-[30px] p-7 text-white border border-white/10 shadow-xl">

            <div className="bg-green-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">

              <Star className="h-8 w-8 text-green-400" />

            </div>

            <h2 className="text-2xl font-black">

              Total XP

            </h2>

            <div className="text-6xl font-black text-green-400 mt-6">

              {totalXP}

            </div>

            <p className="text-gray-400 mt-5 leading-relaxed">

              Complete more eco missions and quizzes to level up faster.

            </p>

            <div className="mt-8">

              <div className="flex justify-between text-sm mb-2">

                <span>
                  Next Level
                </span>

                <span>
                  {user.points % 200}/200
                </span>

              </div>

              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">

                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                  style={{
                    width: `${(user.points % 200) / 2}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        {/* IMPACT */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-[32px] p-8 text-white shadow-[0_20px_80px_rgba(16,185,129,0.25)]">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-white/20 p-4 rounded-2xl">

              <Activity className="h-8 w-8" />

            </div>

            <div>

              <h2 className="text-3xl font-black">

                Environmental Impact 🌍

              </h2>

              <p className="text-green-100 mt-1">

                Your eco contribution

              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6">

              <h3 className="text-5xl font-black">

                {Math.floor(
                  user.points / 10
                )}kg

              </h3>

              <p className="text-green-100 mt-3">

                CO₂ Saved

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6">

              <h3 className="text-5xl font-black">

                {Math.floor(
                  user.points * 2
                )}L

              </h3>

              <p className="text-green-100 mt-3">

                Water Conserved

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6">

              <h3 className="text-5xl font-black">

                {Math.floor(
                  user.points / 5
                )}

              </h3>

              <p className="text-green-100 mt-3">

                Plastic Avoided

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;