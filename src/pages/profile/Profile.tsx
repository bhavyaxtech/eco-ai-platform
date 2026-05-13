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

    <div className="min-h-screen bg-[#f7fff9] dark:bg-slate-950 px-4 md:px-8 py-10">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* HERO PROFILE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 p-10 text-white shadow-[0_20px_80px_rgba(16,185,129,0.35)]"
        >

          {/* BLUR EFFECTS */}

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-[100px]" />

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-[120px]" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            {/* LEFT */}

            <div className="flex items-center gap-6">

              <div className="bg-white/20 backdrop-blur-xl p-6 rounded-full border border-white/20">

                <User className="h-16 w-16" />

              </div>

              <div>

                <div className="flex items-center gap-3 flex-wrap">

                  <h1 className="text-5xl font-black">

                    {user.username}

                  </h1>

                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold border border-white/20">

                    {getRank()}

                  </span>

                </div>

                <p className="text-green-100 text-lg mt-3">

                  {user.email}

                </p>

                <div className="flex items-center gap-4 mt-6 flex-wrap">

                  <div className="bg-white/10 px-5 py-3 rounded-2xl backdrop-blur-lg">

                    <p className="text-sm text-green-100">
                      Level
                    </p>

                    <h3 className="text-2xl font-black">
                      {level}
                    </h3>

                  </div>

                  <div className="bg-white/10 px-5 py-3 rounded-2xl backdrop-blur-lg">

                    <p className="text-sm text-green-100">
                      XP
                    </p>

                    <h3 className="text-2xl font-black">
                      {totalXP}
                    </h3>

                  </div>

                  <div className="bg-white/10 px-5 py-3 rounded-2xl backdrop-blur-lg">

                    <p className="text-sm text-green-100">
                      Rank
                    </p>

                    <h3 className="text-2xl font-black">
                      #{Math.max(
                        1,
                        100 -
                          completedQuizzes.length
                      )}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">

                <Sparkles className="h-10 w-10 mb-4" />

                <h2 className="text-4xl font-black">
                  {user.points}
                </h2>

                <p className="text-green-100 mt-2">
                  Eco Score
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">

                <Target className="h-10 w-10 mb-4" />

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
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-[30px] p-7 shadow-xl border border-gray-100 dark:border-slate-800"
              >

                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-3xl`}
                />

                <div
                  className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg`}
                >

                  <item.icon className="h-8 w-8" />

                </div>

                <h2 className="text-5xl font-black mt-6 text-slate-900 dark:text-white">

                  {item.value}

                </h2>

                <p className="text-gray-500 mt-3 text-lg">

                  {item.title}

                </p>

              </motion.div>
            )
          )}

        </div>

        {/* CHART + XP */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* CHART */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[35px] p-8 shadow-2xl border border-gray-100 dark:border-slate-800"
          >

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-3xl font-black text-slate-900 dark:text-white">

                  Weekly Progress 📈

                </h2>

                <p className="text-gray-500 mt-2">

                  Your sustainability growth
                </p>

              </div>

              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl">

                <TrendingUp className="text-green-600 h-7 w-7" />

              </div>

            </div>

            <div className="h-[320px]">

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

                  <XAxis dataKey="day" />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="points"
                    stroke="#16a34a"
                    fillOpacity={1}
                    fill="url(#colorPoints)"
                    strokeWidth={4}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

          {/* XP CARD */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[35px] p-8 text-white shadow-2xl relative overflow-hidden"
          >

            <div className="absolute top-0 right-0 w-60 h-60 bg-green-500/20 rounded-full blur-[120px]" />

            <div className="relative">

              <div className="bg-green-500/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-8">

                <Star className="h-10 w-10 text-green-400" />

              </div>

              <h2 className="text-3xl font-black leading-tight">

                Total XP Earned
              </h2>

              <div className="text-7xl font-black mt-8 text-green-400">

                {totalXP}

              </div>

              <p className="text-slate-300 mt-6 leading-relaxed">

                Continue completing quizzes and eco missions to unlock new achievements and sustainability ranks.

              </p>

              <div className="mt-10 space-y-5">

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span>
                      Next Level
                    </span>

                    <span>
                      {user.points % 200}/200
                    </span>

                  </div>

                  <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">

                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full"
                      style={{
                        width: `${(user.points % 200) / 2}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

        {/* ENVIRONMENTAL IMPACT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-[40px] p-10 text-white shadow-[0_20px_80px_rgba(16,185,129,0.35)]"
        >

          <div className="flex items-center gap-4 mb-10">

            <div className="bg-white/20 p-5 rounded-3xl">

              <Activity className="h-10 w-10" />

            </div>

            <div>

              <h2 className="text-4xl font-black">

                Your Environmental Impact 🌍

              </h2>

              <p className="text-green-100 mt-2 text-lg">

                Real-world positive contributions
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">

              <h3 className="text-6xl font-black">

                {Math.floor(
                  user.points / 10
                )}kg

              </h3>

              <p className="text-green-100 mt-3 text-lg">

                CO₂ Saved

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">

              <h3 className="text-6xl font-black">

                {Math.floor(
                  user.points * 2
                )}L

              </h3>

              <p className="text-green-100 mt-3 text-lg">

                Water Conserved

              </p>

            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">

              <h3 className="text-6xl font-black">

                {Math.floor(
                  user.points / 5
                )}

              </h3>

              <p className="text-green-100 mt-3 text-lg">

                Plastic Avoided

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Profile;