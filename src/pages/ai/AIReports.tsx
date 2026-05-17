import React, { useState } from 'react';

import {
  Sparkles,
  Loader2,
  Leaf,
  Globe,
  Brain,
} from 'lucide-react';

function AIReports() {

  const [topic, setTopic] = useState('');
  const [industry, setIndustry] = useState('');
  const [region, setRegion] = useState('');
  const [goal, setGoal] = useState('');

  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState('');

  const generateReport = async () => {

    if (
      !topic ||
      !industry ||
      !region ||
      !goal
    ) {

      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    setReport('');

    try {

      console.log('Sending report request...');

      const response = await fetch(
        'https://eco-ai-backend-0y45.onrender.com/api/ai/report',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            topic: `
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

      console.log('Response status:', response.status);

      const data = await response.json();

      console.log('FULL RESPONSE:', data);

      if (!response.ok) {

        throw new Error(
          data.error ||
          'Failed to generate report'
        );
      }

      setReport(
        data.report ||
        'No report generated'
      );

    } catch (error: any) {

      console.log(
        'REPORT ERROR:',
        error
      );

      alert(
        error.message ||
        'Backend failed'
      );

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
                powered by AI with actionable insights and eco-friendly recommendations.

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

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Sustainability Topic"
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 text-white"
            />

            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Industry"
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 text-white"
            />

            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Region"
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 text-white"
            />

            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Goal"
              className="w-full p-4 rounded-2xl bg-[#111827] border border-white/10 text-white"
            />

          </div>

          {/* BUTTON */}

          <div className="mt-8">

            <button
              onClick={generateReport}
              className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-2xl text-white font-bold flex items-center gap-3"
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

          </div>

        </div>

        {/* REPORT */}

        {report && (

          <div className="mt-8 bg-white rounded-[32px] shadow-2xl overflow-hidden">

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">

              <h2 className="text-3xl font-black">

                AI Generated Report

              </h2>

            </div>

            <div className="p-8">

              <div className="bg-[#0f172a] rounded-3xl p-6">

                <div className="text-gray-300 whitespace-pre-wrap leading-[2rem]">

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