import React, { useState } from 'react';

import {
  Award,
  Clock,
  BarChart,
  Leaf,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../lib/store';

const quizzes = [
  {
    id: 1,
    title: 'Climate Change Basics',
    description: 'Understand climate change fundamentals',
    difficulty: 'Beginner',
    timeEstimate: '10 mins',
    points: 100,
  },

  {
    id: 2,
    title: 'Renewable Energy',
    description: 'Learn sustainable energy systems',
    difficulty: 'Intermediate',
    timeEstimate: '15 mins',
    points: 150,
  },

  {
    id: 3,
    title: 'Ocean Conservation',
    description: 'Protect marine ecosystems',
    difficulty: 'Advanced',
    timeEstimate: '20 mins',
    points: 200,
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

  const { addPoints } = useAuthStore();

  const [completed, setCompleted] = useState<number[]>([]);

  const completeChallenge = (index: number) => {

    if (!completed.includes(index)) {

      setCompleted([...completed, index]);

      addPoints(50);

      alert('🎉 Eco Challenge Completed! +50 Points');
    }
  };

  const startQuiz = (id: number) => {

    navigate(`/quiz-game/${id}`);
  };

  return (

    <div className="space-y-14">

      {/* HEADER */}

      <div className="text-center">

        <h1 className="text-5xl font-bold text-green-800">
          Eco Missions & Quizzes
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Learn sustainability through action-based challenges.
        </p>

      </div>

      {/* DAILY CHALLENGES */}

      <section className="bg-green-100 rounded-3xl p-8 shadow-lg">

        <div className="flex items-center gap-3 mb-6">

          <Leaf className="text-green-700 h-8 w-8" />

          <h2 className="text-3xl font-bold text-green-900">
            Daily Eco Challenges
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {ecoChallenges.map((challenge, index) => (

            <motion.div
              whileHover={{ scale: 1.03 }}
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center"
            >

              <div>

                <h3 className="font-semibold text-lg">
                  {challenge}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  Earn +50 eco points
                </p>

              </div>

              <button
                onClick={() => completeChallenge(index)}
                disabled={completed.includes(index)}
                className={`px-5 py-2 rounded-xl font-semibold transition ${
                  completed.includes(index)
                    ? 'bg-green-600 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {completed.includes(index)
                  ? 'Completed'
                  : 'Complete'}
              </button>

            </motion.div>
          ))}

        </div>

      </section>

      {/* QUIZZES */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {quizzes.map((quiz) => (

          <motion.div
            whileHover={{ y: -8 }}
            key={quiz.id}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
          >

            <div className="p-6">

              <h3 className="text-2xl font-bold mb-3">
                {quiz.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-5">
                {quiz.description}
              </p>

              <div className="space-y-3">

                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 mr-2" />
                  {quiz.difficulty}
                </div>

                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {quiz.timeEstimate}
                </div>

                <div className="flex items-center text-sm">
                  <BarChart className="h-4 w-4 mr-2" />
                  {quiz.points} Points
                </div>

              </div>

              <button
                onClick={() => startQuiz(quiz.id)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Start Quiz
              </button>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}

export default Quizzes;