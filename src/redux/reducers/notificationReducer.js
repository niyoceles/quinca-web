import {
  SET_NOTIFICATIONS,
  ADD_NOTIFICATION,
  MARK_NOTIFICATION_READ,
  NOTIFICATIONS_LOADING,
  NOTIFICATIONS_ERROR
} from '../types/notificationTypes';

const initialState = {
  notifications: [],
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    case MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(n => 
          n.id === action.payload ? { ...n, isRead: true } : n
        )
      };
    case NOTIFICATIONS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
