
import { SET_SEARCH_TERM, UPDATE_JOB_LISTINGS, QUEUE_JOB_LISTING, DELETE_JOB, SEE_JOB_DETAILS } from './actionTypes';

export function setSearchTerm(searchTerm) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export function updateJobListings(jobListings) {
  return { type: UPDATE_JOB_LISTINGS, payload: jobListings };
}

export function queueJobListing(jobListing) {
  return { type: QUEUE_JOB_LISTING, payload: jobListing };
}

export function deleteJob(jobListing) {
  return { type: DELETE_JOB, payload: jobListing };
}

export function selectJobDetails(jobDetail) {
  return { type: SEE_JOB_DETAILS, payload: jobDetail };
}
