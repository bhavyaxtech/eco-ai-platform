import React, { useState } from 'react';

function AIReports() {

  const [topic, setTopic] = useState('');

  const [loading, setLoading] = useState(false);

  const [report, setReport] = useState('');

  const generateReport = async () => {

    if (!topic) return;

    setLoading(true);

    try {

      const response = await fetch(
        'http://localhost:5000/api/ai/ask',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            question: `
            Generate a professional sustainability report about:
            ${topic}

            Include:
            - Current problem
            - Environmental impact
            - AI-based solutions
            - Action steps
            - Sustainability benefits
            `,
          }),
        }
      );

      const data = await response.json();

      setReport(data.answer);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="max-w-5xl mx-auto px-6 py-10">

      <div className="bg-[#111827] rounded-3xl p-10 border border-white/10">

        <h1 className="text-5xl font-black text-white mb-4">
          AI Sustainability Reports
        </h1>

        <p className="text-gray-400 mb-8">
          Generate professional environmental reports using AI.
        </p>

        <div className="flex gap-4">

          <input
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
            }
            placeholder="Enter sustainability topic..."
            className="flex-1 p-4 rounded-2xl bg-slate-900 border border-white/10 text-white"
          />

          <button
            onClick={generateReport}
            className="bg-green-500 hover:bg-green-600 px-8 rounded-2xl text-white font-bold"
          >
            Generate
          </button>

        </div>

        {loading && (

          <div className="mt-8 text-green-400">
            Generating AI Report...
          </div>

        )}

        {report && (

          <div className="mt-10 bg-slate-900 rounded-3xl p-8 border border-white/10">

            <h2 className="text-3xl font-bold text-green-400 mb-6">
              AI Generated Report
            </h2>

            <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {report}
            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default AIReports;