import React, { useState } from 'react';

function VoiceAssistant() {

  const [listening, setListening] = useState(false);

  const [question, setQuestion] = useState('');

  const [answer, setAnswer] = useState('');

  const startListening = () => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert('Speech Recognition not supported');

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';

    recognition.start();

    setListening(true);

    recognition.onresult = async (event: any) => {

      const transcript =
        event.results[0][0].transcript;

      setQuestion(transcript);

      setListening(false);

      askAI(transcript);
    };

    recognition.onerror = () => {

      setListening(false);
    };
  };

  const speakAnswer = (text: string) => {

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = 'en-US';

    window.speechSynthesis.speak(speech);
  };

  const askAI = async (q: string) => {

    try {

      const response = await fetch(
        'http://localhost:5000/api/ai/ask',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            question: q,
          }),
        }
      );

      const data = await response.json();

      setAnswer(data.answer);

      speakAnswer(data.answer);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="max-w-5xl mx-auto px-6 py-10">

      <div className="bg-[#111827] rounded-3xl p-10 border border-white/10 text-center">

        <h1 className="text-5xl font-black text-white mb-4">
          AI Voice Assistant
        </h1>

        <p className="text-gray-400 mb-10">
          Speak with AI using your voice.
        </p>

        <button
          onClick={startListening}
          className={`px-10 py-5 rounded-3xl text-white font-bold text-xl transition-all duration-300

          ${
            listening
              ? 'bg-red-500 animate-pulse'
              : 'bg-green-500 hover:bg-green-600'
          }
          `}
        >
          {listening
            ? 'Listening... 🎤'
            : 'Start Voice Assistant'}
        </button>

        {question && (

          <div className="mt-10 bg-slate-900 rounded-3xl p-6 border border-white/10 text-left">

            <h2 className="text-green-400 text-2xl font-bold mb-3">
              Your Question
            </h2>

            <p className="text-white text-lg">
              {question}
            </p>

          </div>

        )}

        {answer && (

          <div className="mt-8 bg-slate-900 rounded-3xl p-6 border border-white/10 text-left">

            <h2 className="text-blue-400 text-2xl font-bold mb-3">
              AI Response
            </h2>

            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
              {answer}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default VoiceAssistant;