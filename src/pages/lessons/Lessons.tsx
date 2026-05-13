import React from 'react';

import {
  BookOpen,
  Clock,
  Tag,
  ArrowRight,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

const lessons = [
  {
    id: 1,
    title: 'Introduction to Sustainability',
    description:
      'Learn the core concepts of sustainability and environmental protection.',
    category: 'Fundamentals',
    duration: '30 mins',
    level: 'Beginner',
    color: 'from-green-500 to-emerald-600',
  },

  {
    id: 2,
    title: 'Waste Management',
    description:
      'Understand recycling, waste reduction, and smart disposal practices.',
    category: 'Practical Skills',
    duration: '45 mins',
    level: 'Intermediate',
    color: 'from-blue-500 to-cyan-600',
  },

  {
    id: 3,
    title: 'Biodiversity Conservation',
    description:
      'Explore ecosystems, wildlife conservation, and biodiversity protection.',
    category: 'Advanced Topics',
    duration: '60 mins',
    level: 'Advanced',
    color: 'from-purple-500 to-pink-600',
  },
];

function Lessons() {

  const navigate = useNavigate();

  const openLesson = (id: number) => {
    navigate(`/lesson/${id}`);
  };

  return (

    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-[#f4fff7] to-[#ecfff4]">

      {/* HEADER */}

      <div className="text-center mb-14">

        <h1 className="text-5xl font-black text-slate-900 mb-4">
          Eco Learning Hub
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Interactive environmental lessons designed to help students
          build sustainable habits and protect our planet.
        </p>

      </div>

      {/* LESSON CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {lessons.map((lesson) => (

          <motion.div
            key={lesson.id}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-green-100"
          >

            {/* TOP */}

            <div className={`bg-gradient-to-r ${lesson.color} p-6 text-white`}>

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-5">

                <BookOpen className="h-8 w-8" />

              </div>

              <h2 className="text-2xl font-black mb-2">
                {lesson.title}
              </h2>

              <p className="text-white/90 text-sm leading-relaxed">
                {lesson.description}
              </p>

            </div>

            {/* CONTENT */}

            <div className="p-6">

              <div className="space-y-4">

                <div className="flex items-center gap-3 text-gray-700">

                  <Tag className="h-5 w-5 text-green-600" />

                  <span>{lesson.category}</span>

                </div>

                <div className="flex items-center gap-3 text-gray-700">

                  <Clock className="h-5 w-5 text-green-600" />

                  <span>{lesson.duration}</span>

                </div>

                <div className="flex items-center gap-3 text-gray-700">

                  <BookOpen className="h-5 w-5 text-green-600" />

                  <span>{lesson.level}</span>

                </div>

              </div>

              {/* BUTTON */}

              <button
                onClick={() => openLesson(lesson.id)}
                className="mt-8 w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              >

                Start Learning

                <ArrowRight className="h-5 w-5" />

              </button>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}

export default Lessons;