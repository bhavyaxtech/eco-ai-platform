import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

import axios from 'axios';

import {
  Bot,
  Send,
  User,
  Sparkles,
  Trash2,
  Plus,
  MessageSquare,
} from 'lucide-react';

import { motion } from 'framer-motion';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

interface SavedChat {
  id: number;
  title: string;
  messages: ChatMessage[];
}

function AIAssistant() {

  const starterMessage: ChatMessage[] = [
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
  ];

  const [message, setMessage] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [chat, setChat] =
    useState<ChatMessage[]>(starterMessage);

  const [savedChats, setSavedChats] =
    useState<SavedChat[]>([]);

  const [activeChatId, setActiveChatId] =
    useState<number | null>(null);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  /* =========================
     AUTO SCROLL
  ========================= */

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });

  }, [chat]);

  /* =========================
     LOAD SAVED CHATS
  ========================= */

  useEffect(() => {

    const storedChats =
      localStorage.getItem('eco_ai_chats');

    if (storedChats) {

      const parsedChats =
        JSON.parse(storedChats);

      setSavedChats(parsedChats);

      if (parsedChats.length > 0) {

        setChat(parsedChats[0].messages);

        setActiveChatId(parsedChats[0].id);
      }
    }

  }, []);

  /* =========================
     SAVE TO LOCAL STORAGE
  ========================= */

  useEffect(() => {

    localStorage.setItem(
      'eco_ai_chats',
      JSON.stringify(savedChats)
    );

  }, [savedChats]);

  /* =========================
     CREATE NEW CHAT
  ========================= */

  const createNewChat = () => {

    setChat(starterMessage);

    setActiveChatId(null);
  };

  /* =========================
     SAVE CURRENT CHAT
  ========================= */

  const saveCurrentChat = (
    updatedMessages: ChatMessage[]
  ) => {

    const title =
      updatedMessages[1]?.text?.slice(0, 30) ||
      'New Chat';

    if (activeChatId) {

      const updatedChats =
        savedChats.map((chatItem) =>
          chatItem.id === activeChatId
            ? {
                ...chatItem,
                messages: updatedMessages,
              }
            : chatItem
        );

      setSavedChats(updatedChats);

    } else {

      const newChat = {

        id: Date.now(),

        title,

        messages: updatedMessages,
      };

      const updatedChats = [
        newChat,
        ...savedChats,
      ];

      setSavedChats(updatedChats);

      setActiveChatId(newChat.id);
    }
  };

  /* =========================
     LOAD CHAT
  ========================= */

  const loadChat = (
    selectedChat: SavedChat
  ) => {

    setChat(selectedChat.messages);

    setActiveChatId(selectedChat.id);
  };

  /* =========================
     DELETE CHAT
  ========================= */

  const deleteChat = (id: number) => {

    const updatedChats =
      savedChats.filter(
        (chatItem) => chatItem.id !== id
      );

    setSavedChats(updatedChats);

    if (activeChatId === id) {

      createNewChat();
    }
  };

  /* =========================
     SEND MESSAGE
  ========================= */

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

    setMessage('');

    setLoading(true);

    try {

      const res = await axios.post(
  'https://eco-ai-backend.onrender.com/api/ai/ask',
        {
          question: finalMessage,
          userId: 'demo-user',
        }
      );

      const finalChat = [
        ...updatedChat,
        {
          role: 'ai' as const,
          text: res.data.answer,
        },
      ];

      setChat(finalChat);

      saveCurrentChat(finalChat);

    } catch (error) {

      console.log(error);

      const errorChat = [
        ...updatedChat,
        {
          role: 'ai' as const,
          text:
            '⚠️ AI failed to respond.',
        },
      ];

      setChat(errorChat);

      saveCurrentChat(errorChat);
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-[#07111f] text-white flex">

      {/* SIDEBAR */}

      <div className="w-[320px] bg-[#0b141d] border-r border-white/10 p-5 hidden lg:flex flex-col">

        <button
          onClick={createNewChat}
          className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-2xl py-4 flex items-center justify-center gap-2 font-bold mb-6"
        >

          <Plus className="h-5 w-5" />

          New Chat

        </button>

        <div className="flex-1 overflow-y-auto space-y-3">

          {savedChats.map((c) => (

            <div
              key={c.id}
              className={`group rounded-2xl p-4 cursor-pointer transition

              ${
                activeChatId === c.id
                  ? 'bg-emerald-500/20'
                  : 'bg-white/5 hover:bg-white/10'
              }
              `}
            >

              <div className="flex items-start justify-between gap-3">

                <div
                  onClick={() => loadChat(c)}
                  className="flex items-start gap-3 flex-1"
                >

                  <MessageSquare className="h-5 w-5 mt-1 text-emerald-400" />

                  <p className="text-sm line-clamp-2">

                    {c.title}

                  </p>

                </div>

                <button
                  onClick={() => deleteChat(c.id)}
                >

                  <Trash2 className="h-4 w-4 text-red-400" />

                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* MAIN */}

      <div className="flex-1 px-4 py-6">

        <div className="max-w-6xl mx-auto">

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
            className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-[32px] p-6 mb-6"
          >

            <div className="flex items-center gap-4">

              <div className="h-16 w-16 rounded-3xl bg-white/15 flex items-center justify-center">

                <Sparkles className="h-8 w-8 text-white" />

              </div>

              <div>

                <h1 className="text-4xl font-black">

                  EcoMind AI

                </h1>

                <p className="text-green-100 mt-2">

                  Sustainability Assistant 🌱

                </p>

              </div>

            </div>

          </motion.div>

          {/* CHAT */}

          <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">

            {/* CHAT AREA */}

            <div className="h-[70vh] overflow-y-auto px-5 py-6 space-y-5">

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
                    className={`max-w-[85%] rounded-3xl px-5 py-4

                    ${
                      c.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                        : 'bg-[#101b28]'
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

                    <p className="leading-7 whitespace-pre-wrap">

                      {c.text}

                    </p>

                  </div>

                </div>
              ))}

              {loading && (

                <div className="bg-[#101b28] px-5 py-4 rounded-3xl w-fit">

                  🌱 EcoMind AI is thinking...

                </div>

              )}

              <div ref={messagesEndRef} />

            </div>

            {/* INPUT */}

            <div className="border-t border-white/10 p-4 bg-[#0b141d]">

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
                  className="flex-1 bg-[#111c27] rounded-2xl px-5 py-4 outline-none"
                />

                <button
                  onClick={() => sendMessage()}
                  className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center"
                >

                  <Send className="h-5 w-5 text-white" />

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;