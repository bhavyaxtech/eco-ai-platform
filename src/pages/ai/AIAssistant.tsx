import React, { useState, useRef, useEffect } from 'react';

import axios from 'axios';

import {
  Bot,
  Send,
  User,
  Sparkles,
  Leaf,
  Recycle,
  Wind,
  Globe2,
  Mic,
  Trash2,
} from 'lucide-react';

import { motion } from 'framer-motion';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

function AIAssistant() {

  const [message, setMessage] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [chat, setChat] =
    useState<ChatMessage[]>([
      {
        role: 'ai',
        text:
          `Hello 👋 I am EcoMind AI.

I can help you with:
• Sustainability
• Climate change
• Recycling
• Renewable energy
• Carbon footprint
• Eco-friendly living

Ask me anything 🌱`,
      },
    ]);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });

  }, [chat]);

  const quickQuestions = [
    'How can I reduce plastic waste?',
    'What is renewable energy?',
    'Tips for saving electricity',
    'How does recycling help?',
  ];

  const sendMessage = async (
    customMessage?: string
  ) => {

    const finalMessage =
      customMessage || message;

    if (!finalMessage.trim()) return;

    const updatedChat = [
      ...chat,
      {
        role: 'user' as const,
        text: finalMessage,
      },
    ];

    setChat(updatedChat);

    setLoading(true);

    try {

      const res = await axios.post(
        'http://127.0.0.1:5000/api/ai/ask',
        {
          question: finalMessage,
        }
      );

      setChat([
        ...updatedChat,
        {
          role: 'ai',
          text: res.data.answer,
        },
      ]);

    } catch (err) {

      console.log(err);

      setChat([
        ...updatedChat,
        {
          role: 'ai',
          text:
            '⚠️ AI failed to respond. Please try again.',
        },
      ]);
    }

    setMessage('');

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-[#07111f] text-white px-4 py-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-[32px] p-6 md:p-8 shadow-2xl mb-6 relative overflow-hidden"
        >

          <div className="absolute right-0 top-0 opacity-10">

            <Globe2 className="w-72 h-72" />

          </div>

          <div className="relative z-10">

            <div className="flex items-center gap-4">

              <div className="h-16 w-16 rounded-3xl bg-white/15 flex items-center justify-center backdrop-blur-xl">

                <Sparkles className="h-8 w-8 text-white" />

              </div>

              <div>

                <h1 className="text-3xl md:text-5xl font-black">

                  EcoMind AI

                </h1>

                <p className="text-green-50 mt-2 text-sm md:text-base">

                  Your intelligent sustainability assistant 🌱

                </p>

              </div>

            </div>

            {/* FEATURES */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xl">

                <Leaf className="h-6 w-6 mb-2" />

                <p className="text-sm font-semibold">
                  Sustainability
                </p>

              </div>

              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xl">

                <Recycle className="h-6 w-6 mb-2" />

                <p className="text-sm font-semibold">
                  Recycling
                </p>

              </div>

              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xl">

                <Wind className="h-6 w-6 mb-2" />

                <p className="text-sm font-semibold">
                  Clean Energy
                </p>

              </div>

              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xl">

                <Globe2 className="h-6 w-6 mb-2" />

                <p className="text-sm font-semibold">
                  Climate AI
                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* MAIN CHAT */}

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">

          {/* CHAT PANEL */}

          <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl shadow-2xl">

            {/* TOP */}

            <div className="border-b border-white/5 px-6 py-5 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">

                  <Bot className="h-6 w-6 text-emerald-400" />

                </div>

                <div>

                  <h2 className="font-bold text-lg">

                    EcoMind Chat

                  </h2>

                  <p className="text-xs text-green-400">

                    AI Online
                  </p>

                </div>

              </div>

              <button
                onClick={() => {

                  setChat([
                    {
                      role: 'ai',
                      text:
                        'Chat cleared successfully 🌱',
                    },
                  ]);
                }}
                className="h-11 w-11 rounded-2xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition"
              >

                <Trash2 className="h-5 w-5 text-red-400" />

              </button>

            </div>

            {/* CHAT AREA */}

            <div className="h-[65vh] overflow-y-auto px-5 py-6 space-y-5">

              {chat.map((c, index) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className={`flex ${
                    c.role === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >

                  <div
                    className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-xl

                    ${
                      c.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                        : 'bg-[#101b28] border border-white/5 text-slate-200'
                    }
                    `}
                  >

                    <div className="flex items-center gap-2 mb-3">

                      {c.role === 'ai' ? (

                        <Bot className="h-4 w-4 text-emerald-400" />

                      ) : (

                        <User className="h-4 w-4" />

                      )}

                      <span className="text-sm font-bold">

                        {c.role === 'ai'
                          ? 'EcoMind AI'
                          : 'You'}

                      </span>

                    </div>

                    <p className="text-[15px] leading-7 whitespace-pre-wrap">

                      {c.text}

                    </p>

                  </div>

                </motion.div>
              ))}

              {loading && (

                <div className="flex justify-start">

                  <div className="bg-[#101b28] border border-white/5 px-5 py-4 rounded-3xl text-sm text-slate-300 animate-pulse">

                    🌱 EcoMind AI is thinking...

                  </div>

                </div>

              )}

              <div ref={messagesEndRef} />

            </div>

            {/* INPUT */}

            <div className="border-t border-white/5 p-4 bg-[#0b141d]">

              <div className="flex items-center gap-3">

                <input
                  type="text"
                  placeholder="Ask EcoMind AI..."
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {

                    if (e.key === 'Enter') {

                      sendMessage();
                    }
                  }}
                  className="flex-1 bg-[#111c27] border border-white/5 rounded-2xl px-5 py-4 text-sm outline-none text-white placeholder:text-slate-500 focus:border-emerald-500"
                />

                {/* MIC */}

                <button
                  className="h-14 w-14 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
                >

                  <Mic className="h-5 w-5 text-emerald-400" />

                </button>

                {/* SEND */}

                <button
                  onClick={() =>
                    sendMessage()
                  }
                  className="h-14 w-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 transition flex items-center justify-center shadow-lg"
                >

                  <Send className="h-5 w-5 text-white" />

                </button>

              </div>

            </div>

          </div>

          {/* SIDEBAR */}

          <div className="space-y-6">

            {/* QUICK QUESTIONS */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

              <h2 className="text-2xl font-black mb-5">

                Quick Questions

              </h2>

              <div className="space-y-4">

                {quickQuestions.map(
                  (q, index) => (

                    <button
                      key={index}
                      onClick={() =>
                        sendMessage(q)
                      }
                      className="w-full text-left bg-black/20 hover:bg-black/30 border border-white/5 rounded-2xl p-4 transition-all"
                    >

                      <p className="text-sm font-medium leading-relaxed">

                        {q}

                      </p>

                    </button>
                  )
                )}

              </div>

            </div>

            {/* AI STATUS */}

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 shadow-2xl">

              <div className="flex items-center gap-3 mb-5">

                <Sparkles className="h-6 w-6" />

                <h2 className="text-2xl font-black">

                  AI Features

                </h2>

              </div>

              <div className="space-y-4 text-sm">

                <div className="bg-white/10 rounded-2xl p-4">

                  🌍 Climate Change Insights
                </div>

                <div className="bg-white/10 rounded-2xl p-4">

                  ♻️ Recycling Recommendations
                </div>

                <div className="bg-white/10 rounded-2xl p-4">

                  ⚡ Renewable Energy Guidance
                </div>

                <div className="bg-white/10 rounded-2xl p-4">

                  🌱 Sustainability Education
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;