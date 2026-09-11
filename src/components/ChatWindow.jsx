import React, { useState } from 'react';
import { useChatContext } from '../context/ChatContext';

function ChatWindow() {
  const { activeSession, state, sendMessage } = useChatContext();
  const [input, setInput] = useState('');

  if (!activeSession) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
        Selecciona o crea una sesión en el panel lateral.
      </div>
    );
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || state.isGenerating) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '16px 24px', background: '#111827', borderBottom: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: '#f8fafc' }}>{activeSession.title}</h2>
          <span style={{ fontSize: '0.78rem', color: '#38bdf8' }}>Modelo activo: {state.selectedModel}</span>
        </div>
        <div style={{ fontSize: '0.8rem', background: '#1f2937', color: '#94a3b8', padding: '4px 10px', borderRadius: '6px' }}>
          useContext + useReducer
        </div>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '24px', maxWidth: '850px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {activeSession.messages.map((m) => (
          <div
            key={m.id}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              background: m.sender === 'user' ? '#0284c7' : '#1f2937',
              color: '#f8fafc',
              padding: '14px 18px',
              borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: m.sender === 'user' ? '#bae6fd' : '#94a3b8', marginBottom: '4px' }}>
              {m.sender === 'user' ? 'Tú' : 'DevfSeek Assistant'} • {m.timestamp}
            </div>
            <p style={{ fontSize: '0.95rem', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
              {m.text}
            </p>
          </div>
        ))}

        {state.isGenerating && (
          <div style={{ alignSelf: 'flex-start', background: '#1f2937', padding: '10px 16px', borderRadius: '10px', color: '#38bdf8', fontStyle: 'italic', fontSize: '0.85rem' }}>
            Generando respuesta en el contexto...
          </div>
        )}
      </main>

      <footer style={{ background: '#111827', borderTop: '1px solid #1f2937', padding: '16px 24px' }}>
        <form onSubmit={handleSend} style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mensaje para el chat global..."
            disabled={state.isGenerating}
            style={{ flex: 1, backgroundColor: '#1f2937' }}
          />
          <button
            type="submit"
            disabled={state.isGenerating || !input.trim()}
            style={{ background: '#0284c7', color: 'white', padding: '10px 22px' }}
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
}

export default ChatWindow;