import React, { useState } from 'react';

function CarbonCalculator() {

  const [electricity, setElectricity] = useState('');

  const [transport, setTransport] = useState('');

  const [meat, setMeat] = useState('');

  const [result, setResult] = useState<any>(null);

  const calculateFootprint = () => {

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

    if (ecoScore > 80) {
      level = 'Excellent 🌱';
    } else if (ecoScore > 60) {
      level = 'Good ✅';
    } else if (ecoScore > 40) {
      level = 'Average ⚠️';
    } else {
      level = 'High Pollution ❌';
    }

    setResult({
      total,
      ecoScore,
      level,
    });
  };

  return (

    <div className="max-w-5xl mx-auto px-6 py-10">

      <div className="bg-[#111827] rounded-3xl p-10 border border-white/10">

        <h1 className="text-5xl font-black text-white mb-4">
          AI Carbon Footprint Calculator
        </h1>

        <p className="text-gray-400 mb-10">
          Analyze your environmental impact using AI.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <div>

            <label className="text-white block mb-3 font-bold">
              Electricity Usage (kWh)
            </label>

            <input
              type="number"
              value={electricity}
              onChange={(e) =>
                setElectricity(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-slate-900 border border-white/10 text-white"
            />

          </div>

          <div>

            <label className="text-white block mb-3 font-bold">
              Transport Distance (km)
            </label>

            <input
              type="number"
              value={transport}
              onChange={(e) =>
                setTransport(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-slate-900 border border-white/10 text-white"
            />

          </div>

          <div>

            <label className="text-white block mb-3 font-bold">
              Meat Meals Per Week
            </label>

            <input
              type="number"
              value={meat}
              onChange={(e) =>
                setMeat(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-slate-900 border border-white/10 text-white"
            />

          </div>

        </div>

        <button
          onClick={calculateFootprint}
          className="mt-10 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-2xl text-white font-bold text-lg"
        >
          Calculate Carbon Footprint
        </button>

        {result && (

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            <div className="bg-slate-900 p-8 rounded-3xl border border-white/10">

              <h2 className="text-gray-400 mb-3">
                Total CO₂ Emission
              </h2>

              <div className="text-4xl font-black text-red-400">
                {result.total.toFixed(2)}
              </div>

            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-white/10">

              <h2 className="text-gray-400 mb-3">
                Eco Score
              </h2>

              <div className="text-4xl font-black text-green-400">
                {result.ecoScore}/100
              </div>

            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-white/10">

              <h2 className="text-gray-400 mb-3">
                Sustainability Level
              </h2>

              <div className="text-2xl font-black text-blue-400">
                {result.level}
              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default CarbonCalculator;