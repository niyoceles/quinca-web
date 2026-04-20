import {
  GET_HOME_ITEMS_SUCCESS,
  GET_HOME_ITEMS_FAILURE,
  GET_CATEGORY_ITEMS_SUCCESS,
  GET_CATEGORY_ITEMS_FAILURE,
  GET_TOURS_SUCCESS,
  GET_TOURS_FAILURE,
  GET_CARS_SUCCESS,
  GET_CARS_FAILURE,
  BOOKING,
  GET_CLIENT_BOOKINGS,
  GET_MY_PROFORMA_SUCCESS,
  GET_MY_PROFORMA_FAILURE,
  GET_CLIENT_BOOKINGS_FAILURE,
  GET_SINGLE_PROFORMA_SUCCESS,
  GET_SINGLE_PROFORMA_FAILURE,
  SEARCH_FAILURE,
  SEARCH_SUCCESS,
  REQUEST_PROFORMA_SUCCESS,
  REQUEST_PROFORMA_FAILURE,
  RESET_REQUEST_STATUS,
} from '../types';

const initialState = {
  homeItems: {},
  categoryItems: {},
  tours: {},
  cars: {},
  bookedItems: [],
  proformaItems: [],
  proformaItem: [],
  searchResults: null,
  requestSuccess: false,
  error: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROFORMA_SUCCESS:
      return {
        ...state,
        requestSuccess: true,
        error: '',
      };
    case REQUEST_PROFORMA_FAILURE:
      return {
        ...state,
        requestSuccess: false,
        error: action.payload,
      };
    case RESET_REQUEST_STATUS:
      return {
        ...state,
        requestSuccess: false,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: action.payload,
        error: '',
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case GET_HOME_ITEMS_SUCCESS:
      return {
        ...state,
        homeItems: action.payload,
        error: '',
      };
    case GET_HOME_ITEMS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_CATEGORY_ITEMS_SUCCESS:
      return {
        ...state,
        categoryItems: action.payload,
        error: '',
      };
    case GET_CATEGORY_ITEMS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_TOURS_SUCCESS:
      return {
        ...state,
        tours: action.payload,
        error: '',
      };
    case GET_TOURS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_CARS_SUCCESS:
      return {
        ...state,
        cars: action.payload,
        error: '',
      };
    case GET_CARS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case BOOKING:
      return {
        ...state,
        bookedItems: [
          ...state.bookedItems,
          ...action.payload,
        ],
      };
    case GET_CLIENT_BOOKINGS:
      return {
        ...state,
        bookedItems: [
          ...state.bookedItems,
          ...action.payload,
        ],
        error: '',
      };
    case GET_CLIENT_BOOKINGS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_MY_PROFORMA_SUCCESS:
      return {
        ...state,
        proformaItems: action.payload,
      };
    case GET_MY_PROFORMA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_SINGLE_PROFORMA_SUCCESS:
      return {
        ...state,
        proformaItem: action.payload,
      };
    case GET_SINGLE_PROFORMA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
