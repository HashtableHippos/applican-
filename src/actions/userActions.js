import axios from 'axios';
import { UPDATE_JOB_LISTINGS, TOGGLE_JOB_LISTING_STATUS, DELETE_JOB, SET_USER_JOBS, SET_SORT_FILTER } from './actionTypes';

export function updateJobListings(jobListings) {
  return { type: UPDATE_JOB_LISTINGS, payload: jobListings };
}

export function toggleJobListingStatus(jobListing, number) {
  return { type: TOGGLE_JOB_LISTING_STATUS, payload: { jobListing, number } };
}

export function updateJobStatusAPI(job, status) {
  return (dispatch) => {
    axios.put(`/api/jobs/${job.id}`, { status })
      .then(() => dispatch(toggleJobListingStatus(job, status)))
      .catch(err => console.log(err));
  };
}

export function deleteJob(jobListing) {
  return { type: DELETE_JOB, payload: jobListing };
}
export function deleteJobAPI(job) {
  return (dispatch) => {
    axios.delete(`/api/jobs/${job.id}`)
      .then(() => dispatch(deleteJob(job)))
      .catch(err => console.log(err));
  };
}

export function setUserJobs(jobs) {
  return { type: SET_USER_JOBS, payload: jobs };
}

export function fetchUserJobs() {
  return (dispatch) => {
    axios.get('api/user/')
      .then((res) => {
        console.log(res.data);
        return dispatch(setUserJobs(res.data));
      })
      .catch(err => console.log(err));
  };
}

export function setSortFilter(filter) {
  return { type: SET_SORT_FILTER, payload: filter };
}
