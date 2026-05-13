import React from 'react';

import {
  Leaf,
  Github,
  Twitter,
  Globe,
} from 'lucide-react';

function Footer() {

  return (

    <footer className="bg-slate-950 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* BRAND */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl">

                <Leaf className="h-6 w-6" />

              </div>

              <h2 className="text-3xl font-black">

                EcoLearn

              </h2>

            </div>

            <p className="text-gray-400 leading-relaxed">

              AI powered sustainability learning platform for modern students.

            </p>

          </div>

          {/* LINKS */}

          <div>

            <h3 className="font-bold text-xl mb-5">

              Platform

            </h3>

            <div className="space-y-3 text-gray-400">

              <p>Lessons</p>
              <p>Quizzes</p>
              <p>AI Assistant</p>
              <p>Leaderboard</p>

            </div>

          </div>

          {/* COMPANY */}

          <div>

            <h3 className="font-bold text-xl mb-5">

              Company

            </h3>

            <div className="space-y-3 text-gray-400">

              <p>About</p>
              <p>Careers</p>
              <p>Privacy</p>
              <p>Terms</p>

            </div>

          </div>

          {/* SOCIAL */}

          <div>

            <h3 className="font-bold text-xl mb-5">

              Connect

            </h3>

            <div className="flex gap-4">

              <div className="bg-slate-800 hover:bg-green-600 transition p-4 rounded-2xl cursor-pointer">

                <Github />

              </div>

              <div className="bg-slate-800 hover:bg-blue-500 transition p-4 rounded-2xl cursor-pointer">

                <Twitter />

              </div>

              <div className="bg-slate-800 hover:bg-emerald-500 transition p-4 rounded-2xl cursor-pointer">

                <Globe />

              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-14 pt-8 text-center text-gray-500">

          © 2025 EcoLearn. All rights reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;