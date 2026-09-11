import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { chatReducer, initialChatState } from '../reducers/chatReducer';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);

  // Persistencia en localStorage
  useEffect(() => {
    const saved = localStorage.getItem("devfseek_global_context_state");
    if (saved) {
      try {
        dispatch({ type: "RESTORE_STATE", savedState: JSON.parse(saved) });
      } catch (e) {
        console.error("Error al restaurar contexto:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("devfseek_global_context_state", JSON.stringify(state));
  }, [state]);

  const sendMessage = (text) => {
    if (!text.trim() || !state.activeSessionId) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    dispatch({ type: "ADD_MESSAGE", sessionId: state.activeSessionId, message: userMsg });
    dispatch({ type: "SET_GENERATING", isGenerating: true });

    // Simulación de respuesta reactiva
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: `[${state.selectedModel}] Respuesta generada para: "${text}". Estado global gestionado de forma predecible con Context API.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      dispatch({ type: "ADD_MESSAGE", sessionId: state.activeSessionId, message: botMsg });
      dispatch({ type: "SET_GENERATING", isGenerating: false });
    }, 600);
  };

  const createNewChat = () => {
    dispatch({ type: "CREATE_SESSION", title: `Sesión ${state.sessions.length + 1}` });
  };

  const selectSession = (id) => {
    dispatch({ type: "SET_ACTIVE_SESSION", sessionId: id });
  };

  const deleteSession = (id) => {
    dispatch({ type: "DELETE_SESSION", sessionId: id });
  };

  const changeModel = (model) => {
    dispatch({ type: "SET_MODEL", model });
  };

  const activeSession = state.sessions.find((s) => s.id === state.activeSessionId) || null;

  const value = {
    state,
    activeSession,
    sendMessage,
    createNewChat,
    selectSession,
    deleteSession,
    changeModel
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext debe ser utilizado dentro de un ChatProvider.");
  }
  return context;
}