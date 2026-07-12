"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Settings, Sparkles, User, Zap, X, ChevronDown, 
  Menu, Cpu, Shield, LogOut 
} from 'lucide-react';

// --- Types ---
type Message = { id: string; role: 'user' | 'assistant'; text: string; };
type ModelTier = 'standard' | 'premium';

export default function AstryxApp() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: 'Welcome to ASTRYX NET. How can I assist you in navigating the cosmos of information today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // UI State
  const [activeModel, setActiveModel] = useState<ModelTier>('standard');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false); // Mock subscription state

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI Response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: activeModel === 'premium' 
          ? "Using the ASTRYX Ultra model. I've analyzed your request with advanced reasoning capabilities. Here is the highly detailed response..."
          : "Using the ASTRYX Standard model. Here is the information you requested."
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleModelSelect = (tier: ModelTier) => {
    if (tier === 'premium' && !isPremiumUser) {
      setIsSettingsOpen(true); // Prompt upgrade
    } else {
      setActiveModel(tier);
    }
    setIsModelDropdownOpen(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-slate-100 font-sans selection:bg-blue-500/30">
      {/* --- Cosmic Nebula Background --- */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950/80 via-blue-950/60 to-sky-900/40 backdrop-blur-[2px]" />

      {/* --- Main App Layout --- */}
      <div className="relative z-10 flex h-screen w-full flex-col md:flex-row">
        
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 md:hidden border-b border-white/10 bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold tracking-widest text-white">ASTRYX</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white/80 hover:text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar (Desktop & Mobile) */}
        <AnimatePresence>
          {(isMobileMenuOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
            <motion.div 
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className={`absolute md:relative z-40 h-full w-72 flex-col justify-between border-r border-white/10 bg-black/40 backdrop-blur-xl p-6 ${isMobileMenuOpen ? 'flex' : 'hidden md:flex'}`}
            >
              <div>
                <div className="hidden md:flex items-center gap-2 mb-10">
                  <Sparkles className="h-7 w-7 text-blue-400" />
                  <span className="text-2xl font-bold tracking-widest text-white drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">ASTRYX</span>
                </div>
                
                <button className="flex w-full items-center gap-3 rounded-xl bg-white/5 p-3 text-sm font-medium border border-white/10 transition-all hover:bg-white/10 hover:border-blue-400/50 mb-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    +
                  </span>
                  New Cosmic Thread
                </button>

                <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Recent Transmissions</div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="cursor-pointer truncate rounded-lg p-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                      Quantum mechanics explained...
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Settings className="h-5 w-5" /> Settings & Preferences
                </button>
                <div className="flex w-full items-center gap-3 rounded-lg p-2 text-sm text-white/70">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-black/50">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-white">Commander Shepard</div>
                    <div className="text-xs text-white/50">{isPremiumUser ? 'ASTRYX Pro' : 'Free Tier'}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col relative h-full max-h-screen">
          
          {/* Header & Model Switcher */}
          <header className="flex items-center justify-center p-4 md:p-6 relative z-30">
            <div className="relative">
              <button 
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-5 py-2.5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                {activeModel === 'standard' ? (
                  <Cpu className="h-4 w-4 text-indigo-400" />
                ) : (
                  <Zap className="h-4 w-4 text-blue-400" />
                )}
                <span className="font-medium text-sm">
                  {activeModel === 'standard' ? 'Astryx Standard' : 'Astryx Ultra'}
                </span>
                <ChevronDown className={`h-4 w-4 text-white/50 transition-transform ${isModelDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Model Dropdown */}
              <AnimatePresence>
                {isModelDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-64 rounded-2xl border border-white/10 bg-black/60 p-2 backdrop-blur-xl shadow-2xl"
                  >
                    <div 
                      onClick={() => handleModelSelect('standard')}
                      className={`cursor-pointer rounded-xl p-3 transition-colors hover:bg-white/10 ${activeModel === 'standard' ? 'bg-white/5 border border-white/10' : ''}`}
                    >
                      <div className="flex items-center gap-2 font-medium text-white"><Cpu className="h-4 w-4 text-indigo-400" /> Astryx Standard</div>
                      <div className="mt-1 text-xs text-white/50">Fast, everyday intelligence.</div>
                    </div>
                    <div 
                      onClick={() => handleModelSelect('premium')}
                      className={`mt-2 cursor-pointer rounded-xl p-3 transition-colors hover:bg-white/10 ${activeModel === 'premium' ? 'bg-white/5 border border-white/10' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-medium text-white"><Zap className="h-4 w-4 text-blue-400" /> Astryx Ultra</div>
                        {!isPremiumUser && <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">PRO</span>}
                      </div>
                      <div className="mt-1 text-xs text-white/50">Advanced reasoning, logic, and coding.</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide space-y-6 pb-32">
            <div className="mx-auto max-w-3xl space-y-8">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 shadow-lg ${msg.role === 'user' ? 'bg-gradient-to-br from-indigo-600 to-slate-800' : 'bg-gradient-to-br from-blue-500 to-sky-700'}`}>
                        {msg.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Sparkles className="h-4 w-4 text-white" />}
                      </div>
                      
                      {/* Message Bubble (Glassmorphism) */}
                      <div className={`rounded-2xl p-4 text-sm md:text-base leading-relaxed shadow-xl backdrop-blur-md border border-white/5 ${
                        msg.role === 'user' 
                          ? 'bg-white/10 text-white rounded-tr-sm' 
                          : 'bg-black/40 text-slate-200 rounded-tl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                   <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-blue-500 to-sky-700 shadow-lg">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div className="rounded-2xl rounded-tl-sm bg-black/40 border border-white/5 p-4 backdrop-blur-md flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                   </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-10">
            <div className="mx-auto max-w-3xl relative">
              <div className="relative flex items-center overflow-hidden rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg focus-within:border-blue-500/50 focus-within:bg-white/15 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Message ASTRYX..."
                  className="w-full bg-transparent px-6 py-4 text-white placeholder-white/40 focus:outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="mr-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 transition-all hover:bg-blue-500 hover:text-black disabled:opacity-30 disabled:hover:bg-blue-500/20 disabled:hover:text-blue-400"
                >
                  <Send className="h-5 w-5 ml-1" />
                </button>
              </div>
              <div className="text-center mt-2 text-[10px] text-white/30">
                ASTRYX AI may produce inaccurate information about people, places, or facts.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Settings / Paywall Modal --- */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-black/80 backdrop-blur-2xl p-6 shadow-2xl"
            >
              <button onClick={() => setIsSettingsOpen(false)} className="absolute right-4 top-4 text-white/50 hover:text-white">
                <X className="h-5 w-5" />
              </button>
              
              <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
              
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Commander Shepard</div>
                    <div className="text-xs text-white/50">shepard@normandy.space</div>
                  </div>
                </div>
              </div>

              {!isPremiumUser ? (
                <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-black p-5 text-center">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl" />
                  <Zap className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                  <h3 className="text-lg font-bold text-white mb-1">Upgrade to ASTRYX Pro</h3>
                  <p className="text-xs text-white/60 mb-4">Unlock Astryx Ultra, priority processing, and higher token limits.</p>
                  <button 
                    onClick={() => { setIsPremiumUser(true); setIsSettingsOpen(false); setActiveModel('premium'); }}
                    className="w-full rounded-xl bg-blue-500 py-2.5 text-sm font-bold text-black transition-all hover:bg-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  >
                    Subscribe for $19.99/mo
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-blue-500/30 bg-blue-900/20 p-4 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <div>
                    <div className="font-semibold text-blue-400">Pro Subscription Active</div>
                    <div className="text-xs text-white/50">Renews on Aug 1, 2026</div>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-2">
                <button className="flex w-full items-center justify-between rounded-xl p-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                  <span>Manage Data & Privacy</span>
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </button>
                <button className="flex w-full items-center gap-2 rounded-xl p-3 text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors">
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
                  }
