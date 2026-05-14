import React from 'react';

import {
  Bot,
  Mic,
  FileText,
  Leaf,
  ArrowRight,
  Sparkles,
  Brain,
  Zap,
  Trophy,
  BarChart3,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
} from 'recharts';

const ecoData = [
  { day: 'Mon', value: 20 },
  { day: 'Tue', value: 40 },
  { day: 'Wed', value: 35 },
  { day: 'Thu', value: 60 },
  { day: 'Fri', value: 70 },
  { day: 'Sat', value: 90 },
  { day: 'Sun', value: 120 },
];

function UserDashboard() {

  const features = [
    {
      title: 'AI Assistant',
      icon: Bot,
      desc: 'Chat with Gemini AI for sustainability guidance.',
      link: '/ai-chat',
      color: 'from-green-500 to-emerald-600',
    },

    {
      title: 'Voice AI',
      icon: Mic,
      desc: 'Voice-powered AI support assistant.',
      link: '/voice-ai',
      color: 'from-blue-500 to-cyan-600',
    },

    {
      title: 'AI Reports',
      icon: FileText,
      desc: 'Generate AI-powered eco reports.',
      link: '/ai-reports',
      color: 'from-purple-500 to-pink-600',
    },

    {
      title: 'Carbon Calculator',
      icon: Leaf,
      desc: 'Track and reduce carbon footprint.',
      link: '/carbon-calculator',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (

    <div className="min-h-screen bg-[#031014] text-white px-6 py-10">

      {/* HERO */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 p-10 shadow-[0_20px_80px_rgba(16,185,129,0.35)]"
      >

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-[120px]" />

        <div className="relative z-10">

          <div className="inline-flex items-center gap-3 bg-white/20 px-5 py-3 rounded-full backdrop-blur-xl mb-8">

            <Sparkles className="h-5 w-5" />

            AI Sustainability Platform

          </div>

          <h1 className="text-6xl font-black leading-tight">

            Welcome to
            <br />

            EcoLearn AI 🌍

          </h1>

          <p className="mt-6 text-xl text-green-50 max-w-3xl leading-relaxed">

            Your futuristic sustainability learning platform powered by
            Gemini AI, smart automation, eco analytics, and interactive
            environmental education.

          </p>

        </div>

      </motion.div>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        {[
          {
            title: 'Eco Points',
            value: '1300',
            icon: Trophy,
          },

          {
            title: 'AI Chats',
            value: '248',
            icon: Bot,
          },

          {
            title: 'Completed Lessons',
            value: '18',
            icon: Brain,
          },

          {
            title: 'Carbon Saved',
            value: '82kg',
            icon: Leaf,
          },
        ].map((item, index) => (

          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            className="bg-[#08141b] border border-white/10 rounded-[30px] p-7 shadow-2xl"
          >

            <div className="bg-green-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">

              <item.icon className="h-8 w-8 text-green-400" />

            </div>

            <h2 className="text-5xl font-black">
              {item.value}
            </h2>

            <p className="text-gray-400 mt-3">
              {item.title}
            </p>

          </motion.div>
        ))}

      </div>

      {/* FEATURE CARDS */}

      <div className="mt-14">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-4xl font-black">
              AI Features
            </h2>

            <p className="text-gray-400 mt-2">
              Everything needed to win the AI Hackathon.
            </p>

          </div>

          <div className="bg-green-500/10 px-5 py-3 rounded-2xl border border-green-500/20">

            <Zap className="text-green-400 h-6 w-6" />

          </div>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="bg-[#08141b] border border-white/10 rounded-[35px] overflow-hidden shadow-2xl"
            >

              <div
                className={`bg-gradient-to-r ${feature.color} p-8`}
              >

                <feature.icon className="h-12 w-12 text-white" />

              </div>

              <div className="p-8">

                <h2 className="text-3xl font-black">
                  {feature.title}
                </h2>

                <p className="text-gray-400 mt-4 leading-relaxed">

                  {feature.desc}

                </p>

                <Link
                  to={feature.link}
                  className="mt-8 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-all px-6 py-3 rounded-2xl font-bold"
                >

                  Open

                  <ArrowRight className="h-5 w-5" />

                </Link>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* AI ANALYTICS */}

      <div className="grid lg:grid-cols-3 gap-8 mt-16">

        {/* CHART */}

        <div className="lg:col-span-2 bg-[#08141b] border border-white/10 rounded-[35px] p-8 shadow-2xl">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-black">
                Sustainability Analytics
              </h2>

              <p className="text-gray-400 mt-2">
                Weekly environmental impact
              </p>

            </div>

            <BarChart3 className="text-green-400 h-8 w-8" />

          </div>

          <div className="h-[320px]">

            <ResponsiveContainer>

              <AreaChart data={ecoData}>

                <defs>

                  <linearGradient
                    id="eco"
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
                  dataKey="value"
                  stroke="#22c55e"
                  fill="url(#eco)"
                  strokeWidth={4}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* SIDE PANEL */}

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[35px] p-8 shadow-2xl relative overflow-hidden">

          <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-[120px]" />

          <div className="relative">

            <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-8">

              <Brain className="h-10 w-10 text-white" />

            </div>

            <h2 className="text-4xl font-black">

              Gemini AI

            </h2>

            <p className="mt-5 text-green-50 leading-relaxed text-lg">

              AI-powered sustainability recommendations, eco analytics,
              smart learning paths, voice support, and environmental automation.

            </p>

            <Link
              to="/ai-chat"
              className="mt-10 inline-flex items-center gap-3 bg-white text-green-700 px-6 py-4 rounded-2xl font-black hover:scale-105 transition-all"
            >

              Launch AI Assistant

              <ArrowRight className="h-5 w-5" />

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;