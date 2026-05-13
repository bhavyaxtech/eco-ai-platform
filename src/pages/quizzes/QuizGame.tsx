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
} from 'lucide-react';

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

  useEffect(() => {

    fetch(
      `http://127.0.0.1:5000/api/quizzes/${id}`
    )
      .then((res) => res.json())
      .then((data) => {

        setQuiz(data);

        setLoading(false);

      })
      .catch((error) => {

        console.error(error);

        setLoading(false);

      });

  }, [id]);

  const handleAnswer = (
    option: string
  ) => {

    if (!quiz) return;

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

      updatedScore = score + 1;

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

    }, 1400);
  };

  const restartQuiz = () => {

    setCurrentQuestion(0);

    setScore(0);

    setSelected('');

    setShowResult(false);

    setEarnedXP(0);

    setIsCorrect(null);
  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-white text-3xl font-bold">

        Loading Quiz...

      </div>
    );
  }

  if (!quiz) {

    return (

      <div className="min-h-screen flex items-center justify-center text-red-500 text-3xl font-bold">

        Quiz not found

      </div>
    );
  }

  if (showResult) {

    return (

      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="bg-[#111827] border border-white/10 rounded-[32px] p-12 shadow-[0_20px_80px_rgba(0,0,0,0.5)] text-center">

          <div className="flex justify-center mb-8">

            <div className="bg-green-500/20 p-6 rounded-full">

              <Trophy className="h-16 w-16 text-green-400" />

            </div>

          </div>

          <h1 className="text-5xl font-black text-white mb-6">

            Quiz Completed 🎉

          </h1>

          <div className="text-7xl font-black text-green-400">

            {score}/{quiz.questions.length}

          </div>

          <p className="text-gray-400 text-xl mt-5">

            Amazing work learning sustainability.

          </p>

          <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-6 inline-block">

            <div className="text-green-400 text-4xl font-black">

              +{earnedXP} XP

            </div>

            <p className="text-gray-400 mt-2">

              50 points added for every correct answer

            </p>

          </div>

          <div className="mt-5 text-lg text-gray-300">

            Current Score:
            {' '}
            <span className="text-green-400 font-bold">
              {user?.points}
            </span>

          </div>

          <div className="flex justify-center gap-5 mt-12 flex-wrap">

            <button
              onClick={restartQuiz}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300"
            >

              <RotateCcw className="h-5 w-5" />

              Restart Quiz

            </button>

            <Link
              to="/quizzes"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300"
            >

              <Home className="h-5 w-5" />

              Back To Quizzes

            </Link>

          </div>

        </div>

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

        <div className="flex items-center justify-between flex-wrap gap-5 mb-10">

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
              Current Score
            </div>

            <div className="text-2xl font-black text-green-400">

              {score * 50}

            </div>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="mb-10">

          <div className="flex justify-between mb-3 text-gray-300 font-semibold">

            <span>
              Question {currentQuestion + 1}
            </span>

            <span>
              {quiz.questions.length}
            </span>

          </div>

          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">

            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestion + 1) /
                  quiz.questions.length) *
                  100}%`,
              }}
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

              <button
                key={index}
                onClick={() =>
                  handleAnswer(
                    option
                  )
                }
                disabled={!!selected}
                className={`w-full p-6 rounded-2xl border text-left text-lg font-semibold transition-all duration-300

                ${
                  selected === option
                    ? option ===
                      question.answer
                      ? 'bg-green-500/20 border-green-500 text-white scale-[1.01]'
                      : 'bg-red-500/20 border-red-500 text-white'
                    : 'bg-white/[0.03] border-white/10 text-gray-200 hover:border-green-400 hover:bg-green-500/10'
                }
                `}
              >

                <div className="flex items-center justify-between">

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

              </button>
            )
          )}

        </div>

        {/* FACT */}

        {selected && (

          <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-3xl p-6">

            <h3 className="font-bold mb-3 text-green-400 text-xl">

              Eco Fact 🌍

            </h3>

            <p className="text-gray-300 leading-relaxed text-lg">

              {question.fact}

            </p>

          </div>

        )}

        {/* CORRECT MESSAGE */}

        {selected && (

          <div className="mt-6 text-center">

            {isCorrect ? (

              <div className="text-green-400 font-bold text-xl">

                ✅ Correct Answer! +50 Points

              </div>

            ) : (

              <div className="text-red-400 font-bold text-xl">

                ❌ Wrong Answer
              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default QuizGame;