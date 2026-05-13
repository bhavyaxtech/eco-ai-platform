import React, { useState } from 'react';

import axios from 'axios';

import {
  Bot,
  Send,
  Sparkles,
} from 'lucide-react';

import { motion } from 'framer-motion';

function AIAssistant() {

  const [question, setQuestion] = useState('');

  const [messages, setMessages] = useState<any[]>([
    {
      type: 'ai',
      text:
        'Hello 👋 I am your Eco AI Assistant. Ask me anything about sustainability.',
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {

    if (!question.trim()) return;

    const userMessage = {
      type: 'user',
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const response = await axios.post(
        'http://localhost:5000/api/ai/ask',
        {
          question,
        }
      );

      const aiMessage = {
        type: 'ai',
        text: response.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          type: 'ai',
          text:
            'Server error. Make sure backend is running.',
        },
      ]);
    }

    setQuestion('');

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-[#f7faf8] px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-4 rounded-2xl">

              <Bot className="h-10 w-10" />

            </div>

            <div>

              <h1 className="text-4xl font-black">
                Eco AI Assistant
              </h1>

              <p className="text-green-100 mt-2 text-lg">
                Smart sustainability assistant powered by AI
              </p>

            </div>

          </div>

        </div>

        {/* CHAT */}

        <div className="bg-white rounded-3xl shadow-xl mt-8 overflow-hidden border border-slate-200">

          {/* CHAT AREA */}

          <div className="h-[520px] overflow-y-auto p-8 space-y-6 bg-[#f8faf9]">

            {messages.map((msg, index) => (

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
                  msg.type === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >

                <div
                  className={`max-w-[75%] px-6 py-4 rounded-3xl text-[16px] leading-relaxed shadow-md ${
                    msg.type === 'user'
                      ? 'bg-green-600 text-white rounded-br-md'
                      : 'bg-white text-slate-700 rounded-bl-md border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>

              </motion.div>

            ))}

            {loading && (

              <div className="flex items-center gap-3 text-green-600">

                <Sparkles className="animate-spin" />

                AI is thinking...

              </div>

            )}

          </div>

          {/* INPUT */}

          <div className="border-t border-slate-200 p-5 flex items-center gap-4 bg-white">

            <input
              type="text"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              placeholder="Ask about sustainability..."
              className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={handleAsk}
              className="bg-green-600 hover:bg-green-700 text-white h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg"
            >

              <Send className="h-5 w-5" />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;