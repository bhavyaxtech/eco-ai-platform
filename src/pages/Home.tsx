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
  Mic,
  ShieldCheck,
  BarChart3,
  MessageSquare,
  Cpu,
} from 'lucide-react';

import { motion } from 'framer-motion';

function Home() {

  const features = [

    {
      icon: <Bot className="h-8 w-8" />,
      title: 'AI Support Agent',
      desc: '24/7 intelligent AI customer support assistant.',
    },

    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI Automation',
      desc: 'Automate workflows and repetitive tasks.',
    },

    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'Smart Conversations',
      desc: 'Context-aware AI chat with memory.',
    },

    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Analytics Dashboard',
      desc: 'Track customer engagement & AI performance.',
    },
  ];

  return (

    <div className="overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/20 blur-[180px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 blur-[180px] rounded-full" />

      </div>

      {/* HERO */}

      <section className="min-h-screen flex items-center">

        <div className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-6 py-3 rounded-full text-green-400 font-semibold mb-8">

              <Sparkles size={18} />

              AI-Powered Customer Support Platform

            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-[1.05]">

              Future of
              <br />

              AI Customer
              <br />

              Support 🚀

            </h1>

            <p className="mt-8 text-xl leading-relaxed text-gray-300 max-w-2xl">

              Build intelligent AI-powered customer support,
              automation workflows, smart chatbots, analytics,
              and real-time AI assistants with modern SaaS experience.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-2xl"
              >

                Launch Platform

                <ArrowRight className="h-5 w-5" />

              </Link>

              <Link
                to="/ai-assistant"
                className="border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold transition-all"
              >

                Open AI Assistant

              </Link>

            </div>

            {/* STATS */}

            <div className="flex flex-wrap gap-10 mt-14">

              <div>
                <h2 className="text-5xl font-black text-green-400">
                  98%
                </h2>
                <p className="text-gray-400 mt-2">
                  Faster Support
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-black text-emerald-400">
                  24/7
                </h2>
                <p className="text-gray-400 mt-2">
                  AI Automation
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-black text-green-500">
                  10K+
                </h2>
                <p className="text-gray-400 mt-2">
                  Conversations
                </p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">

              {/* AI CARD */}

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[32px] p-8 shadow-2xl">

                <div className="flex items-center gap-4 mb-6">

                  <div className="bg-white/20 p-4 rounded-2xl">
                    <Bot className="h-10 w-10" />
                  </div>

                  <div>

                    <h2 className="text-3xl font-black">
                      AI Assistant
                    </h2>

                    <p className="text-green-100">
                      Gemini + OpenRouter Powered
                    </p>

                  </div>

                </div>

                <p className="text-lg leading-relaxed text-green-50">

                  Smart AI support with voice,
                  automation, sentiment analysis,
                  memory support, and intelligent workflows.

                </p>

              </div>

              {/* FEATURE GRID */}

              <div className="grid grid-cols-2 gap-5 mt-6">

                {features.map((feature, index) => (

                  <motion.div
                    key={index}
                    whileHover={{ y: -6 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-6"
                  >

                    <div className="text-green-400 mb-4">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-black">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                      {feature.desc}
                    </p>

                  </motion.div>

                ))}

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="py-28">

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center mb-20">

            <h2 className="text-5xl font-black">
              Powerful AI Features
            </h2>

            <p className="text-gray-400 mt-6 text-xl">
              Everything needed to win the AI Hackathon.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-10">

              <Mic className="h-14 w-14 text-green-400 mb-6" />

              <h3 className="text-2xl font-black">
                Voice AI
              </h3>

              <p className="text-gray-400 mt-4">
                Voice-enabled customer support assistant with speech recognition.
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-10">

              <ShieldCheck className="h-14 w-14 text-emerald-400 mb-6" />

              <h3 className="text-2xl font-black">
                AI Ticketing
              </h3>

              <p className="text-gray-400 mt-4">
                Automatically create and manage support tickets.
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-10">

              <Cpu className="h-14 w-14 text-green-500 mb-6" />

              <h3 className="text-2xl font-black">
                AI Automation
              </h3>

              <p className="text-gray-400 mt-4">
                Automate customer support workflows and business processes.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  );
}

export default Home;