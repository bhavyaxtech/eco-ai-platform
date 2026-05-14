import React, { useState } from 'react';

import {
  Zap,
  Car,
  Beef,
  Leaf,
  TrendingDown,
  Award,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Sparkles,
} from 'lucide-react';

import { motion } from 'framer-motion';

function CarbonCalculator() {

  const [electricity, setElectricity] = useState('');

  const [transport, setTransport] = useState('');

  const [meat, setMeat] = useState('');

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const calculateFootprint = () => {

    setLoading(true);

    setTimeout(() => {

      const electricityEmission =
        Number(electricity) * 0.5;

      const transportEmission =
        Number(transport) * 0.2;

      const meatEmission =
        Number(meat) * 2;

      const total =
        electricityEmission +
        transportEmission +
        meatEmission;

      let ecoScore = 100;

      ecoScore -= Math.floor(total);

      if (ecoScore < 0) ecoScore = 0;

      let level = '';

      let color = '';

      let aiAdvice = '';

      if (ecoScore > 80) {

        level = 'Excellent 🌱';

        color = 'text-green-400';

        aiAdvice =
          'Amazing job! Your lifestyle is eco-friendly and sustainable. Keep maintaining these green habits.';

      } else if (ecoScore > 60) {

        level = 'Good ✅';

        color = 'text-emerald-400';

        aiAdvice =
          'You are doing well. Reducing electricity usage and using public transport can improve your score further.';

      } else if (ecoScore > 40) {

        level = 'Average ⚠️';

        color = 'text-yellow-400';

        aiAdvice =
          'Your carbon footprint is moderate. Consider reducing meat consumption and energy waste.';

      } else {

        level = 'High Pollution ❌';

        color = 'text-red-400';

        aiAdvice =
          'Your environmental impact is high. AI recommends reducing fossil fuel usage, limiting waste, and adopting renewable energy.';

      }

      setResult({
        total,
        ecoScore,
        level,
        color,
        aiAdvice,
        electricityEmission,
        transportEmission,
        meatEmission,
      });

      setLoading(false);

    }, 1500);
  };

  return (

    <div className="min-h-screen bg-[#07111f] px-4 md:px-6 py-10 text-white">

      <div className="max-w-7xl mx-auto">

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
          className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-10 backdrop-blur-xl"
        >

          <div className="flex items-center gap-4 mb-6">

            <div className="w-16 h-16 rounded-3xl bg-green-500/15 flex items-center justify-center">

              <Leaf className="text-green-400 h-8 w-8" />

            </div>

            <div>

              <h1 className="text-3xl md:text-5xl font-black leading-tight">

                AI Carbon Calculator

              </h1>

              <p className="text-gray-400 mt-2 text-sm md:text-base">

                Analyze your environmental impact with AI-powered sustainability insights.

              </p>

            </div>

          </div>

          {/* INPUTS */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {/* ELECTRICITY */}

            <div className="bg-black/20 border border-white/10 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 flex items-center justify-center">

                  <Zap className="text-yellow-400 h-6 w-6" />

                </div>

                <div>

                  <h2 className="font-bold text-lg">

                    Electricity

                  </h2>

                  <p className="text-gray-400 text-sm">

                    Monthly usage

                  </p>

                </div>

              </div>

              <input
                type="number"
                value={electricity}
                onChange={(e) =>
                  setElectricity(e.target.value)
                }
                placeholder="e.g. 120"
                className="w-full p-4 rounded-2xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-green-500"
              />

            </div>

            {/* TRANSPORT */}

            <div className="bg-black/20 border border-white/10 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center">

                  <Car className="text-blue-400 h-6 w-6" />

                </div>

                <div>

                  <h2 className="font-bold text-lg">

                    Transport

                  </h2>

                  <p className="text-gray-400 text-sm">

                    Distance travelled

                  </p>

                </div>

              </div>

              <input
                type="number"
                value={transport}
                onChange={(e) =>
                  setTransport(e.target.value)
                }
                placeholder="e.g. 50"
                className="w-full p-4 rounded-2xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-green-500"
              />

            </div>

            {/* FOOD */}

            <div className="bg-black/20 border border-white/10 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center">

                  <Beef className="text-red-400 h-6 w-6" />

                </div>

                <div>

                  <h2 className="font-bold text-lg">

                    Meat Consumption

                  </h2>

                  <p className="text-gray-400 text-sm">

                    Meals per week

                  </p>

                </div>

              </div>

              <input
                type="number"
                value={meat}
                onChange={(e) =>
                  setMeat(e.target.value)
                }
                placeholder="e.g. 7"
                className="w-full p-4 rounded-2xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-green-500"
              />

            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={calculateFootprint}
            className="mt-10 bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-all px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-xl"
          >

            Calculate Footprint

          </button>

        </motion.div>

        {/* LOADING */}

        {loading && (

          <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 text-center">

            <div className="animate-pulse text-green-400 text-xl font-bold">

              AI is analyzing your environmental impact...

            </div>

          </div>

        )}

        {/* RESULTS */}

        {result && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-10"
          >

            {/* TOP CARDS */}

            <div className="grid md:grid-cols-3 gap-6">

              {/* EMISSION */}

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <div className="flex items-center gap-3 mb-5">

                  <TrendingDown className="text-red-400 h-7 w-7" />

                  <h2 className="text-lg font-bold text-gray-300">

                    CO₂ Emission

                  </h2>

                </div>

                <div className="text-5xl font-black text-red-400">

                  {result.total.toFixed(1)}

                </div>

                <p className="text-gray-400 mt-2">

                  Estimated carbon output

                </p>

              </div>

              {/* SCORE */}

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <div className="flex items-center gap-3 mb-5">

                  <Award className="text-green-400 h-7 w-7" />

                  <h2 className="text-lg font-bold text-gray-300">

                    Eco Score

                  </h2>

                </div>

                <div className="text-5xl font-black text-green-400">

                  {result.ecoScore}/100

                </div>

                <p className="text-gray-400 mt-2">

                  Sustainability rating

                </p>

              </div>

              {/* LEVEL */}

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <div className="flex items-center gap-3 mb-5">

                  <BarChart3 className="text-blue-400 h-7 w-7" />

                  <h2 className="text-lg font-bold text-gray-300">

                    AI Result

                  </h2>

                </div>

                <div className={`text-3xl font-black ${result.color}`}>

                  {result.level}

                </div>

                <p className="text-gray-400 mt-2">

                  Environmental performance

                </p>

              </div>

            </div>

            {/* AI ANALYSIS */}

            <div className="mt-8 grid lg:grid-cols-[1fr_320px] gap-6">

              {/* LEFT */}

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <div className="flex items-center gap-3 mb-6">

                  <Sparkles className="text-green-400 h-7 w-7" />

                  <h2 className="text-3xl font-black">

                    AI Sustainability Analysis

                  </h2>

                </div>

                <p className="text-gray-300 leading-relaxed text-lg">

                  {result.aiAdvice}
                </p>

                <div className="mt-8 space-y-5">

                  <div className="bg-black/20 rounded-2xl p-5 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <Zap className="text-yellow-400 h-5 w-5" />

                      <span>Electricity Emission</span>

                    </div>

                    <span className="font-bold text-yellow-400">

                      {result.electricityEmission.toFixed(1)}
                    </span>

                  </div>

                  <div className="bg-black/20 rounded-2xl p-5 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <Car className="text-blue-400 h-5 w-5" />

                      <span>Transport Emission</span>

                    </div>

                    <span className="font-bold text-blue-400">

                      {result.transportEmission.toFixed(1)}
                    </span>

                  </div>

                  <div className="bg-black/20 rounded-2xl p-5 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <Beef className="text-red-400 h-5 w-5" />

                      <span>Food Emission</span>

                    </div>

                    <span className="font-bold text-red-400">

                      {result.meatEmission.toFixed(1)}
                    </span>

                  </div>

                </div>

              </div>

              {/* RIGHT */}

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">

                <div className="flex items-center gap-3 mb-5">

                  <CheckCircle2 className="h-7 w-7" />

                  <h2 className="text-2xl font-black">

                    AI Recommendations

                  </h2>

                </div>

                <div className="space-y-4 text-sm md:text-base">

                  <div className="bg-white/10 rounded-2xl p-4">
                    Use renewable energy sources
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4">
                    Reduce private vehicle usage
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4">
                    Eat more plant-based meals
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4">
                    Practice recycling & conservation
                  </div>

                </div>

                <div className="mt-8 bg-black/20 rounded-2xl p-5">

                  <div className="flex items-center gap-3 mb-3">

                    <AlertTriangle className="h-5 w-5" />

                    <span className="font-bold">

                      AI Insight
                    </span>

                  </div>

                  <p className="text-sm leading-relaxed text-green-50">

                    Small lifestyle changes can significantly reduce long-term environmental impact and improve sustainability scores.

                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        )}

      </div>

    </div>
  );
}

export default CarbonCalculator;