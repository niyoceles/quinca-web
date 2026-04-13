import axios from 'axios';
import {
  SET_NOTIFICATIONS,
  ADD_NOTIFICATION,
  MARK_NOTIFICATION_READ,
  NOTIFICATIONS_LOADING,
  NOTIFICATIONS_ERROR
} from '../types/notificationTypes';
import { toast } from 'react-toastify';

const { REACT_APP_BACKEND } = process.env;

// Fetch notification history
export const getMyNotifications = () => (dispatch) => {
  dispatch({ type: NOTIFICATIONS_LOADING });
  
  const token = localStorage.getItem('IdToken');
  const config = {
    headers: {
      Authorization: token
    }
  };

  axios
    .get(`${REACT_APP_BACKEND}/notifications`, config)
    .then((res) => {
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: res.data.data
      });
    })
    .catch((err) => {
      dispatch({
        type: NOTIFICATIONS_ERROR,
        payload: err.response ? err.response.data.error : null
      });
    });
};

// Listen for real-time notifications via socket
export const addRealTimeNotification = (notification) => (dispatch) => {
  dispatch({
    type: ADD_NOTIFICATION,
    payload: notification
  });
  
  // Show a toast for instant feedback
  toast.info(`${notification.title}: ${notification.message}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Mark as read
export const markAsRead = (id) => (dispatch) => {
  const token = localStorage.getItem('IdToken');
  const config = {
    headers: {
      Authorization: token
    }
  };

  axios
    .patch(`${REACT_APP_BACKEND}/notifications/${id}/read`, {}, config)
    .then(() => {
      dispatch({
        type: MARK_NOTIFICATION_READ,
        payload: id
      });
    })
    .catch((err) => {
      console.error('Failed to mark notification as read', err);
    });
};
