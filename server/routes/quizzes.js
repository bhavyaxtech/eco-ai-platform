import express from 'express';

import User from '../models/User.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/* ======================================
   QUIZ DATA
====================================== */

const quizzes = [
  {
    id: 1,
    title: 'Climate Change Basics',

    questions: [
      {
        question:
          'Which gas causes global warming?',

        options: [
          'Oxygen',
          'Carbon Dioxide',
          'Nitrogen',
          'Hydrogen',
        ],

        answer:
          'Carbon Dioxide',

        fact:
          'CO₂ traps heat in Earth atmosphere.',
      },

      {
        question:
          'Which energy source is renewable?',

        options: [
          'Coal',
          'Petrol',
          'Solar',
          'Diesel',
        ],

        answer: 'Solar',

        fact:
          'Solar energy comes from sunlight.',
      },
    ],
  },

  {
    id: 2,
    title: 'Renewable Energy',

    questions: [
      {
        question:
          'Which energy source uses sunlight?',

        options: [
          'Coal',
          'Solar',
          'Petrol',
          'Diesel',
        ],

        answer: 'Solar',

        fact:
          'Solar panels convert sunlight into electricity.',
      },

      {
        question:
          'Wind energy is produced using?',

        options: [
          'Wind Turbines',
          'Cars',
          'Factories',
          'Batteries',
        ],

        answer:
          'Wind Turbines',

        fact:
          'Wind turbines convert wind into electricity.',
      },
    ],
  },

  {
    id: 3,
    title: 'Ocean Conservation',

    questions: [
      {
        question:
          'What harms marine life most?',

        options: [
          'Plastic Waste',
          'Seaweed',
          'Rain',
          'Sand',
        ],

        answer:
          'Plastic Waste',

        fact:
          'Plastic pollution kills marine life.',
      },

      {
        question:
          'Which action protects oceans?',

        options: [
          'Dumping Waste',
          'Oil Spills',
          'Recycling',
          'Burning Plastic',
        ],

        answer: 'Recycling',

        fact:
          'Recycling reduces ocean pollution.',
      },
    ],
  },
];

/* ======================================
   GET ALL QUIZZES
====================================== */

router.get('/', (req, res) => {

  res.json(quizzes);
});

/* ======================================
   GET SINGLE QUIZ
====================================== */

router.get('/:id', (req, res) => {

  const quiz = quizzes.find(
    (q) =>
      q.id === Number(req.params.id)
  );

  if (!quiz) {

    return res.status(404).json({
      message:
        'Quiz not found',
    });
  }

  res.json(quiz);
});

/* ======================================
   COMPLETE QUIZ
====================================== */

router.post(
  '/complete',
  authMiddleware,

  async (req, res) => {

    try {

      const {
        quizId,
        score,
      } = req.body;

      const user =
        req.user;

      const quiz =
        quizzes.find(
          (q) =>
            q.id === quizId
        );

      if (!quiz) {

        return res.status(404).json({
          message:
            'Quiz not found',
        });
      }

      /* XP CALCULATION */

      const earnedXP =
        score * 50;

      /* ADD POINTS */

      user.points += earnedXP;

      user.totalXP += earnedXP;

      /* LEVEL SYSTEM */

      user.level =
        Math.floor(
          user.totalXP / 300
        ) + 1;

      /* STREAK */

      user.streak += 1;

      /* QUIZ HISTORY */

      if (
        !user.completedQuizzes.includes(
          quizId
        )
      ) {

        user.completedQuizzes.push(
          quizId
        );
      }

      /* ECO IMPACT */

      user.co2Saved +=
        score * 2;

      user.waterSaved +=
        score * 5;

      user.plasticSaved +=
        score * 1;

      /* ACHIEVEMENTS */

      const achievements =
        [];

      if (
        user.totalXP >= 500 &&
        !user.achievements.includes(
          'Eco Beginner'
        )
      ) {

        user.achievements.push(
          'Eco Beginner'
        );

        achievements.push(
          'Eco Beginner'
        );
      }

      if (
        user.totalXP >= 1500 &&
        !user.achievements.includes(
          'Green Warrior'
        )
      ) {

        user.achievements.push(
          'Green Warrior'
        );

        achievements.push(
          'Green Warrior'
        );
      }

      if (
        user.totalXP >= 3000 &&
        !user.achievements.includes(
          'Planet Guardian'
        )
      ) {

        user.achievements.push(
          'Planet Guardian'
        );

        achievements.push(
          'Planet Guardian'
        );
      }

      /* BADGES */

      if (
        user.level >= 5 &&
        !user.badges.includes(
          'Level 5 Explorer'
        )
      ) {

        user.badges.push(
          'Level 5 Explorer'
        );
      }

      if (
        user.streak >= 7 &&
        !user.badges.includes(
          '7 Day Streak'
        )
      ) {

        user.badges.push(
          '7 Day Streak'
        );
      }

      user.lastActive =
        new Date();

      await user.save();

      res.json({

        success: true,

        earnedXP,

        totalPoints:
          user.points,

        level:
          user.level,

        streak:
          user.streak,

        achievements,

        badges:
          user.badges,

        environmentalImpact: {

          carbonSaved:
            user.co2Saved,

          waterSaved:
            user.waterSaved,

          plasticSaved:
            user.plasticSaved,
        },
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          'Server error',
      });
    }
  }
);

export default router;