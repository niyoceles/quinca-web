import axios from 'axios';
import {
  MESSAGES_LOADING,
  SET_CONVERSATIONS,
  SET_THREAD,
  ADD_MESSAGE,
  MESSAGES_ERROR,
} from '../types/messageTypes';

const { REACT_APP_BACKEND } = process.env;

const authConfig = () => ({
  headers: { Authorization: localStorage.getItem('IdToken') },
});

export const getConversations = () => (dispatch) => {
  dispatch({ type: MESSAGES_LOADING });
  axios
    .get(`${REACT_APP_BACKEND}/messages/conversations`, authConfig())
    .then((res) => dispatch({ type: SET_CONVERSATIONS, payload: res.data.data }))
    .catch((err) => dispatch({ type: MESSAGES_ERROR, payload: err.message }));
};

export const getThread = (partnerId) => (dispatch) => {
  dispatch({ type: MESSAGES_LOADING });
  axios
    .get(`${REACT_APP_BACKEND}/messages/${partnerId}`, authConfig())
    .then((res) => dispatch({ type: SET_THREAD, payload: res.data.data }))
    .catch((err) => dispatch({ type: MESSAGES_ERROR, payload: err.message }));
};

export const sendMessage = (receiverId, text) => (dispatch) => {
  axios
    .post(`${REACT_APP_BACKEND}/messages`, { receiverId, text }, authConfig())
    .then((res) => dispatch({ type: ADD_MESSAGE, payload: res.data.data }))
    .catch((err) => dispatch({ type: MESSAGES_ERROR, payload: err.message }));
};
