import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

import Chat from '../models/Chat.js';

dotenv.config();

const router = express.Router();

/* ======================================================
   CREATE / CONTINUE CHAT
====================================================== */

router.post('/ask', async (req, res) => {
  try {

    const {
      question,
      userId,
      chatId,
    } = req.body;

    if (!question) {

      return res.status(400).json({
        success: false,
        error: 'Question required',
      });
    }

    let chat;

    /* =========================================
       EXISTING CHAT
    ========================================= */

    if (chatId) {

      chat = await Chat.findById(chatId);
    }

    /* =========================================
       NEW CHAT
    ========================================= */

    if (!chat) {

      chat = await Chat.create({
        userId,

        title:
          question.slice(0, 40) + '...',

        messages: [],
      });
    }

    /* SAVE USER MESSAGE */

    chat.messages.push({
      role: 'user',
      content: question,
    });

    /* =========================================
       AI REQUEST
    ========================================= */

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',

      {
        model: 'openai/gpt-3.5-turbo',

        messages: [
          {
            role: 'system',

            content: `
You are EcoLearn AI.

You are a futuristic sustainability AI assistant.

You help users with:
- climate change
- sustainability
- recycling
- green energy
- eco living
- carbon footprint
- environmental education

Your style:
- smart
- modern
- professional
- startup-grade
- motivational
            `,
          },

          ...chat.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],

        temperature: 0.7,

        max_tokens: 1200,
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          'HTTP-Referer':
            'https://eco-ai-platform.onrender.com',

          'X-Title':
            'EcoLearn AI',

          'Content-Type':
            'application/json',
        },
      }
    );

    console.log(
      'OPENROUTER RESPONSE:',
      response.data
    );

    const aiReply =
      response.data?.choices?.[0]
        ?.message?.content ||
      'No response from AI';

    /* SAVE AI MESSAGE */

    chat.messages.push({
      role: 'assistant',
      content: aiReply,
    });

    await chat.save();

    /* RESPONSE */

    res.json({
      success: true,

      answer: aiReply,

      chatId: chat._id,

      messages: chat.messages,
    });

  } catch (error) {

    console.log(
      'AI ERROR:',
      error.response?.data ||
      error.message
    );

    res.status(500).json({
      success: false,

      error:
        error.response?.data?.error?.message ||
        error.message,
    });
  }
});

/* ======================================================
   GET ALL CHATS
====================================================== */

router.get('/history/:userId', async (req, res) => {

  try {

    const chats = await Chat.find({
      userId: req.params.userId,
    }).sort({
      updatedAt: -1,
    });

    res.json({
      success: true,
      chats,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});

/* ======================================================
   GET SINGLE CHAT
====================================================== */

router.get('/chat/:chatId', async (req, res) => {

  try {

    const chat = await Chat.findById(
      req.params.chatId
    );

    res.json({
      success: true,
      chat,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});

/* ======================================================
   DELETE CHAT
====================================================== */

router.delete(
  '/delete/:chatId',
  async (req, res) => {

    try {

      await Chat.findByIdAndDelete(
        req.params.chatId
      );

      res.json({
        success: true,
        message:
          'Chat deleted successfully',
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* ======================================================
   AI REPORT GENERATOR
====================================================== */

router.post('/report', async (req, res) => {

  try {

    const { topic } = req.body;

    const prompt = `
Generate a professional sustainability report on:

${topic}

Include:
- Environmental problem
- Global impact
- AI solutions
- Action plan
- Future sustainability benefits
`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',

      {
        model: 'openai/gpt-3.5-turbo',

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
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          'HTTP-Referer':
            'https://eco-ai-platform.onrender.com',

          'X-Title':
            'EcoLearn AI',

          'Content-Type':
            'application/json',
        },
      }
    );

    console.log(
      'REPORT RESPONSE:',
      response.data
    );

    const report =
      response.data?.choices?.[0]
        ?.message?.content ||
      'No report generated';

    res.json({
      success: true,
      report,
    });

  } catch (error) {

    console.log(
      'REPORT ERROR:',
      error.response?.data ||
      error.message
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