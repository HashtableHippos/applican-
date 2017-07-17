import { combineReducers } from 'redux';
import { SET_SEARCH_TERM, UPDATE_JOB_LISTINGS, TOGGLE_JOB_LISTING_STATUS, DELETE_JOB, SEE_JOB_DETAILS, SET_JOB_DESC, SET_USER_AUTH, SET_USER_JOBS, ADD_CONTACT } from '../actions/actionTypes';

const mockUserJobsData = [
  { id: 1,
    company: 'ZEDVentures Incorporated',
    date: '2017-07-10',
    detailUrl: 'http://www.dice.com/job/result/10342830/066933?src=19',
    jobTitle: 'Open Text Consultant',
    status: -1,
  },
  { id: 2,
    company: 'ZEDVentures Incorporated',
    date: '2017-07-10',
    detailUrl: 'http://www.dice.com/job/result/10342830/066933?src=19',
    jobTitle: 'Open Text Consultant',
    status: 4,
  },
];


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
const userJobs = (state = mockUserJobsData, action) => {
  if (action.type === TOGGLE_JOB_LISTING_STATUS) {
    return state.map(job => ((job.id === action.payload.jobListing.id) ?
      Object.assign({}, job, { status: action.payload.number }) : job));
  }
  if (action.type === DELETE_JOB) {
    return state.filter(job => job.id !== action.payload.id);
  }
  if (action.type === SET_USER_JOBS) {
    console.log(action.payload);
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

const rootReducer = combineReducers({ user, searchTerm, jobAPIData, jobDetailsDisplay, userJobs, jobDesc });

export default rootReducer;
