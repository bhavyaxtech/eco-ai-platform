import React, { useState } from 'react';

import {
  FileText,
  Sparkles,
  Download,
  Loader2,
  CheckCircle2,
  Leaf,
  Globe,
  Brain,
} from 'lucide-react';

function AIReports() {

  const [topic, setTopic] = useState('');

  const [industry, setIndustry] =
    useState('');

  const [region, setRegion] =
    useState('');

  const [goal, setGoal] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [report, setReport] =
    useState('');

  const generateReport = async () => {

    if (
      !topic ||
      !industry ||
      !region ||
      !goal
    )
      return;

    setLoading(true);

    try {

      const response = await fetch(
        'http://localhost:5000/api/ai/ask',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            question: `
Generate a professional AI Sustainability Report.

Topic:
${topic}

Industry:
${industry}

Region:
${region}

Goal:
${goal}

Include these sections:

1. Executive Summary
2. Current Environmental Problems
3. Environmental Impact Analysis
4. AI-Based Sustainability Solutions
5. Smart Technologies & Automation
6. Actionable Steps
7. Expected Sustainability Benefits
8. Future Recommendations
9. Conclusion

Make the report professional, modern, and business-ready.
            `,
          }),
        }
      );

      const data =
        await response.json();

      setReport(data.answer);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#f4fff7] px-4 md:px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="bg-gradient-to-br from-[#081120] to-[#0f172a] rounded-[32px] p-6 md:p-10 shadow-2xl border border-white/10">

          {/* HEADER */}

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">

                  <Sparkles className="text-green-400 h-7 w-7" />

                </div>

                <div>

                  <p className="text-green-400 font-semibold text-sm uppercase tracking-widest">

                    AI Powered Reports

                  </p>

                  <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">

                    AI Sustainability Reports

                  </h1>

                </div>

              </div>

              <p className="text-gray-400 max-w-3xl text-sm md:text-lg leading-relaxed">

                Generate professional environmental and sustainability reports
                powered by AI with actionable insights, automation strategies,
                and eco-friendly recommendations.
              </p>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-4">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

                <Leaf className="text-green-400 mx-auto mb-2 h-6 w-6" />

                <p className="text-white font-bold">

                  Eco

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

                <Brain className="text-cyan-400 mx-auto mb-2 h-6 w-6" />

                <p className="text-white font-bold">

                  AI

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

                <Globe className="text-purple-400 mx-auto mb-2 h-6 w-6" />

                <p className="text-white font-bold">

                  Global

                </p>

              </div>

            </div>

          </div>

          {/* FORM */}

          <div className="grid md:grid-cols-2 gap-5">

            {/* TOPIC */}

            <div>

              <label className="text-gray-300 text-sm font-semibold mb-2 block">

                Sustainability Topic

              </label>

              <input
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value)
                }
                placeholder="e.g. Renewable Energy"
                className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 text-white outline-none focus:border-green-500 transition-all"
              />

            </div>

            {/* INDUSTRY */}

            <div>

              <label className="text-gray-300 text-sm font-semibold mb-2 block">

                Industry

              </label>

              <input
                value={industry}
                onChange={(e) =>
                  setIndustry(
                    e.target.value
                  )
                }
                placeholder="e.g. Manufacturing"
                className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 text-white outline-none focus:border-green-500 transition-all"
              />

            </div>

            {/* REGION */}

            <div>

              <label className="text-gray-300 text-sm font-semibold mb-2 block">

                Region / Country

              </label>

              <input
                value={region}
                onChange={(e) =>
                  setRegion(
                    e.target.value
                  )
                }
                placeholder="e.g. India"
                className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 text-white outline-none focus:border-green-500 transition-all"
              />

            </div>

            {/* GOAL */}

            <div>

              <label className="text-gray-300 text-sm font-semibold mb-2 block">

                Main Goal

              </label>

              <input
                value={goal}
                onChange={(e) =>
                  setGoal(e.target.value)
                }
                placeholder="e.g. Reduce Carbon Emissions"
                className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 text-white outline-none focus:border-green-500 transition-all"
              />

            </div>

          </div>

          {/* BUTTON */}

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={generateReport}
              className="bg-green-500 hover:bg-green-600 transition-all duration-300 px-8 py-4 rounded-2xl text-white font-bold flex items-center gap-3 shadow-lg hover:scale-[1.02]"
            >

              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate AI Report
                </>
              )}

            </button>

            {report && (

              <button
                className="bg-white/10 hover:bg-white/20 transition-all duration-300 px-8 py-4 rounded-2xl text-white font-bold flex items-center gap-3 border border-white/10"
              >

                <Download className="h-5 w-5" />

                Download Report

              </button>

            )}

          </div>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="mt-8 bg-white rounded-3xl p-8 shadow-xl border border-green-100">

            <div className="flex items-center gap-4 text-green-600">

              <Loader2 className="animate-spin h-8 w-8" />

              <div>

                <h2 className="text-xl font-black">

                  AI is Generating Your Sustainability Report...

                </h2>

                <p className="text-gray-500 mt-1">

                  Analyzing environmental data and generating recommendations.
                </p>

              </div>

            </div>

          </div>

        )}

        {/* REPORT */}

        {report && (

          <div className="mt-8 bg-white rounded-[32px] shadow-2xl border border-green-100 overflow-hidden">

            {/* HEADER */}

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 md:p-8 text-white">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                  <FileText className="h-7 w-7" />

                </div>

                <div>

                  <h2 className="text-3xl font-black">

                    AI Generated Report

                  </h2>

                  <p className="text-green-50 mt-1">

                    Professional sustainability analysis powered by AI.
                  </p>

                </div>

              </div>

            </div>

            {/* CONTENT */}

            <div className="p-6 md:p-10">

              <div className="flex items-center gap-3 mb-8 text-green-600">

                <CheckCircle2 className="h-6 w-6" />

                <p className="font-semibold">

                  Report Successfully Generated
                </p>

              </div>

              <div className="bg-[#0f172a] rounded-3xl p-6 md:p-8 border border-white/5">

                <div className="text-gray-300 whitespace-pre-wrap leading-[2rem] text-sm md:text-base">

                  {report}

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default AIReports;