import express from 'express';

const router = express.Router();

const quizzes = [
  {
    id: 1,
    title: 'Climate Change Basics',
    questions: [
      {
        question: 'Which gas causes global warming?',
        options: [
          'Oxygen',
          'Carbon Dioxide',
          'Nitrogen',
          'Hydrogen',
        ],
        answer: 'Carbon Dioxide',
        fact: 'CO₂ traps heat in Earth’s atmosphere.',
      },

      {
        question: 'Which energy source is renewable?',
        options: [
          'Coal',
          'Petrol',
          'Solar',
          'Diesel',
        ],
        answer: 'Solar',
        fact: 'Solar energy comes from sunlight and never runs out.',
      },
    ],
  },

  {
    id: 2,
    title: 'Renewable Energy',
    questions: [
      {
        question: 'Which energy source uses sunlight?',
        options: [
          'Coal',
          'Solar',
          'Petrol',
          'Diesel',
        ],
        answer: 'Solar',
        fact: 'Solar panels convert sunlight into electricity.',
      },

      {
        question: 'Wind energy is produced using?',
        options: [
          'Wind Turbines',
          'Cars',
          'Factories',
          'Batteries',
        ],
        answer: 'Wind Turbines',
        fact: 'Wind turbines convert wind into electricity.',
      },
    ],
  },

  {
    id: 3,
    title: 'Ocean Conservation',
    questions: [
      {
        question: 'What harms marine life most?',
        options: [
          'Plastic Waste',
          'Seaweed',
          'Rain',
          'Sand',
        ],
        answer: 'Plastic Waste',
        fact: 'Plastic pollution kills millions of marine animals.',
      },

      {
        question: 'Which action protects oceans?',
        options: [
          'Dumping Waste',
          'Oil Spills',
          'Recycling',
          'Burning Plastic',
        ],
        answer: 'Recycling',
        fact: 'Recycling reduces ocean pollution.',
      },
    ],
  },
];

router.get('/', (req, res) => {
  res.json(quizzes);
});

router.get('/:id', (req, res) => {

  const quiz = quizzes.find(
    q => q.id === Number(req.params.id)
  );

  if (!quiz) {
    return res.status(404).json({
      message: 'Quiz not found',
    });
  }

  res.json(quiz);
});

export default router;