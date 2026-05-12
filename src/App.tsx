/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Car, 
  Clock, 
  ChevronRight, 
  Trees, 
  Waves, 
  Camera, 
  Utensils, 
  ShoppingBag, 
  Anchor, 
  Store, 
  Bike, 
  Milestone, 
  Sun, 
  Ship, 
  Zap,
  Info,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { TRIP_DATA, TRANSCRIPT_DATA, FULL_PLAN_TEXT, TripDay, TripStop } from './types';
import MapComponent from './components/MapComponent';
import Markdown from 'react-markdown';

const IconMap: { [key: string]: any } = {
  MapPin,
  Trees,
  Waves,
  Camera,
  Utensils,
  ShoppingBag,
  Anchor,
  Store,
  Bike,
  Milestone,
  Sun,
  Ship,
  Zap
};

 function StopCard({ stop }: { stop: TripStop }) {
  const Icon = IconMap[stop.icon || 'MapPin'] || MapPin;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex gap-4 p-4 rounded-xl bg-white shadow-sm border border-natural-stone hover:border-natural-tan transition-colors h-full"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-natural-bg flex items-center justify-center text-natural-accent border border-natural-border">
        <Icon size={18} />
      </div>
      <div>
        <h4 className="font-bold text-natural-accent mb-1">{stop.name}</h4>
        <p className="text-xs text-[#6B6459] leading-relaxed">{stop.description}</p>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const currentDay = TRIP_DATA[activeDay];

  return (
    <div className="min-h-screen bg-natural-bg font-sans text-natural-text selection:bg-natural-tan/20">
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-natural-border px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col text-center md:text-left cursor-pointer" onClick={() => setShowTranscript(false)}>
          <h1 className="text-3xl md:text-4xl font-serif-italic text-natural-accent">The Great Lakes Loop</h1>
          <p className="text-[10px] tracking-widest uppercase text-[#8B8477] mt-1 font-bold">A Scenic 5-Day Michigan Journey</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex space-x-8 text-sm font-medium uppercase tracking-tighter">
            <div className="flex flex-col items-center md:items-end">
              <span className="text-[#8B8477] text-[10px]">Total Distance</span>
              <span className="text-natural-accent">~800 Miles</span>
            </div>
            <div className="flex flex-col items-center md:items-end border-l border-natural-border pl-8">
              <span className="text-[#8B8477] text-[10px]">Duration</span>
              <span className="text-natural-accent">5 Days / 4 Nights</span>
            </div>
          </div>
          <button 
            onClick={() => setShowTranscript(!showTranscript)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              showTranscript 
                ? 'bg-natural-accent text-white border-natural-accent' 
                : 'bg-white text-natural-accent border-natural-border hover:border-natural-tan'
            }`}
          >
            <MessageSquare size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Full Text Plan</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!showTranscript ? (
          <>
            {/* Day Selector */}
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {TRIP_DATA.map((day, idx) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(idx)}
              className={`group flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-300 border ${
                activeDay === idx 
                  ? 'bg-white border-natural-tan shadow-sm' 
                  : 'bg-transparent border-transparent text-[#8B8477] hover:bg-natural-stone/30'
              }`}
            >
              <span className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${activeDay === idx ? 'text-natural-tan' : 'text-[#A39C8F]'}`}>Day</span>
              <span className={`text-2xl font-serif tracking-tighter ${activeDay === idx ? 'text-natural-accent' : 'text-[#B89E7E]'}`}>
                0{day.day}
              </span>
            </button>
          ))}
        </div>

        <div className="mb-10">
          <MapComponent activeDay={activeDay} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-2xl shadow-sm border border-natural-stone overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <h2 className="text-lg font-serif border-l-4 border-natural-tan pl-4 text-[#4A4339]">
                      Daily Route & Scenic Landmarks
                    </h2>
                    {(currentDay.driveTime || currentDay.distance) && (
                      <div className="flex gap-4 ml-auto text-[#8B8477] text-[10px] font-bold uppercase tracking-widest">
                        {currentDay.driveTime && (
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-natural-bg rounded-full border border-natural-border">
                            <Clock size={12} />
                            {currentDay.driveTime}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar size={14} className="text-natural-tan" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B8477]">{currentDay.date}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-natural-accent mb-2">
                      {currentDay.title}
                    </h3>
                    <p className="text-sm text-[#6B6459] leading-relaxed max-w-2xl">{currentDay.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentDay.stops.map((stop, i) => (
                      <div key={i}>
                        <StopCard stop={stop} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`evening-${activeDay}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-natural-accent text-[#FAF8F5] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-serif-italic">Nightfall Experience</h3>
                    <span className="text-[10px] border border-[#FAF8F5]/30 rounded-full px-2 py-0.5 uppercase tracking-widest font-bold">Evening</span>
                  </div>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed font-light">
                    "{currentDay.evening.description}"
                  </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto flex items-center gap-4 bg-white/10 p-6 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-natural-tan flex items-center justify-center text-natural-accent">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-tighter text-white/60">Overnight Base</span>
                    <span className="text-lg font-bold">{currentDay.evening.stay}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-natural-stone rounded-2xl p-6 border border-natural-border relative overflow-hidden group">
               <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6B6459 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
               <div className="relative z-10">
                 <h3 className="text-xs uppercase font-bold text-[#8B8477] tracking-widest mb-4">Day Highlights</h3>
                 <ul className="space-y-3">
                   {currentDay.highlights.map((h, i) => (
                     <li key={i} className="flex gap-3 text-sm text-[#4A4339]">
                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-natural-tan flex-shrink-0" />
                       {h}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-natural-border">
              <h3 className="text-xs uppercase font-bold text-[#8B8477] tracking-widest mb-4">Traveler's Log</h3>
              <div className="space-y-4">
                <div className="p-3 bg-natural-bg rounded-lg border border-natural-stone">
                  <span className="text-[10px] font-bold text-natural-tan uppercase block mb-1">Local Wisdom</span>
                  <p className="text-xs italic text-[#6B6459]">"The M-119 is narrow—take it slow and pull over for the lake view vistas."</p>
                </div>
                <div className="flex gap-2">
                   <div className="flex-1 bg-[#E7F0E7] p-2 rounded text-center">
                     <span className="block text-[10px] font-bold text-natural-accent">Bridges</span>
                     <span className="text-xs font-serif italic text-natural-accent">2 Total</span>
                   </div>
                   <div className="flex-1 bg-[#F2EFE9] p-2 rounded text-center">
                     <span className="block text-[10px] font-bold text-natural-tan">Lighthouses</span>
                     <span className="text-xs font-serif italic text-natural-tan">4 Visuals</span>
                   </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setActiveDay((activeDay + 1) % TRIP_DATA.length)}
              className="w-full bg-white border border-natural-border p-4 rounded-xl flex items-center justify-between group hover:border-natural-tan transition-colors"
            >
              <div className="text-left">
                <span className="text-[10px] font-bold text-[#8B8477] uppercase block">Next Destination</span>
                <span className="text-sm font-bold text-natural-accent">{TRIP_DATA[(activeDay + 1) % TRIP_DATA.length].title}</span>
              </div>
              <ChevronRight size={20} className="text-natural-tan group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Transcript Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-natural-stone overflow-hidden h-fit"
            >
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-serif-italic text-natural-accent mb-8 border-b border-natural-stone pb-6 flex items-center gap-2">
                  <MessageSquare size={20} />
                  Conversation Log
                </h2>
                <div className="space-y-6">
                  {TRANSCRIPT_DATA.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'User' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[9px] uppercase font-bold text-[#8B8477] mb-1 tracking-widest">{msg.role}</span>
                      <div className={`p-4 rounded-xl text-xs leading-relaxed max-w-[90%] ${
                        msg.role === 'User' 
                          ? 'bg-natural-bg text-natural-accent border border-natural-stone' 
                          : 'bg-natural-accent text-white'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Markdown Plan Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-natural-stone overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-serif-italic text-natural-accent mb-8 border-b border-natural-stone pb-6">
                  Full Itinerary Text
                </h2>
                <div className="prose prose-sm prose-slate max-w-none prose-headings:font-serif prose-headings:text-natural-accent prose-p:text-[#6B6459] prose-li:text-[#6B6459]">
                  <Markdown>{FULL_PLAN_TEXT}</Markdown>
                </div>
                <button 
                  onClick={() => setShowTranscript(false)}
                  className="mt-12 w-full py-4 bg-natural-accent text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-natural-accent/20 hover:bg-natural-accent/90 transition-colors"
                >
                  Back to Interactive Itinerary
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-6 bg-natural-bg border-t border-natural-border flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[10px] text-[#8B8477] uppercase tracking-widest font-bold">
          Adventure Map &copy; 2026 Michigan Scenic Expeditions
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[#6B6459] font-bold uppercase">Pro Tip:</span>
          <span className="text-[11px] italic text-[#4A4339]">"Always fill up gas in St. Ignace before heading deep into the UP."</span>
        </div>
      </footer>
    </div>
  );
}
