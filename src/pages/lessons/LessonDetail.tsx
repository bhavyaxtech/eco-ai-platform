import React from 'react';

import {
  useParams,
  Link,
} from 'react-router-dom';

import {
  ArrowLeft,
  BookOpen,
  Leaf,
  Award,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react';

import { motion } from 'framer-motion';

const lessons = [
  {
    id: 1,
    title:
      'Introduction to Sustainability',

    category: 'Fundamentals',

    duration: '30 mins',

    xp: 100,

    content: `
Sustainability means meeting our present needs without harming future generations.

It includes:

• Protecting nature
• Reducing pollution
• Saving resources
• Using renewable energy
• Conserving water

Sustainability helps fight climate change and protects biodiversity.
    `,

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

    content: `
Waste management is the process of collecting, recycling, and disposing waste properly.

Types of waste:

• Organic waste
• Plastic waste
• Electronic waste
• Hazardous waste

Good waste management reduces pollution and keeps cities clean.
    `,

    tips: [
      'Separate wet & dry waste',
      'Avoid single-use plastics',
      'Compost kitchen waste',
      'Recycle paper',
    ],
  },

  {
    id: 3,
    title:
      'Biodiversity Conservation',

    category: 'Advanced Topics',

    duration: '60 mins',

    xp: 200,

    content: `
Biodiversity means all living organisms on Earth.

Conservation protects:

• Forests
• Oceans
• Wildlife
• Ecosystems

Human activities threaten biodiversity through pollution and deforestation.
    `,

    tips: [
      'Protect wildlife',
      'Reduce deforestation',
      'Avoid pollution',
      'Support eco-products',
    ],
  },
];

function LessonDetail() {

  const { id } = useParams();

  const lesson = lessons.find(
    (l) => l.id === Number(id)
  );

  if (!lesson) {

    return (

      <div className="min-h-screen flex items-center justify-center text-4xl font-bold text-red-500">

        Lesson Not Found

      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* BACK BUTTON */}

      <Link
        to="/lessons"
        className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 mb-8"
      >

        <ArrowLeft className="h-5 w-5" />

        Back to Lessons

      </Link>

      {/* HERO */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-white rounded-[32px] p-10 shadow-2xl border border-gray-100"
      >

        <div className="flex flex-wrap items-center justify-between gap-6">

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="bg-green-100 p-4 rounded-2xl">

                <Leaf className="text-green-600 h-8 w-8" />

              </div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">

                {lesson.category}

              </span>

            </div>

            <h1 className="text-6xl font-black text-green-700 leading-tight">

              {lesson.title}

            </h1>

            <p className="text-gray-600 mt-5 text-xl max-w-3xl leading-relaxed">

              Learn practical sustainability concepts and build eco-friendly habits.

            </p>

          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl p-8 shadow-xl">

            <div className="flex items-center gap-3 mb-4">

              <Award className="h-7 w-7" />

              <span className="font-bold text-xl">

                XP Reward

              </span>

            </div>

            <div className="text-5xl font-black">

              +{lesson.xp}

            </div>

          </div>

        </div>

      </motion.div>

      {/* VIDEO SECTION */}

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
        className="mt-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-[32px] p-10 text-white shadow-xl"
      >

        <div className="flex items-center gap-4 mb-6">

          <PlayCircle className="h-10 w-10" />

          <h2 className="text-4xl font-black">

            Interactive Learning

          </h2>

        </div>

        <p className="text-xl leading-relaxed opacity-90">

          Future version can include AI videos, voice narration, interactive simulations, and sustainability visualizations.
        </p>

      </motion.div>

      {/* LESSON CONTENT */}

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
          delay: 0.2,
        }}
        className="mt-10 bg-white rounded-[32px] p-10 shadow-xl"
      >

        <div className="flex items-center gap-4 mb-8">

          <BookOpen className="text-green-600 h-8 w-8" />

          <h2 className="text-4xl font-black text-gray-900">

            Lesson Content

          </h2>

        </div>

        <div className="text-gray-700 text-xl leading-[2.2rem] whitespace-pre-line">

          {lesson.content}

        </div>

      </motion.div>

      {/* ECO TIPS */}

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
          delay: 0.3,
        }}
        className="mt-10 bg-green-50 rounded-[32px] p-10 border border-green-100"
      >

        <h2 className="text-4xl font-black text-green-700 mb-8">

          Eco Action Tips 🌱

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {lesson.tips.map(
            (tip, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4"
              >

                <CheckCircle2 className="text-green-500 h-7 w-7" />

                <span className="text-lg font-semibold text-gray-700">

                  {tip}

                </span>

              </div>
            )
          )}

        </div>

      </motion.div>

      {/* ACTION BUTTONS */}

      <div className="flex flex-wrap gap-6 mt-12">

        <Link
          to="/quizzes"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition"
        >

          Take Quiz

        </Link>

        <button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg transition">

          Mark Complete

        </button>

      </div>

    </div>
  );
}

export default LessonDetail;