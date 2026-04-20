import {
  MESSAGES_LOADING,
  SET_CONVERSATIONS,
  SET_THREAD,
  ADD_MESSAGE,
  MESSAGES_ERROR,
} from '../types/messageTypes';

const initialState = {
  conversations: [],
  thread: [],
  loading: false,
  error: null,
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case MESSAGES_LOADING:
      return { ...state, loading: true, error: null };
    case SET_CONVERSATIONS:
      return { ...state, conversations: action.payload, loading: false };
    case SET_THREAD:
      return { ...state, thread: action.payload, loading: false };
    case ADD_MESSAGE:
      return { ...state, thread: [...state.thread, action.payload] };
    case MESSAGES_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
