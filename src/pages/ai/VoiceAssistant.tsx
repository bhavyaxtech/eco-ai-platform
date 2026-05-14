import React, { useState } from 'react';

import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Bot,
  User,
  Globe2,
  AudioLines,
} from 'lucide-react';

import { motion } from 'framer-motion';

function VoiceAssistant() {

  const [listening, setListening] =
    useState(false);

  const [question, setQuestion] =
    useState('');

  const [answer, setAnswer] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [history, setHistory] =
    useState<
      {
        question: string;
        answer: string;
      }[]
    >([]);

  const startListening = () => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any)
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        'Speech Recognition is not supported in this browser.'
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = 'en-US';

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.start();

    setListening(true);

    recognition.onresult = async (
      event: any
    ) => {

      const transcript =
        event.results[0][0].transcript;

      setQuestion(transcript);

      setListening(false);

      askAI(transcript);
    };

    recognition.onerror = () => {

      setListening(false);
    };

    recognition.onend = () => {

      setListening(false);
    };
  };

  const speakAnswer = (
    text: string
  ) => {

    const speech =
      new SpeechSynthesisUtterance(
        text
      );

    speech.lang = 'en-US';

    speech.rate = 1;

    speech.pitch = 1;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
      speech
    );
  };

  const askAI = async (
    q: string
  ) => {

    try {

      setLoading(true);

      const response = await fetch(
        'http://localhost:5000/api/ai/ask',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            question: `
            You are EcoMind AI Assistant.

            Answer professionally and clearly.

            User Question:
            ${q}

            Give:
            - Explanation
            - Sustainability impact
            - Practical eco-friendly suggestions
            `,
          }),
        }
      );

      const data =
        await response.json();

      setAnswer(data.answer);

      speakAnswer(data.answer);

      setHistory((prev) => [
        {
          question: q,
          answer: data.answer,
        },
        ...prev,
      ]);

    } catch (error) {

      console.log(error);

      setAnswer(
        'AI failed to respond.'
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#071018] text-white px-4 py-10">

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
          className="bg-gradient-to-br from-[#0b1725] to-[#111827] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl"
        >

          {/* TOP */}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="h-20 w-20 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">

                <Sparkles className="h-9 w-9 text-white" />

              </div>

              <div>

                <h1 className="text-4xl md:text-5xl font-black leading-tight">

                  EcoMind AI

                </h1>

                <p className="text-gray-400 mt-2 text-base md:text-lg">

                  AI Voice Sustainability Assistant

                </p>

              </div>

            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl px-5 py-4 flex items-center gap-3">

              <Globe2 className="text-green-400 h-6 w-6" />

              <div>

                <p className="text-sm text-gray-400">

                  AI Status

                </p>

                <p className="font-bold text-green-400">

                  Online & Ready

                </p>

              </div>

            </div>

          </div>

          {/* INFO */}

          <div className="mt-10 grid md:grid-cols-3 gap-5">

            <div className="bg-white/5 border border-white/5 rounded-3xl p-6">

              <AudioLines className="text-green-400 h-8 w-8 mb-4" />

              <h3 className="text-xl font-bold mb-2">

                Voice Recognition

              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">

                Speak naturally and EcoMind AI will understand your sustainability questions.

              </p>

            </div>

            <div className="bg-white/5 border border-white/5 rounded-3xl p-6">

              <Bot className="text-blue-400 h-8 w-8 mb-4" />

              <h3 className="text-xl font-bold mb-2">

                Smart AI Answers

              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">

                Receive detailed AI-generated environmental insights and eco solutions.

              </p>

            </div>

            <div className="bg-white/5 border border-white/5 rounded-3xl p-6">

              <Volume2 className="text-purple-400 h-8 w-8 mb-4" />

              <h3 className="text-xl font-bold mb-2">

                AI Voice Reply

              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">

                EcoMind AI speaks responses aloud for a fully interactive experience.

              </p>

            </div>

          </div>

        </motion.div>

        {/* VOICE BUTTON */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="mt-8 bg-[#0d1721] border border-white/10 rounded-[32px] p-10 text-center"
        >

          <div className="flex justify-center">

            <button
              onClick={startListening}
              className={`h-32 w-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl

              ${
                listening
                  ? 'bg-red-500 animate-pulse scale-110'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105'
              }
              `}
            >

              {listening ? (

                <MicOff className="h-14 w-14 text-white" />

              ) : (

                <Mic className="h-14 w-14 text-white" />

              )}

            </button>

          </div>

          <h2 className="text-3xl font-black mt-8">

            {listening
              ? 'Listening...'
              : 'Start Voice Assistant'}

          </h2>

          <p className="text-gray-400 mt-3 text-lg">

            Ask anything about sustainability, climate change, recycling, renewable energy, or eco-friendly living.

          </p>

        </motion.div>

        {/* LOADING */}

        {loading && (

          <div className="mt-8 bg-[#111827] border border-white/10 rounded-3xl p-8 text-center">

            <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-green-400 mx-auto mb-5"></div>

            <h2 className="text-2xl font-bold text-green-400">

              EcoMind AI is thinking...

            </h2>

          </div>

        )}

        {/* CURRENT QUESTION */}

        {question && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8 bg-[#111827] border border-white/10 rounded-[32px] p-8"
          >

            <div className="flex items-center gap-3 mb-5">

              <User className="text-green-400 h-7 w-7" />

              <h2 className="text-2xl font-black">

                Your Question

              </h2>

            </div>

            <p className="text-lg text-gray-200 leading-relaxed">

              {question}

            </p>

          </motion.div>

        )}

        {/* AI ANSWER */}

        {answer && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8 bg-[#111827] border border-white/10 rounded-[32px] p-8"
          >

            <div className="flex items-center gap-3 mb-6">

              <Bot className="text-blue-400 h-7 w-7" />

              <h2 className="text-3xl font-black">

                AI Response

              </h2>

            </div>

            <div className="bg-black/20 rounded-3xl p-6 border border-white/5">

              <p className="text-gray-300 leading-8 whitespace-pre-wrap text-[16px]">

                {answer}

              </p>

            </div>

            <button
              onClick={() =>
                speakAnswer(answer)
              }
              className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all"
            >

              <Volume2 className="h-5 w-5" />

              Listen Again

            </button>

          </motion.div>

        )}

        {/* HISTORY */}

        {history.length > 0 && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-10"
          >

            <h2 className="text-3xl font-black mb-6">

              Recent Conversations

            </h2>

            <div className="space-y-5">

              {history.map(
                (item, index) => (

                  <div
                    key={index}
                    className="bg-[#0d1721] border border-white/10 rounded-3xl p-6"
                  >

                    <div className="flex items-center gap-3 mb-4">

                      <User className="text-green-400 h-5 w-5" />

                      <h3 className="font-bold text-lg">

                        {item.question}

                      </h3>

                    </div>

                    <div className="bg-black/20 rounded-2xl p-5 border border-white/5">

                      <div className="flex items-center gap-3 mb-3">

                        <Bot className="text-blue-400 h-5 w-5" />

                        <span className="font-bold">

                          EcoMind AI

                        </span>

                      </div>

                      <p className="text-gray-300 leading-7 whitespace-pre-wrap">

                        {item.answer}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          </motion.div>

        )}

      </div>

    </div>
  );
}

export default VoiceAssistant;