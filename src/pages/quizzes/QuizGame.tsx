import React, {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  Link,
} from 'react-router-dom';

import {
  Trophy,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { useAuthStore } from '../../lib/store';

interface Question {
  question: string;
  options: string[];
  answer: string;
  fact: string;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

function QuizGame() {

  const { id } = useParams();

  const {
    completeQuiz,
    user,
  } = useAuthStore();

  const [quiz, setQuiz] =
    useState<Quiz | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [score, setScore] =
    useState(0);

  const [selected, setSelected] =
    useState('');

  const [showResult, setShowResult] =
    useState(false);

  const [earnedXP, setEarnedXP] =
    useState(0);

  const [isCorrect, setIsCorrect] =
    useState<boolean | null>(null);

  /* FETCH QUIZ */

  useEffect(() => {

    const fetchQuiz = async () => {

      try {

        const response = await fetch(
          `http://127.0.0.1:5000/api/quizzes/${id}`
        );

        if (!response.ok) {

          throw new Error(
            'Quiz not found'
          );
        }

        const data =
          await response.json();

        setQuiz(data);

      } catch (err: any) {

        setError(
          err.message ||
            'Failed to load quiz'
        );

      } finally {

        setLoading(false);
      }
    };

    fetchQuiz();

  }, [id]);

  /* HANDLE ANSWER */

  const handleAnswer = (
    option: string
  ) => {

    if (!quiz || selected)
      return;

    setSelected(option);

    const question =
      quiz.questions[
        currentQuestion
      ];

    const correct =
      option === question.answer;

    setIsCorrect(correct);

    let updatedScore = score;

    if (correct) {

      updatedScore += 1;

      setScore(updatedScore);
    }

    setTimeout(() => {

      setSelected('');

      setIsCorrect(null);

      if (
        currentQuestion + 1 <
        quiz.questions.length
      ) {

        setCurrentQuestion(
          (prev) => prev + 1
        );

      } else {

        const xp =
          updatedScore * 50;

        setEarnedXP(xp);

        if (id) {

          completeQuiz(
            Number(id),
            xp
          );
        }

        setShowResult(true);
      }

    }, 1500);
  };

  /* RESTART */

  const restartQuiz = () => {

    setCurrentQuestion(0);

    setScore(0);

    setSelected('');

    setShowResult(false);

    setEarnedXP(0);

    setIsCorrect(null);
  };

  /* LOADING */

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="flex items-center gap-4 text-green-500 text-2xl font-bold">

          <Loader2 className="animate-spin h-8 w-8" />

          Loading Quiz...

        </div>

      </div>
    );
  }

  /* ERROR */

  if (error || !quiz) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="bg-red-500/10 border border-red-500/20 px-10 py-8 rounded-3xl text-center">

          <h1 className="text-4xl font-black text-red-500">

            Quiz Not Found

          </h1>

          <p className="text-gray-400 mt-3">

            {error}
          </p>

        </div>

      </div>
    );
  }

  /* RESULT SCREEN */

  if (showResult) {

    const percentage =
      Math.round(
        (score /
          quiz.questions.length) *
          100
      );

    return (

      <div className="max-w-4xl mx-auto px-6 py-16">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-[#111827] border border-white/10 rounded-[32px] p-12 text-center shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
        >

          <div className="flex justify-center mb-8">

            <div className="bg-green-500/20 p-6 rounded-full">

              <Trophy className="h-16 w-16 text-green-400" />

            </div>

          </div>

          <h1 className="text-5xl font-black text-white">

            Quiz Completed 🎉

          </h1>

          <div className="mt-8 text-7xl font-black text-green-400">

            {score}/{quiz.questions.length}

          </div>

          <div className="mt-3 text-2xl text-gray-300">

            {percentage}% Score
          </div>

          <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-3xl p-6 inline-block">

            <div className="text-5xl font-black text-green-400">

              +{earnedXP} XP

            </div>

            <p className="text-gray-400 mt-2">

              Great sustainability learning progress 🌱

            </p>

          </div>

          <div className="mt-6 text-xl text-gray-300">

            Current Points:
            {' '}
            <span className="text-green-400 font-bold">
              {user?.points}
            </span>

          </div>

          <div className="flex justify-center gap-5 mt-12 flex-wrap">

            <button
              onClick={restartQuiz}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold transition"
            >

              <RotateCcw className="h-5 w-5" />

              Restart Quiz

            </button>

            <Link
              to="/quizzes"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold transition"
            >

              <Home className="h-5 w-5" />

              Back To Quizzes

            </Link>

          </div>

        </motion.div>

      </div>
    );
  }

  const question =
    quiz.questions[
      currentQuestion
    ];

  return (

    <div className="max-w-5xl mx-auto px-6 py-10">

      <div className="bg-[#111827] border border-white/10 rounded-[32px] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

        {/* HEADER */}

        <div className="flex justify-between items-center flex-wrap gap-5 mb-10">

          <div>

            <h1 className="text-4xl font-black text-white">

              {quiz.title}

            </h1>

            <p className="text-gray-400 mt-2">

              Sustainability Quiz Challenge 🌱

            </p>

          </div>

          <div className="bg-green-500/10 border border-green-500/20 px-5 py-3 rounded-2xl">

            <div className="text-sm text-gray-400">
              Score
            </div>

            <div className="text-3xl font-black text-green-400">

              {score * 50}

            </div>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="mb-10">

          <div className="flex justify-between text-gray-300 mb-3">

            <span>
              Question {currentQuestion + 1}
            </span>

            <span>
              {quiz.questions.length}
            </span>

          </div>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${((currentQuestion + 1) /
                  quiz.questions.length) *
                  100}%`,
              }}
              className="h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            />

          </div>

        </div>

        {/* QUESTION */}

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 mb-10">

          <h2 className="text-3xl font-bold text-white leading-relaxed">

            {question.question}

          </h2>

        </div>

        {/* OPTIONS */}

        <div className="space-y-5">

          {question.options.map(
            (option, index) => (

              <motion.button
                whileHover={{
                  scale: 1.01,
                }}
                key={index}
                onClick={() =>
                  handleAnswer(option)
                }
                disabled={!!selected}
                className={`w-full p-6 rounded-2xl border text-left text-lg font-semibold transition-all duration-300

                ${
                  selected === option
                    ? option ===
                      question.answer
                      ? 'bg-green-500/20 border-green-500 text-white'
                      : 'bg-red-500/20 border-red-500 text-white'
                    : 'bg-white/[0.03] border-white/10 text-gray-200 hover:border-green-400 hover:bg-green-500/10'
                }
                `}
              >

                <div className="flex justify-between items-center">

                  <span>
                    {option}
                  </span>

                  {selected === option && (

                    option ===
                    question.answer ? (

                      <CheckCircle2 className="text-green-400" />

                    ) : (

                      <XCircle className="text-red-400" />

                    )
                  )}

                </div>

              </motion.button>
            )
          )}

        </div>

        {/* FACT */}

        {selected && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8 bg-green-500/10 border border-green-500/20 rounded-3xl p-6"
          >

            <div className="flex items-center gap-3 mb-4">

              <Sparkles className="text-green-400" />

              <h3 className="font-bold text-green-400 text-2xl">

                Eco Fact 🌍

              </h3>

            </div>

            <p className="text-gray-300 text-lg leading-relaxed">

              {question.fact}

            </p>

          </motion.div>

        )}

      </div>

    </div>
  );
}

export default QuizGame;