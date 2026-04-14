import {
  TOGGLE_SIDEBAR,
  SET_SIDEBAR_OPEN,
  CLEAR_ERRORS
} from '../types';

export const toggleSidebar = () => (dispatch) => {
  dispatch({ type: TOGGLE_SIDEBAR });
};

export const setSidebarOpen = (isOpen) => (dispatch) => {
  dispatch({
    type: SET_SIDEBAR_OPEN,
    payload: isOpen
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
