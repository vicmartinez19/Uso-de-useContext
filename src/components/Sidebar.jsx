import React from 'react';
import { useChatContext } from '../context/ChatContext';

function Sidebar() {
  const { state, createNewChat, selectSession, deleteSession, changeModel } = useChatContext();

  return (
    <aside style={{ width: '280px', background: '#111827', borderRight: '1px solid #1f2937', padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={createNewChat}
        style={{ background: '#0284c7', color: 'white', padding: '12px', borderRadius: '10px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        <span>+</span> Nuevo Chat
      </button>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
          Modelo de IA:
        </label>
        <select
          value={state.selectedModel}
          onChange={(e) => changeModel(e.target.value)}
          style={{ width: '100%', padding: '8px', fontSize: '0.85rem' }}
        >
          <option value="DevSeek R1 (1.1GB)">DevSeek R1 (Ligero)</option>
          <option value="Ollama DeepSeek Coder">Ollama Coder</option>
          <option value="GPT-Mini Context">GPT-Mini Context</option>
        </select>
      </div>

      <h4 style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>
        Conversaciones ({state.sessions.length})
      </h4>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {state.sessions.map((sess) => {
          const isActive = sess.id === state.activeSessionId;
          return (
            <div
              key={sess.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: isActive ? '#1e293b' : 'transparent',
                borderRadius: '8px',
                border: isActive ? '1px solid #38bdf8' : '1px solid transparent'
              }}
            >
              <button
                onClick={() => selectSession(sess.id)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  color: isActive ? '#38bdf8' : '#cbd5e1',
                  textAlign: 'left',
                  padding: '10px',
                  fontSize: '0.85rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                💬 {sess.title}
              </button>
              {state.sessions.length > 1 && (
                <button
                  onClick={() => deleteSession(sess.id)}
                  style={{ background: 'transparent', color: '#64748b', padding: '10px', fontSize: '0.8rem' }}
                  title="Eliminar chat"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;