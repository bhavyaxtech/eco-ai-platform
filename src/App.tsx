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

import AIAssistant from './pages/AIAssistant';

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

                {/* AUTH */}

                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route
                  path="/register"
                  element={<Register />}
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

                {/* LESSON DETAIL PAGE */}

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

                {/* AI ASSISTANT */}

                <Route
                  path="/ai-assistant"
                  element={
                    <ProtectedRoute>
                      <AIAssistant />
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