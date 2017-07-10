import { combineReducers } from 'redux';
import { SET_SEARCH_TERM, UPDATE_JOB_LISTINGS, QUEUE_JOB_LISTING, DELETE_JOB, SEE_JOB_DETAILS } from '../actions/actionTypes';

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
  if (action.type === QUEUE_JOB_LISTING) {
    return state.map(job => ((job.id === action.payload.id) ?
      Object.assign({}, job, { status: 0 }) : job));
  }
  if (action.type === DELETE_JOB) {
    return state.filter(job => job.id !== action.payload.id);
  }
  return state;
};

const jobDetailsDisplay = (state = {}, action) => {
  if (action.type === SEE_JOB_DETAILS) {
    return Object.assign({}, state, { data: action.payload });
  }
  return state;
};

const rootReducer = combineReducers({ searchTerm, jobAPIData, jobDetailsDisplay, userJobs });

export default rootReducer;
