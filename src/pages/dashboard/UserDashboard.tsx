import React from 'react';

import {
  Bot,
  Mic,
  FileText,
  Leaf,
  Brain,
  Trophy,
  ArrowRight,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

function UserDashboard() {

  const navigate = useNavigate();

  const stats = [
    {
      title: 'AI Chats',
      value: '248',
      icon: Bot,
    },

    {
      title: 'Lessons',
      value: '18',
      icon: Brain,
    },

    {
      title: 'Carbon Saved',
      value: '82kg',
      icon: Leaf,
    },

    {
      title: 'Achievements',
      value: '12',
      icon: Trophy,
    },
  ];

  const tools = [

    {
      title: 'AI Assistant',
      desc: 'Smart sustainability chatbot.',
      icon: Bot,
      color: 'from-emerald-500 to-green-500',
      path: '/ai-assistant',
    },

    {
      title: 'Voice AI',
      desc: 'Voice powered AI assistant.',
      icon: Mic,
      color: 'from-blue-500 to-cyan-500',
      path: '/voice-ai',
    },

    {
      title: 'AI Reports',
      desc: 'Generate eco reports instantly.',
      icon: FileText,
      color: 'from-fuchsia-500 to-pink-500',
      path: '/ai-reports',
    },

    {
      title: 'Carbon Calculator',
      desc: 'Track your carbon footprint.',
      icon: Leaf,
      color: 'from-orange-500 to-red-500',
      path: '/carbon-calculator',
    },
  ];

  return (

    <div className="min-h-screen bg-[#020817] text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-3xl font-bold">

            Dashboard

          </h1>

          <p className="text-slate-400 mt-2 text-sm">

            Manage your AI sustainability tools and activity.

          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-14">

          {stats.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="bg-[#07111d] border border-white/5 rounded-3xl p-6"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-slate-400 text-sm">

                      {item.title}

                    </p>

                    <h2 className="text-4xl font-bold mt-3">

                      {item.value}

                    </h2>

                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl">

                    <Icon className="h-6 w-6 text-emerald-400" />

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* TOOLS */}

        <div className="mb-8">

          <h2 className="text-2xl font-semibold">

            AI Tools

          </h2>

          <p className="text-slate-400 text-sm mt-2">

            Access all AI powered features.

          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {tools.map((tool, index) => {

            const Icon = tool.icon;

            return (

              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="bg-[#0d1721] border border-white/5 rounded-3xl overflow-hidden"
              >

                {/* TOP */}

                <div
                  className={`bg-gradient-to-r ${tool.color} p-5`}
                >

                  <Icon className="h-8 w-8 text-white" />

                </div>

                {/* BODY */}

                <div className="p-5">

                  <h3 className="text-xl font-semibold">

                    {tool.title}

                  </h3>

                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">

                    {tool.desc}

                  </p>

                  <button
                    onClick={() => navigate(tool.path)}
                    className="mt-5 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition px-4 py-2 rounded-xl text-sm font-medium"
                  >

                    Open

                    <ArrowRight className="h-4 w-4" />

                  </button>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;