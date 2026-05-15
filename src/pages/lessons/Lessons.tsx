import React, { useState } from 'react';

import {
  BookOpen,
  Clock3,
  ArrowRight,
  Search,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

const lessons = [
  {
    id: 1,
    title: 'Introduction to Sustainability',
    description:
      'Core sustainability concepts and environmental awareness.',
    category: 'Beginner',
    duration: '30 min',
    color: 'bg-emerald-500',
  },

  {
    id: 2,
    title: 'Waste Management',
    description:
      'Learn recycling, waste reduction, and smart disposal.',
    category: 'Intermediate',
    duration: '45 min',
    color: 'bg-cyan-500',
  },

  {
    id: 3,
    title: 'Biodiversity Conservation',
    description:
      'Understand ecosystems and biodiversity protection.',
    category: 'Advanced',
    duration: '60 min',
    color: 'bg-violet-500',
  },
];

function Lessons() {

  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-[#071018] text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <p className="text-emerald-400 text-sm font-semibold mb-2">

              Learning Platform

            </p>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">

              Eco Learning Hub

            </h1>

            <p className="text-gray-400 mt-3 max-w-2xl text-sm md:text-base">

              Explore interactive sustainability lessons designed for modern environmental education.

            </p>

          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-[320px]">

            <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search lessons..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-400 transition-all"
            />

          </div>

        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap gap-3 mb-10">

          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((item) => (

            <button
              key={item}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500 hover:border-emerald-500 transition-all text-sm"
            >

              {item}

            </button>

          ))}

        </div>

        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredLessons.map((lesson) => (

            <motion.div
              key={lesson.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0d1721] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all"
            >

              {/* TOP */}

              <div className="p-6">

                <div className={`w-12 h-12 rounded-2xl ${lesson.color} flex items-center justify-center mb-5`}>

                  <BookOpen className="h-5 w-5 text-white" />

                </div>

                <div className="flex items-center justify-between mb-4">

                  <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">

                    {lesson.category}

                  </span>

                  <div className="flex items-center gap-1 text-gray-400 text-sm">

                    <Clock3 className="h-4 w-4" />

                    {lesson.duration}

                  </div>

                </div>

                <h2 className="text-xl font-semibold mb-3 leading-snug">

                  {lesson.title}

                </h2>

                <p className="text-gray-400 text-sm leading-relaxed">

                  {lesson.description}

                </p>

              </div>

              {/* FOOTER */}

              <div className="px-6 pb-6 pt-2">

                <button
                  onClick={() =>
                    navigate(`/lesson/${lesson.id}`)
                  }
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-all"
                >

                  Open Lesson

                  <ArrowRight className="h-4 w-4" />

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Lessons;