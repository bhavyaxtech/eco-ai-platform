import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    /* =========================
       BASIC INFO
    ========================= */

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    /* =========================
       PROFILE
    ========================= */

    avatar: {
      type: String,
      default: '',
    },

    bio: {
      type: String,
      default: '',
      maxlength: 250,
    },

    country: {
      type: String,
      default: '',
    },

    /* =========================
       GAMIFICATION
    ========================= */

    points: {
      type: Number,
      default: 1200,
    },

    totalXP: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 1,
    },

    streak: {
      type: Number,
      default: 1,
    },

    longestStreak: {
      type: Number,
      default: 1,
    },

    completedQuizzes: {
      type: [Number],
      default: [],
    },

    quizzesCompletedCount: {
      type: Number,
      default: 0,
    },

    badges: {
      type: [String],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },

    rank: {
      type: String,
      default: 'Eco Starter 🌱',
    },

    /* =========================
       ECO IMPACT
    ========================= */

    co2Saved: {
      type: Number,
      default: 0,
    },

    waterSaved: {
      type: Number,
      default: 0,
    },

    plasticSaved: {
      type: Number,
      default: 0,
    },

    treesPlantedEquivalent: {
      type: Number,
      default: 0,
    },

    sustainabilityScore: {
      type: Number,
      default: 0,
    },

    /* =========================
       AI USAGE
    ========================= */

    aiQuestionsAsked: {
      type: Number,
      default: 0,
    },

    reportsGenerated: {
      type: Number,
      default: 0,
    },

    ecoAnalysesCompleted: {
      type: Number,
      default: 0,
    },

    /* =========================
       DAILY ACTIVITY
    ========================= */

    dailyLoginCount: {
      type: Number,
      default: 0,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    lastActive: {
      type: Date,
      default: Date.now,
    },

    /* =========================
       SETTINGS
    ========================= */

    darkMode: {
      type: Boolean,
      default: true,
    },

    notificationsEnabled: {
      type: Boolean,
      default: true,
    },

    language: {
      type: String,
      default: 'en',
    },

    /* =========================
       PREMIUM FEATURES
    ========================= */

    premiumUser: {
      type: Boolean,
      default: false,
    },

    premiumExpiresAt: {
      type: Date,
      default: null,
    },

    /* =========================
       SECURITY
    ========================= */

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: '',
    },
  },

  {
    timestamps: true,
  }
);

/* =========================
   AUTO LEVEL SYSTEM
========================= */

userSchema.pre('save', async function () {

  this.level =
    Math.max(
      1,
      Math.floor(this.totalXP / 500) + 1
    );

  if (this.points >= 5000) {

    this.rank =
      'Planet Guardian 🌍';

  } else if (
    this.points >= 3500
  ) {

    this.rank =
      'Eco Champion 🌱';

  } else if (
    this.points >= 2500
  ) {

    this.rank =
      'Green Warrior 🍃';

  } else if (
    this.points >= 1500
  ) {

    this.rank =
      'Nature Protector 🌿';

  } else {

    this.rank =
      'Eco Starter 🌱';
  }

});

export default mongoose.model(
  'User',
  userSchema
);