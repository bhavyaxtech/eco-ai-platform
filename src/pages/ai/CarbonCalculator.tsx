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

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';

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
          'Amazing job! Your lifestyle is eco-friendly and sustainable.';

      } else if (ecoScore > 60) {

        level = 'Good ✅';

        color = 'text-emerald-400';

        aiAdvice =
          'You are doing well. Reducing electricity usage and public transport can improve your score further.';

      } else if (ecoScore > 40) {

        level = 'Average ⚠️';

        color = 'text-yellow-400';

        aiAdvice =
          'Your carbon footprint is moderate. Reduce meat consumption and energy waste.';

      } else {

        level = 'High Pollution ❌';

        color = 'text-red-400';

        aiAdvice =
          'Your environmental impact is high. Use renewable energy and reduce fossil fuel usage.';
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

  const chartData = result
    ? [
        {
          name: 'Electricity',
          value: result.electricityEmission,
        },
        {
          name: 'Transport',
          value: result.transportEmission,
        },
        {
          name: 'Food',
          value: result.meatEmission,
        },
      ]
    : [];

  const COLORS = [
    '#22c55e',
    '#3b82f6',
    '#ef4444',
  ];

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

              <h1 className="text-3xl md:text-5xl font-black">

                AI Carbon Calculator

              </h1>

              <p className="text-gray-400 mt-2">

                Analyze your environmental impact with AI-powered insights.

              </p>

            </div>

          </div>

          {/* INPUTS */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {/* ELECTRICITY */}

            <div className="bg-black/20 border border-white/10 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <Zap className="text-yellow-400 h-6 w-6" />

                <h2 className="font-bold text-lg">

                  Electricity

                </h2>

              </div>

              <input
                type="number"
                value={electricity}
                onChange={(e) =>
                  setElectricity(e.target.value)
                }
                placeholder="Monthly electricity usage"
                className="w-full p-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none"
              />

            </div>

            {/* TRANSPORT */}

            <div className="bg-black/20 border border-white/10 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <Car className="text-blue-400 h-6 w-6" />

                <h2 className="font-bold text-lg">

                  Transport

                </h2>

              </div>

              <input
                type="number"
                value={transport}
                onChange={(e) =>
                  setTransport(e.target.value)
                }
                placeholder="Distance travelled"
                className="w-full p-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none"
              />

            </div>

            {/* FOOD */}

            <div className="bg-black/20 border border-white/10 rounded-3xl p-6">

              <div className="flex items-center gap-3 mb-5">

                <Beef className="text-red-400 h-6 w-6" />

                <h2 className="font-bold text-lg">

                  Meat Consumption

                </h2>

              </div>

              <input
                type="number"
                value={meat}
                onChange={(e) =>
                  setMeat(e.target.value)
                }
                placeholder="Meals per week"
                className="w-full p-4 rounded-2xl bg-[#0f172a] border border-white/10 outline-none"
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

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <TrendingDown className="text-red-400 h-8 w-8 mb-4" />

                <div className="text-5xl font-black text-red-400">

                  {result.total.toFixed(1)}

                </div>

                <p className="text-gray-400 mt-2">

                  CO₂ Emission

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <Award className="text-green-400 h-8 w-8 mb-4" />

                <div className="text-5xl font-black text-green-400">

                  {result.ecoScore}/100

                </div>

                <p className="text-gray-400 mt-2">

                  Eco Score

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                <BarChart3 className="text-blue-400 h-8 w-8 mb-4" />

                <div className={`text-3xl font-black ${result.color}`}>

                  {result.level}

                </div>

                <p className="text-gray-400 mt-2">

                  AI Analysis

                </p>

              </div>

            </div>

            {/* CHARTS */}

            <div className="grid lg:grid-cols-2 gap-6 mt-8">

              {/* PIE */}

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                <h2 className="text-2xl font-black mb-6">

                  Emission Breakdown

                </h2>

                <div className="h-[300px]">

                  <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                      <Pie
                        data={chartData}
                        dataKey="value"
                        outerRadius={100}
                        label
                      >

                        {chartData.map((entry, index) => (

                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />

                        ))}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

              </div>

              {/* BAR */}

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                <h2 className="text-2xl font-black mb-6">

                  Carbon Sources

                </h2>

                <div className="h-[300px]">

                  <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={chartData}>

                      <XAxis dataKey="name" />

                      <YAxis />

                      <Tooltip />

                      <Bar
                        dataKey="value"
                        fill="#22c55e"
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>

            {/* AI SECTION */}

            <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-5">

                <Sparkles className="h-7 w-7" />

                <h2 className="text-3xl font-black">

                  AI Sustainability Analysis

                </h2>

              </div>

              <p className="text-lg leading-relaxed">

                {result.aiAdvice}

              </p>

              <div className="mt-8 grid md:grid-cols-2 gap-4">

                <div className="bg-white/10 rounded-2xl p-4">

                  ✅ Use renewable energy

                </div>

                <div className="bg-white/10 rounded-2xl p-4">

                  ✅ Reduce private vehicle usage

                </div>

                <div className="bg-white/10 rounded-2xl p-4">

                  ✅ Eat more plant-based meals

                </div>

                <div className="bg-white/10 rounded-2xl p-4">

                  ✅ Practice recycling

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