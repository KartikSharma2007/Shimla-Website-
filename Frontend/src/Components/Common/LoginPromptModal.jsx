// src/Components/Common/LoginPromptModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, LogIn, UserPlus, Lock } from 'lucide-react';

export default function LoginPromptModal({ isOpen, onClose, message = 'Save your favourites' }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px'
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: '20px', padding: '36px 32px',
        maxWidth: '400px', width: '100%', position: 'relative',
        boxShadow: '0 25px 60px rgba(0,0,0,0.18)',
        animation: 'popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)'
      }} onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: '#f1f5f9', border: 'none', borderRadius: '50%',
          width: '32px', height: '32px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <X size={16} color="#64748b" />
        </button>

        {/* Icon */}
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <Heart size={28} color="#ef4444" fill="#ef4444" />
        </div>

        {/* Text */}
        <h2 style={{
          textAlign: 'center', fontSize: '20px', fontWeight: '700',
          color: '#0f172a', margin: '0 0 8px'
        }}>Save your favourites</h2>
        <p style={{
          textAlign: 'center', color: '#64748b', fontSize: '14px',
          margin: '0 0 28px', lineHeight: '1.5'
        }}>{message}</p>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => { navigate('/login'); onClose(); }} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            color: '#fff', border: 'none', borderRadius: '12px',
            padding: '14px', fontSize: '15px', fontWeight: '600',
            cursor: 'pointer', transition: 'opacity 0.2s'
          }}>
            <LogIn size={18} /> Login to your account
          </button>
          <button onClick={() => { navigate('/signup'); onClose(); }} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #059669, #10b981)',
            color: '#fff', border: 'none', borderRadius: '12px',
            padding: '14px', fontSize: '15px', fontWeight: '600',
            cursor: 'pointer', transition: 'opacity 0.2s'
          }}>
            <UserPlus size={18} /> Create free account
          </button>
          <button onClick={onClose} style={{
            background: 'none', border: '1.5px solid #e2e8f0', borderRadius: '12px',
            padding: '12px', fontSize: '14px', color: '#64748b',
            cursor: 'pointer', fontWeight: '500'
          }}>
            Maybe later
          </button>
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: 'center', fontSize: '12px', color: '#94a3b8',
          marginTop: '16px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '4px'
        }}>
          <Lock size={11} /> Your data is safe with us
        </p>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
