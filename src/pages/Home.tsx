import React from 'react';

import { Link } from 'react-router-dom';

import {
  ArrowRight,
  Bot,
  Sparkles,
  Globe,
  Leaf,
  Zap,
  Trophy,
  Brain,
} from 'lucide-react';

import { motion } from 'framer-motion';

function Home() {

  const features = [

    {
      icon: <Bot className="h-8 w-8" />,
      title: 'AI Assistant',
      desc: 'Smart sustainability guidance powered by Gemini AI.',
    },

    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Eco Missions',
      desc: 'Complete daily sustainability challenges.',
    },

    {
      icon: <Brain className="h-8 w-8" />,
      title: 'Interactive Learning',
      desc: 'Gamified lessons and quizzes.',
    },

    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'Leaderboard',
      desc: 'Compete with eco learners globally.',
    },
  ];

  return (

    <div className="overflow-hidden">

      {/* HERO */}

      <section className="relative min-h-screen flex items-center">

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-400/20 blur-[150px] rounded-full" />

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 blur-[150px] rounded-full" />

        </div>

        <div className="relative max-w-[1400px] mx-auto px-8 py-24 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

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
              duration: 0.8,
            }}
          >

            <div className="inline-flex items-center gap-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-6 py-3 rounded-full font-semibold mb-8">

              <Sparkles size={18} />

              AI Powered Sustainability Platform

            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-[1.05] text-slate-900 dark:text-white">

              Learn.
              <br />

              Protect.
              <br />

              Transform 🌍

            </h1>

            <p className="mt-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl">

              EcoLearn is an AI-powered sustainability learning platform
              helping students fight climate change through interactive
              education, eco missions, smart AI tools, and gamified learning.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-2xl"
              >

                Get Started

                <ArrowRight className="h-5 w-5" />

              </Link>

              <Link
                to="/ai-assistant"
                className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all dark:text-white"
              >

                Open AI Assistant

              </Link>

            </div>

            {/* STATS */}

            <div className="flex flex-wrap gap-10 mt-14">

              <div>
                <h2 className="text-5xl font-black text-green-600">
                  12K+
                </h2>
                <p className="text-gray-500 mt-2">
                  Students
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-black text-emerald-600">
                  150+
                </h2>
                <p className="text-gray-500 mt-2">
                  Eco Challenges
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-black text-green-700">
                  98%
                </h2>
                <p className="text-gray-500 mt-2">
                  Positive Impact
                </p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="glass rounded-[40px] border border-white/20 p-8 shadow-2xl">

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[32px] p-8 text-white shadow-glow">

                <div className="flex items-center gap-4 mb-6">

                  <div className="bg-white/20 p-4 rounded-2xl">
                    <Bot className="h-10 w-10" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-black">
                      Eco AI
                    </h2>

                    <p className="text-green-100">
                      Gemini Powered
                    </p>
                  </div>

                </div>

                <p className="text-lg leading-relaxed text-green-50">

                  Ask anything about climate change,
                  renewable energy, sustainability,
                  recycling, eco habits, and green technology.

                </p>

              </div>

              {/* FEATURE GRID */}

              <div className="grid grid-cols-2 gap-5 mt-6">

                {features.map((feature, index) => (

                  <motion.div
                    key={index}
                    whileHover={{
                      y: -6,
                    }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800"
                  >

                    <div className="text-green-600 mb-4">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-black dark:text-white">
                      {feature.title}
                    </h3>

                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                      {feature.desc}
                    </p>

                  </motion.div>

                ))}

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* EXTRA SECTION */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-8 text-center">

          <h2 className="text-5xl font-black text-slate-900 dark:text-white">

            Why EcoLearn?

          </h2>

          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">

            A futuristic AI education ecosystem designed for
            sustainability awareness, environmental learning,
            and real-world eco action.

          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl">

              <Globe className="h-14 w-14 text-blue-500 mx-auto mb-5" />

              <h3 className="text-2xl font-black dark:text-white">
                Global Impact
              </h3>

              <p className="text-gray-500 mt-4">
                Learn how small actions create large environmental change.
              </p>

            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl">

              <Zap className="h-14 w-14 text-yellow-500 mx-auto mb-5" />

              <h3 className="text-2xl font-black dark:text-white">
                Gamified Learning
              </h3>

              <p className="text-gray-500 mt-4">
                Earn XP, unlock rewards, and compete with others.
              </p>

            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl">

              <Leaf className="h-14 w-14 text-green-500 mx-auto mb-5" />

              <h3 className="text-2xl font-black dark:text-white">
                Eco Friendly Habits
              </h3>

              <p className="text-gray-500 mt-4">
                Build sustainability habits through interactive missions.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;