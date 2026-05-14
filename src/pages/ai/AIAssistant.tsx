
import React, { useState } from 'react';

import axios from 'axios';

import {
  Bot,
  Send,
  User,
  Sparkles,
} from 'lucide-react';

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
          '🌱 Hello! I am EcoMind AI. Ask me anything about sustainability, climate change, recycling, renewable energy, or eco-friendly living.',
      },
    ]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const updatedChat = [
      ...chat,
      {
        role: 'user' as const,
        text: message,
      },
    ];

    setChat(updatedChat);

    setLoading(true);

    try {

      const res = await axios.post(
        'http://127.0.0.1:5000/api/ai/ask',
        {
          question: message,
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
            '❌ AI failed to respond.',
        },
      ]);
    }

    setMessage('');

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center gap-4 mb-8">

          <div className="bg-green-500 p-4 rounded-2xl shadow-lg">

            <Sparkles className="h-8 w-8" />

          </div>

          <div>

            <h1 className="text-5xl font-black">

              EcoMind AI

            </h1>

            <p className="text-gray-400 text-lg mt-1">

              Your AI Sustainability Assistant 🌍

            </p>

          </div>

        </div>

        {/* CHAT CONTAINER */}

        <div className="bg-[#111827] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]">

          {/* CHAT AREA */}

          <div className="h-[600px] overflow-y-auto p-8 space-y-6">

            {chat.map((c, index) => (

              <div
                key={index}
                className={`flex ${
                  c.role === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >

                <div
                  className={`max-w-[75%] rounded-3xl px-6 py-5 shadow-lg

                  ${
                    c.role === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 border border-white/10 text-gray-200'
                  }
                  `}
                >

                  <div className="flex items-center gap-2 mb-3">

                    {c.role === 'ai' ? (

                      <Bot className="h-5 w-5 text-green-400" />

                    ) : (

                      <User className="h-5 w-5" />

                    )}

                    <span className="font-bold">

                      {c.role === 'ai'
                        ? 'EcoMind AI'
                        : 'You'}

                    </span>

                  </div>

                  <p className="leading-relaxed whitespace-pre-wrap">

                    {c.text}

                  </p>

                </div>

              </div>
            ))}

            {loading && (

              <div className="flex justify-start">

                <div className="bg-white/10 border border-white/10 px-6 py-5 rounded-3xl">

                  🤖 AI is thinking...

                </div>

              </div>

            )}

          </div>

          {/* INPUT AREA */}

          <div className="border-t border-white/10 p-5 bg-black/20">

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Ask EcoMind AI anything..."
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (e.key === 'Enter') {

                    sendMessage();
                  }
                }}
                className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none text-white placeholder:text-gray-400 focus:border-green-400"
              />

              <button
                onClick={sendMessage}
                className="bg-green-500 hover:bg-green-600 px-6 rounded-2xl font-bold transition-all duration-300"
              >

                <Send />

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;

