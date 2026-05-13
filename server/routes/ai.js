import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

console.log(
  'OPENROUTER KEY:',
  process.env.OPENROUTER_API_KEY
);

router.post('/ask', async (req, res) => {

  try {

    const { question } = req.body;

    console.log('QUESTION:', question);

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',

        messages: [
          {
            role: 'system',
            content:
              'You are an Eco sustainability AI assistant.',
          },
          {
            role: 'user',
            content: question,
          },
        ],
      },
      {
        headers: {
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          'Content-Type': 'application/json',
        },
      }
    );

    const answer =
      response.data.choices[0].message.content;

    console.log('AI ANSWER:', answer);

    res.json({
      answer,
    });

  } catch (error) {

    console.error(
      'FULL AI ERROR:',
      error.response?.data || error.message
    );

    res.status(500).json({
      error:
        error.response?.data || error.message,
    });
  }
});

export default router;