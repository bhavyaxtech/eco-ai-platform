import React, { useState } from 'react';

import {
  useParams,
  Link,
} from 'react-router-dom';

import {
  ArrowLeft,
  Leaf,
  Award,
  CheckCircle2,
  Clock3,
  PlayCircle,
  BookOpen,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

import { motion } from 'framer-motion';

const lessons = [
  {
    id: 1,

    title: 'Introduction to Sustainability',

    category: 'Fundamentals',

    duration: '30 mins',

    xp: 100,

    sections: [
      {
        title: 'What is Sustainability?',
        content:
          'Sustainability means meeting present needs without harming future generations while protecting nature and resources.',
      },

      {
        title: 'Why It Matters',
        content:
          'Sustainability reduces pollution, saves resources, and creates a healthier future for everyone.',
      },

      {
        title: 'Key Areas',
        content:
          'Renewable energy, recycling, biodiversity, conservation, and eco-friendly living are major sustainability areas.',
      },
    ],

    tips: [
      'Use reusable bottles',
      'Save electricity',
      'Recycle waste',
      'Plant trees',
    ],
  },

  {
    id: 2,

    title: 'Waste Management',

    category: 'Practical Skills',

    duration: '45 mins',

    xp: 150,

    sections: [
      {
        title: 'Understanding Waste',
        content:
          'Waste includes plastic, food, paper, electronic, and industrial waste generated daily.',
      },

      {
        title: 'Recycling Importance',
        content:
          'Recycling reduces landfill waste, saves energy, and protects natural resources.',
      },

      {
        title: 'Smart Waste Solutions',
        content:
          'Modern systems use composting, smart bins, recycling plants, and AI sorting systems.',
      },
    ],

    tips: [
      'Separate wet & dry waste',
      'Avoid single-use plastic',
      'Reuse old products',
      'Compost kitchen waste',
    ],
  },

  {
    id: 3,

    title: 'Biodiversity Conservation',

    category: 'Advanced Topics',

    duration: '60 mins',

    xp: 200,

    sections: [
      {
        title: 'What is Biodiversity?',
        content:
          'Biodiversity includes all living organisms such as plants, animals, forests, and ecosystems.',
      },

      {
        title: 'Threats to Nature',
        content:
          'Deforestation, climate change, pollution, and habitat destruction threaten biodiversity.',
      },

      {
        title: 'Conservation Methods',
        content:
          'Protected forests, wildlife reserves, clean energy, and sustainable farming help conservation.',
      },
    ],

    tips: [
      'Protect forests',
      'Reduce pollution',
      'Support eco-products',
      'Save wildlife habitats',
    ],
  },
];

function LessonDetail() {

  const { id } = useParams();

  const lesson = lessons.find(
    (l) => l.id === Number(id)
  );

  const [completed, setCompleted] =
    useState<number[]>([]);

  if (!lesson) {

    return (

      <div className="min-h-screen bg-[#07111f] flex items-center justify-center text-red-500 text-2xl font-bold">

        Lesson Not Found

      </div>
    );
  }

  const progress =
    (completed.length /
      lesson.sections.length) *
    100;

  return (

    <div className="min-h-screen bg-[#07111f] text-white px-4 md:px-6 py-6">

      <div className="max-w-7xl mx-auto">

        {/* BACK */}

        <Link
          to="/lessons"
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-5 text-sm"
        >

          <ArrowLeft className="h-4 w-4" />

          Back to Lessons

        </Link>

        {/* GRID */}

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">

          {/* LEFT SIDE */}

          <div>

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
              className="bg-[#0d1721] border border-white/5 rounded-3xl p-5 md:p-7"
            >

              {/* TAGS */}

              <div className="flex flex-wrap gap-3 mb-4">

                <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-2">

                  <Leaf className="h-4 w-4" />

                  {lesson.category}

                </div>

                <div className="bg-white/5 px-3 py-1 rounded-xl text-xs text-gray-300 flex items-center gap-2">

                  <Clock3 className="h-4 w-4" />

                  {lesson.duration}

                </div>

              </div>

              {/* TITLE */}

              <h1 className="text-2xl md:text-3xl font-black leading-tight mb-3">

                {lesson.title}

              </h1>

              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">

                Learn sustainability concepts and eco-friendly habits through modern interactive lessons.

              </p>

              {/* PROGRESS */}

              <div className="mt-5">

                <div className="flex items-center justify-between mb-2">

                  <span className="text-xs text-gray-400">

                    Progress

                  </span>

                  <span className="text-xs font-bold text-green-400">

                    {Math.round(progress)}%

                  </span>

                </div>

                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

            </motion.div>

            {/* INTERACTIVE */}

            <div className="mt-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-5">

              <div className="flex items-center gap-3 mb-3">

                <PlayCircle className="h-7 w-7" />

                <h2 className="text-xl font-black">

                  Interactive Learning

                </h2>

              </div>

              <p className="text-sm text-green-50 leading-relaxed">

                AI-powered sustainability education with simulations, voice narration, and real-world examples.

              </p>

            </div>

            {/* SECTIONS */}

            <div className="mt-5 space-y-4">

              {lesson.sections.map(
                (section, index) => {

                  const done =
                    completed.includes(index);

                  return (

                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="bg-[#0d1721] border border-white/5 rounded-3xl p-5"
                    >

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                        <div className="flex-1">

                          <div className="flex items-center gap-3 mb-3">

                            <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center">

                              <BookOpen className="text-green-400 h-5 w-5" />

                            </div>

                            <h2 className="text-lg font-bold">

                              {section.title}

                            </h2>

                          </div>

                          <p className="text-gray-300 text-sm leading-7">

                            {section.content}

                          </p>

                        </div>

                        <button
                          onClick={() => {

                            if (!done) {

                              setCompleted([
                                ...completed,
                                index,
                              ]);
                            }
                          }}
                          className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all

                          ${
                            done
                              ? 'bg-green-500 text-white'
                              : 'bg-white/10 hover:bg-white/20'
                          }
                          `}
                        >

                          {done
                            ? 'Completed'
                            : 'Mark Done'}

                        </button>

                      </div>

                    </motion.div>
                  );
                }
              )}

            </div>

            {/* ECO TIPS */}

            <div className="mt-5 bg-[#0d1721] border border-white/5 rounded-3xl p-5">

              <div className="flex items-center gap-3 mb-5">

                <Sparkles className="text-green-400 h-5 w-5" />

                <h2 className="text-xl font-black">

                  Eco Action Tips

                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-3">

                {lesson.tips.map(
                  (tip, index) => (

                    <div
                      key={index}
                      className="bg-black/20 rounded-2xl p-4 flex items-center gap-3"
                    >

                      <CheckCircle2 className="text-green-400 h-5 w-5" />

                      <span className="text-sm text-gray-200">

                        {tip}

                      </span>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

          {/* SIDEBAR */}

          <div>

            <div className="sticky top-24 bg-[#0d1721] border border-white/5 rounded-3xl p-5">

              <h2 className="text-xl font-black mb-4">

                Overview

              </h2>

              {/* XP */}

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 mb-5">

                <div className="flex items-center gap-2 mb-2">

                  <Award className="h-5 w-5" />

                  <span className="text-sm font-bold">

                    XP Reward

                  </span>

                </div>

                <h2 className="text-3xl font-black">

                  +{lesson.xp}

                </h2>

              </div>

              {/* CHAPTERS */}

              <div className="space-y-3">

                {lesson.sections.map(
                  (section, index) => (

                    <div
                      key={index}
                      className="bg-black/20 rounded-2xl p-4 border border-white/5 hover:border-green-500/30 transition-all"
                    >

                      <div className="flex items-center justify-between">

                        <p className="text-sm font-semibold">

                          {section.title}

                        </p>

                        <ChevronRight className="h-4 w-4 text-gray-500" />

                      </div>

                    </div>
                  )
                )}

              </div>

              {/* QUIZ BUTTON */}

              <Link
                to="/quizzes"
                className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl text-sm font-bold flex items-center justify-center"
              >

                Take Quiz

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LessonDetail;