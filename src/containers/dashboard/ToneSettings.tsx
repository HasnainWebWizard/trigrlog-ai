"use client";

import React, { useState, useEffect } from 'react';
import { Target, MessageSquare, Zap, Hash, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSession } from "next-auth/react";

const tones = [
  { id: 'tech', name: 'Technical', desc: 'Deep-dive style for engineers', icon: <Zap size={14} /> },
  { id: 'casual', name: 'Casual', desc: 'Friendly, community-focused', icon: <MessageSquare size={14} /> },
  { id: 'job', name: 'Job Hunter', desc: 'Professional & SEO optimized', icon: <Target size={14} /> },
];

export default function ToneSettings() {
  const { data: session } = useSession();
  const [selectedTone, setSelectedTone] = useState('tech');
  const [keywords, setKeywords] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      if (session?.user?.id) {
        const { data } = await supabase
          .from('profiles')
          .select('selected_tone, keywords')
          .eq('id', session.user.id)
          .single();

        if (data) {
          setSelectedTone(data.selected_tone || 'casual');
          setKeywords(data.keywords || '');
        }
      }
    }
    loadSettings();
  }, [session]);

  // 🏛️ The Master Save Function
  const saveSettings = async (toneToSave: string, keywordsToSave: string) => {
    if (!session?.user?.id) return;
    
    setIsSaving(true);
    
    // We use .update() specifically to target the existing row
    const { error } = await supabase
      .from('profiles')
      .update({
        selected_tone: toneToSave,
        keywords: keywordsToSave,
        updated_at: new Date().toISOString(),
      })
      .eq('id', session.user.id);

    if (error) {
      console.error("🚨 Archive Write Error:", error.message);
      // If you see this in the console, the "write batch" error is blocking the save
    } else {
      setShowSavedFeedback(true);
      setTimeout(() => setShowSavedFeedback(false), 2000);
    }
    setIsSaving(false);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#161b22] p-6 shadow-xl">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="flex items-center gap-2 font-bold text-white text-lg">
            <Target size={18} className="text-cyan-400" />
            AI Personality
          </h3>
          <p className="text-xs text-gray-500 mt-1">Recalibrate the generation tone.</p>
        </div>
        
        {showSavedFeedback && (
          <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono animate-in fade-in slide-in-from-top-1">
            <Check size={12} /> SYNCED TO LEDGER
          </div>
        )}
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Writing Tone</label>
        <div className="grid grid-cols-1 gap-2">
          {tones.map((tone) => (
            <button
              key={tone.id}
              disabled={isSaving}
              onClick={async () => {
                // 🏛️ CRITICAL: Update state AND send the literal value to the DB
                setSelectedTone(tone.id);
                await saveSettings(tone.id, keywords);
              }}
              className={`flex flex-col items-start rounded-xl border p-3 transition-all text-left ${
                selectedTone === tone.id
                  ? 'border-cyan-500/50 bg-cyan-500/5 ring-1 ring-cyan-500/20'
                  : 'border-white/5 bg-black/20 hover:border-white/20'
              } disabled:opacity-50`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={selectedTone === tone.id ? 'text-cyan-400' : 'text-gray-400'}>
                  {tone.icon}
                </span>
                <span className={`text-sm font-semibold ${selectedTone === tone.id ? 'text-white' : 'text-gray-400'}`}>
                  {tone.name}
                </span>
              </div>
              <span className="text-[11px] text-gray-500 leading-tight">{tone.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-1">
          <Hash size={12} /> Priority Keywords
        </label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onBlur={() => saveSettings(selectedTone, keywords)}
          placeholder="e.g. TypeScript, AWS, TDD"
          className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-cyan-500/50 focus:outline-none transition-all"
        />
      </div>
    </div>
  );
}