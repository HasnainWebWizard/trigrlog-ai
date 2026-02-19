"use client";

import React from 'react';
import { X, Globe, ThumbsUp, MessageSquare, Share2, Send } from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export default function PreviewModal({ isOpen, onClose, content }: PreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-[#1d2226] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h3 className="text-sm font-bold text-white">Post Preview</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* LinkedIn Mockup Body */}
        <div className="p-4">
          <div className="flex items-start gap-3 mb-4">
            {/* Ayakaa's Avatar Placeholder */}
            <div className="h-12 w-12 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 border-2 border-[#1d2226]" />
            <div>
              <div className="text-sm font-bold text-white hover:text-blue-400 cursor-pointer">Ayakaa</div>
              <div className="text-[11px] text-gray-400">Full Stack Developer • Now</div>
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <Globe size={10} /> 
                <span>Public</span>
              </div>
            </div>
          </div>

          {/* The Content */}
          <div className="text-sm leading-relaxed text-gray-200 mb-6 whitespace-pre-wrap">
            {content}
          </div>

          {/* LinkedIn Interaction Bar (Static) */}
          <div className="flex items-center justify-between border-t border-white/5 pt-3">
            <div className="flex items-center gap-4 text-gray-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-not-allowed"><ThumbsUp size={16} /> Like</span>
              <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-not-allowed"><MessageSquare size={16} /> Comment</span>
              <span className="flex items-center gap-1.5 hover:text-blue-400 cursor-not-allowed"><Share2 size={16} /> Repost</span>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 bg-black/20 p-4 border-t border-white/10">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Go Back
          </button>
          <button className="flex items-center gap-2 rounded-full bg-[#0a66c2] px-6 py-2 text-sm font-bold text-white hover:bg-[#004182] transition-colors">
            <Send size={16} />
            Publish to LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}