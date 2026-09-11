export const initialChatState = {
  activeSessionId: 1,
  sessions: [
    {
      id: 1,
      title: "Introducción a React & Hooks",
      messages: [
        {
          id: 101,
          sender: 'assistant',
          text: '¡Hola! Este chat está gestionado globalmente con Context API y useReducer. ¡Dile adiós al prop drilling!',
          timestamp: '10:00 AM'
        }
      ]
    }
  ],
  selectedModel: "DevSeek R1 (1.1GB)",
  theme: "dark",
  isGenerating: false
};

export function chatReducer(state, action) {
  switch (action.type) {
    case "ADD_MESSAGE": {
      const { sessionId, message } = action;
      return {
        ...state,
        sessions: state.sessions.map((sess) =>
          sess.id === sessionId
            ? { ...sess, messages: [...sess.messages, message] }
            : sess
        )
      };
    }

    case "CREATE_SESSION": {
      const newSession = {
        id: Date.now(),
        title: action.title || `Chat #${state.sessions.length + 1}`,
        messages: [
          {
            id: Date.now() + 1,
            sender: 'assistant',
            text: 'Nueva sesión iniciada. ¿De qué te gustaría hablar?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      return {
        ...state,
        activeSessionId: newSession.id,
        sessions: [newSession, ...state.sessions]
      };
    }

    case "DELETE_SESSION": {
      const filtered = state.sessions.filter((s) => s.id !== action.sessionId);
      const nextActiveId = filtered.length > 0 ? filtered[0].id : null;
      return {
        ...state,
        sessions: filtered,
        activeSessionId: nextActiveId
      };
    }

    case "SET_ACTIVE_SESSION":
      return {
        ...state,
        activeSessionId: action.sessionId
      };

    case "SET_MODEL":
      return {
        ...state,
        selectedModel: action.model
      };

    case "SET_GENERATING":
      return {
        ...state,
        isGenerating: action.isGenerating
      };

    case "RESTORE_STATE":
      return action.savedState;

    default:
      return state;
  }
}