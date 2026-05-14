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

  const { user } = useAuthStore();

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

  /* SORT PLAYERS */
  players.sort((a, b) => b.points - a.points);

  const getMedal = (index: number) => {

    if (index === 0)
      return (
        <div className="bg-yellow-500/20 text-yellow-400 p-3 rounded-xl">
          <Trophy className="h-6 w-6" />
        </div>
      );

    if (index === 1)
      return (
        <div className="bg-gray-400/20 text-gray-300 p-3 rounded-xl">
          <Medal className="h-6 w-6" />
        </div>
      );

    if (index === 2)
      return (
        <div className="bg-orange-500/20 text-orange-400 p-3 rounded-xl">
          <Crown className="h-6 w-6" />
        </div>
      );

    return (
      <div className="bg-green-500/10 text-green-400 p-3 rounded-xl">
        <Star className="h-6 w-6" />
      </div>
    );
  };

  return (

    <div className="min-h-screen bg-[#081120] px-4 md:px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-10">

          <div className="flex justify-center mb-4">

            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-2xl shadow-lg">

              <Trophy className="h-10 w-10 text-white" />

            </div>

          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">

            Eco Leaderboard

          </h1>

          <p className="text-gray-400 mt-3 text-sm md:text-base">

            Top sustainability champions 🌍

          </p>

        </div>

        {/* USER CARD */}

        {user && (

          <div className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 shadow-xl">

            <div className="flex items-center justify-between flex-wrap gap-5">

              <div>

                <p className="text-green-100 text-xs uppercase tracking-wide">

                  Your Eco Score

                </p>

                <h2 className="text-4xl md:text-5xl font-bold text-white mt-1">

                  {user.points}

                </h2>

                <p className="text-green-100 mt-2 text-sm">

                  Keep completing eco challenges 🚀

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4">

                <div className="flex items-center gap-2 mb-2">

                  <Flame className="text-yellow-300 h-5 w-5" />

                  <span className="text-white text-sm font-semibold">

                    Current Rank

                  </span>

                </div>

                <div className="text-2xl font-bold text-white">

                  Green Warrior 🌱

                </div>

              </div>

            </div>

          </div>

        )}

        {/* PLAYERS */}

        <div className="space-y-5">

          {players.map((player, index) => (

            <div
              key={index}
              className={`rounded-3xl p-5 border transition-all duration-300 hover:scale-[1.01]

              ${
                player.name === user?.username
                  ? 'bg-green-500/10 border-green-500/30 shadow-lg'
                  : 'bg-[#111827] border-white/10'
              }
              `}
            >

              <div className="flex items-center justify-between flex-wrap gap-4">

                {/* LEFT */}

                <div className="flex items-center gap-4">

                  {getMedal(index)}

                  <div>

                    <div className="flex items-center gap-2 flex-wrap">

                      <h2 className="text-xl md:text-2xl font-bold text-white">

                        {player.name}

                      </h2>

                      {player.name === user?.username && (

                        <span className="bg-green-500 text-white text-[10px] px-2 py-1 rounded-full font-bold">

                          YOU

                        </span>

                      )}

                    </div>

                    <div className="flex items-center gap-2 text-yellow-400 mt-2 text-sm">

                      <Crown className="h-4 w-4" />

                      <span>{player.rank}</span>

                    </div>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="text-right">

                  <div className="text-3xl md:text-4xl font-bold text-green-400">

                    {player.points}

                  </div>

                  <p className="text-gray-400 text-sm mt-1">

                    Eco Points

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Leaderboard;