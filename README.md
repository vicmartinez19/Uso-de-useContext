# Actividad 3: Estado Global con Context API (useContext y useReducer)

## 📌 Descripción del Proyecto (Entrega Parte 3)
Esta entrega elimina por completo el *prop drilling* en la aplicación DevfSeek mediante el uso de la **Context API** y **useReducer**:
- Creación de `ChatContext` y envoltorio `ChatProvider`.
- Arquitectura de reducer para acciones (`ADD_MESSAGE`, `CREATE_SESSION`, `DELETE_SESSION`, `SET_ACTIVE_SESSION`, `SET_MODEL`).
- Consumo del estado global en componentes profundos (`Sidebar`, `ChatWindow`) con el custom hook `useChatContext()`.
- Soporte para múltiples sesiones de chat independientes con persistencia en `localStorage`.
- Selector global de modelo de IA.