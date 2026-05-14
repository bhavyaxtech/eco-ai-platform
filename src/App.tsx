import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { Toaster } from 'react-hot-toast';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';

import UserDashboard from './pages/dashboard/UserDashboard';

import AIReports from './pages/ai/AIReports';
import CarbonCalculator from './pages/ai/CarbonCalculator';
import VoiceAssistant from './pages/ai/VoiceAssistant';
import AIAssistant from './pages/ai/AIAssistant';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Quizzes from './pages/quizzes/Quizzes';
import QuizGame from './pages/quizzes/QuizGame';

import Lessons from './pages/lessons/Lessons';
import LessonDetail from './pages/lessons/LessonDetail';

import Profile from './pages/profile/Profile';

import Friends from './pages/social/Friends';
import Leaderboard from './pages/social/Leaderboard';

import AdminDashboard from './pages/admin/Dashboard';

import { useAuthStore } from './lib/store';

const queryClient = new QueryClient();

function App() {

  const { darkMode } =
    useAuthStore();

  return (

    <QueryClientProvider client={queryClient}>

      <div className={darkMode ? 'dark' : ''}>

        <BrowserRouter>

          <Toaster position="top-right" />

          <div className="min-h-screen bg-[#f7fff9] dark:bg-slate-950 transition-all duration-500">

            <Navbar />

            <main className="pt-24 min-h-screen">

              <Routes>

                {/* HOME */}

                <Route
                  path="/"
                  element={<Home />}
                />

                {/* USER DASHBOARD */}

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* AUTH */}

                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route
                  path="/register"
                  element={<Register />}
                />

                {/* AI FEATURES */}

                <Route
                  path="/ai-chat"
                  element={
                    <ProtectedRoute>
                      <AIAssistant />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/ai-reports"
                  element={
                    <ProtectedRoute>
                      <AIReports />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/carbon-calculator"
                  element={
                    <ProtectedRoute>
                      <CarbonCalculator />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/voice-ai"
                  element={
                    <ProtectedRoute>
                      <VoiceAssistant />
                    </ProtectedRoute>
                  }
                />

                {/* QUIZZES */}

                <Route
                  path="/quizzes"
                  element={
                    <ProtectedRoute>
                      <Quizzes />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/quiz-game/:id"
                  element={
                    <ProtectedRoute>
                      <QuizGame />
                    </ProtectedRoute>
                  }
                />

                {/* LESSONS */}

                <Route
                  path="/lessons"
                  element={
                    <ProtectedRoute>
                      <Lessons />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/lesson/:id"
                  element={
                    <ProtectedRoute>
                      <LessonDetail />
                    </ProtectedRoute>
                  }
                />

                {/* PROFILE */}

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* FRIENDS */}

                <Route
                  path="/friends"
                  element={
                    <ProtectedRoute>
                      <Friends />
                    </ProtectedRoute>
                  }
                />

                {/* LEADERBOARD */}

                <Route
                  path="/leaderboard"
                  element={
                    <ProtectedRoute>
                      <Leaderboard />
                    </ProtectedRoute>
                  }
                />

                {/* ADMIN */}

                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

              </Routes>

            </main>

            <Footer />

          </div>

        </BrowserRouter>

      </div>

    </QueryClientProvider>
  );
}

export default App;