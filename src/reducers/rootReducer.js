import { combineReducers } from 'redux';
import { SET_SEARCH_TERM, UPDATE_JOB_LISTINGS, TOGGLE_JOB_LISTING_STATUS, DELETE_JOB, SEE_JOB_DETAILS, SET_JOB_DESC, SET_USER_AUTH, SET_USER_JOBS, SET_SORT_FILTER } from '../actions/actionTypes';

const user = (state = false, action) => {
  if (action.type === SET_USER_AUTH) {
    return action.payload;
  }
  return state;
};

const searchTerm = (state = '', action) => {
  if (action.type === SET_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};

const jobAPIData = (state = {}, action) => {
  if (action.type === UPDATE_JOB_LISTINGS) {
    return Object.assign({}, state, { data: action.payload });
  }
  return state;
};
const userJobs = (state = [], action) => {
  if (action.type === TOGGLE_JOB_LISTING_STATUS) {
    return state.map(job => ((job.id === action.payload.jobListing.id) ?
      Object.assign({}, job, { status: action.payload.number }) : job));
  }
  if (action.type === DELETE_JOB) {
    return state.filter(job => job.id !== action.payload.id);
  }
  if (action.type === SET_USER_JOBS) {
    return action.payload;
  }
  return state;
};

const jobDetailsDisplay = (state = {}, action) => {
  if (action.type === SEE_JOB_DETAILS) {
    return Object.assign({}, state, { data: action.payload });
  }
  return state;
};

const jobDesc = (state = {}, action) => {
  if (action.type === SET_JOB_DESC) {
    return Object.assign({}, state, { data: action.payload });
  }
  return state;
};

const sortFilter = (state = '', action) => {
  if (action.type === SET_SORT_FILTER) {
    return action.payload;
  }
  return state;
};


const rootReducer = combineReducers({ user, searchTerm, jobAPIData, jobDetailsDisplay, userJobs, jobDesc, sortFilter });

export default rootReducer;
