import React from 'react';

import {
  Github,
  Twitter,
  Globe,
  Bot,
} from 'lucide-react';

function Footer() {

  return (

    <footer className="border-t border-white/5 bg-[#071018] text-white">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* BRAND */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">

                <Bot className="h-5 w-5 text-white" />

              </div>

              <div>

                <h2 className="text-xl font-bold tracking-tight">

                  EcoLearn AI

                </h2>

                <p className="text-sm text-emerald-400">

                  AI Support Platform

                </p>

              </div>

            </div>

            <p className="text-sm leading-7 text-gray-400 max-w-sm">

              Modern AI-powered customer support and automation platform
              built for smart businesses and intelligent workflows.

            </p>

          </div>

          {/* PRODUCT */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">

              Product

            </h3>

            <div className="space-y-3 text-sm text-gray-400">

              <p className="hover:text-white transition cursor-pointer">
                AI Assistant
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Voice AI
              </p>

              <p className="hover:text-white transition cursor-pointer">
                AI Reports
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Automation
              </p>

            </div>

          </div>

          {/* COMPANY */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">

              Company

            </h3>

            <div className="space-y-3 text-sm text-gray-400">

              <p className="hover:text-white transition cursor-pointer">
                About
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Privacy
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Terms
              </p>

              <p className="hover:text-white transition cursor-pointer">
                Contact
              </p>

            </div>

          </div>

          {/* SOCIAL */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">

              Connect

            </h3>

            <div className="flex gap-4">

              <button className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300">

                <Github className="h-5 w-5" />

              </button>

              <button className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 transition-all duration-300">

                <Twitter className="h-5 w-5" />

              </button>

              <button className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-all duration-300">

                <Globe className="h-5 w-5" />

              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">

            © 2025 EcoLearn AI. All rights reserved.

          </p>

          <p className="text-sm text-gray-500">

            Built with React, AI & Modern SaaS Design

          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;