import React from 'react';

import { Link } from 'react-router-dom';

import {
  ArrowRight,
  Bot,
  Brain,
  BarChart3,
  ShieldCheck,
  Mic,
  Cpu,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

import { motion } from 'framer-motion';

function Home() {

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: 'AI Assistant',
      desc: 'Real-time smart AI customer support.',
    },

    {
      icon: <Brain className="h-6 w-6" />,
      title: 'Automation',
      desc: 'Automate business workflows easily.',
    },

    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'AI Memory',
      desc: 'AI remembers conversations naturally.',
    },

    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics',
      desc: 'Track performance & engagement.',
    },
  ];

  return (

    <div className="min-h-screen bg-[#071018] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full" />

      </div>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* BADGE */}
{/* 
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">

            <Sparkles size={16} />

            AI Customer Support Platform

          </div> */}

          {/* HEADING */}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight max-w-xl">

            Smart AI Support
            <br />

            For Businesses

          </h1>

          {/* DESCRIPTION */}

          <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-xl">

            Build AI-powered customer support,
            automation workflows, analytics dashboards,
            and intelligent assistants with a modern SaaS experience.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              to="/dashboard"
              className="bg-emerald-500 hover:bg-emerald-400 transition-all duration-300 px-7 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >

              Launch Platform

              <ArrowRight size={18} />

            </Link>

            <Link
              to="/ai-assistant"
              className="border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 px-7 py-3 rounded-2xl font-semibold"
            >

              Open AI Assistant

            </Link>

          </div>

          {/* STATS */}

          <div className="flex gap-10 mt-14 flex-wrap">

            <div>

              <h2 className="text-3xl font-black text-emerald-400">

                24/7

              </h2>

              <p className="text-sm text-gray-400 mt-1">

                AI Support

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-black text-green-400">

                98%

              </h2>

              <p className="text-sm text-gray-400 mt-1">

                Faster Replies

              </p>

            </div>

            <div>

              <h2 className="text-3xl font-black text-emerald-300">

                10K+

              </h2>

              <p className="text-sm text-gray-400 mt-1">

                Conversations

              </p>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

            {/* TOP CARD */}

            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-7">

              <div className="flex items-center gap-4">

                <div className="bg-white/20 p-4 rounded-2xl">

                  <Bot className="h-8 w-8" />

                </div>

                <div>

                  <h2 className="text-3xl font-black">

                    AI Assistant

                  </h2>

                  <p className="text-green-50 text-sm mt-1">

                    Powered by Gemini AI

                  </p>

                </div>

              </div>

              <p className="mt-6 text-green-50 leading-relaxed text-lg">

                Intelligent AI chat, automation,
                analytics, voice assistant,
                and smart customer support.

              </p>

            </div>

            {/* FEATURES */}

            <div className="grid grid-cols-2 gap-4 mt-5">

              {features.map((feature, index) => (

                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="bg-[#101826] border border-white/5 rounded-2xl p-5"
                >

                  <div className="text-emerald-400 mb-4">

                    {feature.icon}

                  </div>

                  <h3 className="font-semibold text-lg">

                    {feature.title}

                  </h3>

                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">

                    {feature.desc}

                  </p>

                </motion.div>

              ))}

            </div>

          </div>

        </motion.div>

      </section>

      {/* FEATURES SECTION */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">

        <div className="text-center mb-14">

          <h2 className="text-3xl lg:text-4xl font-black">

            Platform Features

          </h2>

          <p className="text-gray-400 mt-4">

            Everything needed for a modern AI SaaS platform.

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <Mic className="h-10 w-10 text-emerald-400 mb-5" />

            <h3 className="text-xl font-semibold">

              Voice AI

            </h3>

            <p className="text-gray-400 mt-3 leading-relaxed text-sm">

              Voice-enabled AI assistant with speech recognition.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <ShieldCheck className="h-10 w-10 text-green-400 mb-5" />

            <h3 className="text-xl font-semibold">

              AI Ticketing

            </h3>

            <p className="text-gray-400 mt-3 leading-relaxed text-sm">

              Automatically create and manage support tickets.

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <Cpu className="h-10 w-10 text-emerald-300 mb-5" />

            <h3 className="text-xl font-semibold">

              Workflow Automation

            </h3>

            <p className="text-gray-400 mt-3 leading-relaxed text-sm">

              Automate repetitive business operations using AI.

            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;