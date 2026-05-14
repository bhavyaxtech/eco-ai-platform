import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

/* =========================
   AI ASSISTANT CHAT
========================= */

router.post('/ask', async (req, res) => {

  try {

    const { question } = req.body;

    if (!question) {

      return res.status(400).json({
        error: 'Question is required',
      });
    }

    console.log('QUESTION:', question);

    const response = await axios.post(

      'https://openrouter.ai/api/v1/chat/completions',

      {
        model: 'meta-llama/llama-3.1-8b-instruct',

        messages: [

          {
            role: 'system',

            content:
              `
You are EcoLearn AI.

You help users with:
- Sustainability
- Climate change
- Green energy
- Recycling
- Carbon footprint
- Environmental awareness
- Eco-friendly lifestyle
- Waste management
- AI sustainability solutions

Always give clean professional answers.
              `,
          },

          {
            role: 'user',
            content: question,
          },
        ],

        temperature: 0.7,
        max_tokens: 1000,
      },

      {
        headers: {

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          'HTTP-Referer': 'http://localhost:5173',

          'X-Title': 'EcoLearn AI',

          'Content-Type': 'application/json',
        },
      }
    );

    console.log('FULL RESPONSE:', response.data);

    const answer =
      response.data.choices?.[0]?.message?.content;

    res.json({
      success: true,
      answer,
    });

  } catch (error) {

    console.log(
      'AI ERROR:',
      error.response?.data || error.message
    );

    res.status(500).json({

      success: false,

      error:
        error.response?.data?.error?.message ||
        error.message ||
        'AI request failed',
    });
  }
});

/* =========================
   AI REPORT GENERATOR
========================= */

router.post('/report', async (req, res) => {

  try {

    const { topic } = req.body;

    if (!topic) {

      return res.status(400).json({
        error: 'Topic is required',
      });
    }

    const prompt = `
Generate a professional sustainability report about:

${topic}

Include:
- Current problem
- Environmental impact
- AI-based solutions
- Action steps
- Sustainability benefits

Make the report professional and detailed.
`;

    console.log('REPORT TOPIC:', topic);

    const response = await axios.post(

      'https://openrouter.ai/api/v1/chat/completions',

      {
        model: 'meta-llama/llama-3.1-8b-instruct',

        messages: [

          {
            role: 'system',

            content:
              'You are a professional sustainability report generator.',
          },

          {
            role: 'user',
            content: prompt,
          },
        ],

        temperature: 0.7,
        max_tokens: 2000,
      },

      {
        headers: {

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          'HTTP-Referer': 'http://localhost:5173',

          'X-Title': 'EcoLearn AI',

          'Content-Type': 'application/json',
        },
      }
    );

    const report =
      response.data.choices?.[0]?.message?.content;

    res.json({
      success: true,
      report,
    });

  } catch (error) {

    console.log(
      'REPORT ERROR:',
      error.response?.data || error.message
    );

    res.status(500).json({

      success: false,

      error:
        error.response?.data?.error?.message ||
        error.message,
    });
  }
});

export default router;