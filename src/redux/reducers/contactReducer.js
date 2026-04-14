import {
  CONTACT_SUCCESS,
  CONTACT_FAILURE,
  CONTACT_REQUEST,
  FETCH_INQUIRIES_REQUEST,
  FETCH_INQUIRIES_SUCCESS,
  FETCH_INQUIRIES_FAILURE,
  MARK_INQUIRY_READ_SUCCESS,
} from '../types';

const initialState = {
  contactData: null,
  contactSuccess: null,
  contactFailure: null,
  inquiries: [],
  inquiryLoading: false,
  inquiryError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONTACT_REQUEST:
      return {
        ...state,
        contactData: true,
      };
    case CONTACT_SUCCESS:
      return {
        ...state,
        contactSuccess: action.payload,
        contactFailure: null,
        contactData: null,
      };
    case CONTACT_FAILURE:
      return {
        ...state,
        contactSuccess: null,
        contactFailure: action.payload,
        contactData: null,
      };
    case FETCH_INQUIRIES_REQUEST:
      return {
        ...state,
        inquiryLoading: true,
      };
    case FETCH_INQUIRIES_SUCCESS:
      return {
        ...state,
        inquiries: action.payload,
        inquiryLoading: false,
        inquiryError: null,
      };
    case FETCH_INQUIRIES_FAILURE:
      return {
        ...state,
        inquiryLoading: false,
        inquiryError: action.payload,
      };
    case MARK_INQUIRY_READ_SUCCESS:
      return {
        ...state,
        inquiries: state.inquiries.map((iq) =>
          iq.id === action.payload ? { ...iq, isRead: true } : iq
        ),
      };
    default:
      return state;
  }
}
