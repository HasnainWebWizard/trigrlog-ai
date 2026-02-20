"use client";

import React, { useState, useEffect } from 'react';
import { Target, MessageSquare, Zap, Hash, Info } from 'lucide-react';
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


  // 🏛️ Fetch saved settings from Supabase when the page loads
  useEffect(() => {
    async function loadImperialSettings() {
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from('profiles')
          .select('selected_tone, keywords')
          .eq('id', session.user.id)
          .single();

        if (data) {
          setSelectedTone(data.selected_tone);
          setKeywords(data.keywords || '');
        }
      }
    }
    loadImperialSettings();
  }, [session]);

  // 🏛️ Save settings to the database

  // Update saveSettings:
  const saveSettings = async (newTone: string, newKeywords: string) => {
    if (!session?.user?.id) return;
    setIsSaving(true);

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: session.user.id,
        selected_tone: newTone,
        keywords: newKeywords,
        updated_at: new Date(),
      });

    if (error) console.error("Database Error:", error.message);
    setIsSaving(false);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#161b22] p-6 shadow-xl">
      <div className="mb-6">
        <h3 className="flex items-center gap-2 font-bold text-white text-lg">
          <Target size={18} className="text-cyan-400" />
          AI Personality
        </h3>
        <p className="text-xs text-gray-500 mt-1">Adjust how the AI drafts your posts.</p>
      </div>

      {/* Tone Selector */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Writing Tone</label>
        <div className="grid grid-cols-1 gap-2">
          {tones.map((tone) => (
            <button
              key={tone.id}
              onClick={() => {
                setSelectedTone(tone.id);
                saveSettings(tone.id, keywords); // Save on click
              }}
              className={`flex flex-col items-start rounded-xl border p-3 transition-all text-left ${selectedTone === tone.id
                ? 'border-cyan-500/50 bg-cyan-500/5 ring-1 ring-cyan-500/20'
                : 'border-white/5 bg-black/20 hover:border-white/20'
                }`}
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

      {/* SEO Keywords */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-1">
            <Hash size={12} /> Keywords
          </label>
        </div>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onBlur={() => saveSettings(selectedTone, keywords)} // Save when you click away
          placeholder="e.g. TypeScript, AWS, TDD"
          className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white focus:border-cyan-500/50 focus:outline-none transition-all"
        />
      </div>

      {/* Footer Note */}
      <div className="mt-6 rounded-lg bg-cyan-500/5 border border-cyan-500/10 p-3">
        <p className="text-[10px] text-cyan-500/80 leading-relaxed italic">
          "The archives will remember your choice even across sessions, My Lord."
        </p>
      </div>
    </div>
  );
}