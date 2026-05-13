import React from 'react';

import {
  Trophy,
  Crown,
  Medal,
  Flame,
  Star,
} from 'lucide-react';

import { useAuthStore } from '../../lib/store';

function Leaderboard() {

  const { user } =
    useAuthStore();

  const players = [

    {
      name: user?.username || 'You',
      points: user?.points || 1200,
      rank: 'Eco Warrior',
    },

    {
      name: 'EcoMaster',
      points: 5400,
      rank: 'Planet Guardian',
    },

    {
      name: 'GreenHero',
      points: 4200,
      rank: 'Nature Protector',
    },

    {
      name: 'NatureKing',
      points: 3900,
      rank: 'Eco Champion',
    },

    {
      name: 'EarthSaver',
      points: 3200,
      rank: 'Green Leader',
    },

  ];

  /* SORT HIGHEST POINTS */

  players.sort(
    (a, b) => b.points - a.points
  );

  const getMedal = (
    index: number
  ) => {

    if (index === 0)
      return (
        <div className="bg-yellow-500/20 text-yellow-400 p-4 rounded-2xl">
          <Trophy className="h-8 w-8" />
        </div>
      );

    if (index === 1)
      return (
        <div className="bg-gray-400/20 text-gray-300 p-4 rounded-2xl">
          <Medal className="h-8 w-8" />
        </div>
      );

    if (index === 2)
      return (
        <div className="bg-orange-500/20 text-orange-400 p-4 rounded-2xl">
          <Crown className="h-8 w-8" />
        </div>
      );

    return (
      <div className="bg-green-500/10 text-green-400 p-4 rounded-2xl">
        <Star className="h-8 w-8" />
      </div>
    );
  };

  return (

    <div className="min-h-screen bg-[#0f172a] px-6 py-14">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-16">

          <div className="flex justify-center mb-6">

            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-3xl shadow-2xl">

              <Trophy className="h-14 w-14 text-white" />

            </div>

          </div>

          <h1 className="text-5xl font-black text-white">

            Global Leaderboard

          </h1>

          <p className="text-gray-400 mt-5 text-lg">

            Top sustainability champions ranked by eco points 🌍

          </p>

        </div>

        {/* TOP USER CARD */}

        {user && (

          <div className="mb-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-[30px] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">

            <div className="flex items-center justify-between flex-wrap gap-6">

              <div>

                <div className="text-green-100 text-sm mb-2">
                  YOUR CURRENT SCORE
                </div>

                <h2 className="text-5xl font-black text-white">

                  {user.points}

                </h2>

                <p className="text-green-100 mt-3 text-lg">

                  Keep completing quizzes and eco missions 🚀

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6">

                <div className="flex items-center gap-3 mb-2">

                  <Flame className="text-yellow-300" />

                  <span className="text-white font-bold">
                    Eco Rank
                  </span>

                </div>

                <div className="text-3xl font-black text-white">

                  Green Warrior 🌱

                </div>

              </div>

            </div>

          </div>

        )}

        {/* PLAYERS */}

        <div className="space-y-6">

          {players.map(
            (player, index) => (

              <div
                key={index}
                className={`rounded-[30px] p-8 border transition-all duration-300 hover:scale-[1.01]

                ${
                  player.name === user?.username

                    ? 'bg-green-500/10 border-green-500/30 shadow-[0_20px_60px_rgba(34,197,94,0.15)]'

                    : 'bg-[#111827] border-white/10'
                }
                `}
              >

                <div className="flex items-center justify-between flex-wrap gap-6">

                  {/* LEFT */}

                  <div className="flex items-center gap-6">

                    {getMedal(index)}

                    <div>

                      <div className="flex items-center gap-3 flex-wrap">

                        <h2 className="text-3xl font-black text-white">

                          {player.name}

                        </h2>

                        {player.name === user?.username && (

                          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">

                            YOU

                          </span>

                        )}

                      </div>

                      <div className="flex items-center gap-2 text-yellow-400 mt-3">

                        <Crown className="h-4 w-4" />

                        <span className="font-semibold">

                          {player.rank}

                        </span>

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="text-right">

                    <div className="text-5xl font-black text-green-400">

                      {player.points}

                    </div>

                    <p className="text-gray-400 mt-2">

                      Eco Points

                    </p>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Leaderboard;