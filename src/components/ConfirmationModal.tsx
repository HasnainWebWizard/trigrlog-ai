import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export default function ConfirmationModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message 
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#0d1117] p-6 rounded-2xl border border-white/10 shadow-2xl w-full max-w-sm mx-4 transform transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                        <AlertCircle size={24} />
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <h3 className="text-white font-bold text-lg">{title}</h3>
                <p className="text-gray-400 text-sm mt-2 mb-6">
                    {message}
                </p>
                <div className="flex gap-3">
                    <button 
                        onClick={onClose} 
                        className="flex-1 px-4 py-2 bg-[#161b22] text-gray-300 rounded-lg text-sm font-bold hover:bg-[#1c222b]"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="cursor-pointer flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}