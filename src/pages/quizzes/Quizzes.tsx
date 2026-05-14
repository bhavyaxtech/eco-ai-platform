import React, { useState } from 'react';

import {
  Award,
  Clock,
  BarChart3,
  Leaf,
  Trophy,
  Flame,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../lib/store';

const quizzes = [
  {
    id: 1,
    title: 'Climate Change Basics',
    description:
      'Understand climate change fundamentals and global warming.',
    difficulty: 'Beginner',
    timeEstimate: '10 mins',
    points: 100,
    color: 'from-green-500 to-emerald-600',
  },

  {
    id: 2,
    title: 'Renewable Energy',
    description:
      'Learn sustainable energy systems and clean technologies.',
    difficulty: 'Intermediate',
    timeEstimate: '15 mins',
    points: 150,
    color: 'from-cyan-500 to-blue-600',
  },

  {
    id: 3,
    title: 'Ocean Conservation',
    description:
      'Protect marine ecosystems and biodiversity.',
    difficulty: 'Advanced',
    timeEstimate: '20 mins',
    points: 200,
    color: 'from-purple-500 to-indigo-600',
  },
];

const ecoChallenges = [
  'Use a reusable water bottle',
  'Switch off unused lights',
  'Plant a small tree or plant',
  'Avoid plastic bags today',
];

function Quizzes() {

  const navigate = useNavigate();

  const { addPoints, user } =
    useAuthStore();

  const [completed, setCompleted] =
    useState<number[]>([]);

  const completeChallenge = (
    index: number
  ) => {

    if (!completed.includes(index)) {

      setCompleted([
        ...completed,
        index,
      ]);

      addPoints(50);
    }
  };

  const startQuiz = (
    id: number
  ) => {

    navigate(`/quiz-game/${id}`);
  };

  return (

    <div className="min-h-screen bg-[#071018] text-white px-4 md:px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-2 rounded-full mb-5">

            <Sparkles className="h-4 w-4" />

            AI Learning Missions

          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight">

            Eco Quizzes

            <span className="text-green-400">
              {' '}
              & Missions
            </span>

          </h1>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">

            Complete sustainability challenges, earn XP,
            and improve your environmental knowledge.

          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-5 mb-12">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-400 text-sm">

                  Total Points

                </p>

                <h2 className="text-4xl font-black text-green-400 mt-2">

                  {user?.points || 0}

                </h2>

              </div>

              <Trophy className="h-10 w-10 text-yellow-400" />

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-400 text-sm">

                  Challenges

                </p>

                <h2 className="text-4xl font-black text-cyan-400 mt-2">

                  {completed.length}

                </h2>

              </div>

              <CheckCircle2 className="h-10 w-10 text-cyan-400" />

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-400 text-sm">

                  Quiz Sets

                </p>

                <h2 className="text-4xl font-black text-purple-400 mt-2">

                  {quizzes.length}

                </h2>

              </div>

              <BarChart3 className="h-10 w-10 text-purple-400" />

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-400 text-sm">

                  Eco Streak

                </p>

                <h2 className="text-4xl font-black text-orange-400 mt-2">

                  7

                </h2>

              </div>

              <Flame className="h-10 w-10 text-orange-400" />

            </div>

          </div>

        </div>

        {/* DAILY CHALLENGES */}

        <section className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/10 rounded-[32px] p-8 mb-14">

          <div className="flex items-center gap-3 mb-8">

            <div className="bg-green-500/20 p-4 rounded-2xl">

              <Leaf className="text-green-400 h-7 w-7" />

            </div>

            <div>

              <h2 className="text-3xl font-black">

                Daily Eco Challenges

              </h2>

              <p className="text-gray-400 mt-1">

                Complete actions and earn eco XP.

              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {ecoChallenges.map(
              (
                challenge,
                index
              ) => (

                <motion.div
                  key={index}
                  whileHover={{
                    y: -4,
                  }}
                  className="bg-[#111827] border border-white/10 rounded-3xl p-6 flex items-center justify-between"
                >

                  <div>

                    <h3 className="text-lg font-bold">

                      {challenge}

                    </h3>

                    <p className="text-gray-400 text-sm mt-2">

                      Reward:
                      {' '}
                      +50 XP

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      completeChallenge(
                        index
                      )
                    }
                    disabled={completed.includes(
                      index
                    )}
                    className={`px-5 py-3 rounded-2xl font-bold transition-all

                    ${
                      completed.includes(
                        index
                      )
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10 hover:bg-green-500 text-white'
                    }
                    `}
                  >

                    {completed.includes(
                      index
                    )
                      ? 'Completed'
                      : 'Complete'}

                  </button>

                </motion.div>
              )
            )}

          </div>

        </section>

        {/* QUIZZES */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-4xl font-black">

              Sustainability Quizzes

            </h2>

            <p className="text-gray-400 mt-2">

              Interactive AI-powered learning modules.

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {quizzes.map(
            (quiz) => (

              <motion.div
                key={quiz.id}
                whileHover={{
                  y: -8,
                }}
                className="bg-[#111827] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
              >

                {/* TOP */}

                <div
                  className={`h-40 bg-gradient-to-br ${quiz.color} p-6 flex flex-col justify-between`}
                >

                  <div className="flex justify-between items-start">

                    <div className="bg-white/20 backdrop-blur-xl p-3 rounded-2xl">

                      <Award className="h-6 w-6 text-white" />

                    </div>

                    <div className="bg-black/20 px-3 py-1 rounded-xl text-sm font-semibold">

                      {quiz.difficulty}

                    </div>

                  </div>

                  <div>

                    <h2 className="text-2xl font-black">

                      {quiz.title}

                    </h2>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <p className="text-gray-400 leading-relaxed">

                    {quiz.description}

                  </p>

                  <div className="space-y-3 mt-6">

                    <div className="flex items-center gap-3 text-sm text-gray-300">

                      <Clock className="h-4 w-4 text-green-400" />

                      {quiz.timeEstimate}

                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-300">

                      <BarChart3 className="h-4 w-4 text-green-400" />

                      {quiz.points} XP Reward

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      startQuiz(
                        quiz.id
                      )
                    }
                    className="mt-8 w-full bg-green-500 hover:bg-green-600 transition-all py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
                  >

                    Start Quiz

                    <ArrowRight className="h-5 w-5" />

                  </button>

                </div>

              </motion.div>
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Quizzes;