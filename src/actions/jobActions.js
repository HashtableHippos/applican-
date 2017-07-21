import { SET_SEARCH_TERM, SEE_JOB_DETAILS, SET_JOB_DESC, ADD_CONTACT, SET_USER_NOTES } from './actionTypes';

export function setSearchTerm(searchTerm) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export function selectJobDetails(jobDetail) {
  return { type: SEE_JOB_DETAILS, payload: jobDetail };
}

export function setJobDesc(jobDesc) {
  return { type: SET_JOB_DESC, payload: jobDesc };
}

export function addContact(name, position, Email, FollowUp, id) {
  return { type: ADD_CONTACT, payload: { name, position, Email, FollowUp, id } };
}

export function addContactApi(name, position, Email, FollowUp, id) {
  return (dispatch) => {
    axios.post('api/contacts', { name, position, Email, FollowUp, id } )
      .then((res) => {
        return dispatch(addContact(name, position, Email, FollowUp, id ));
      })
      .catch(err => console.error(err));
  };
}

export function setUserNotes(notes) {
  return { type: SET_USER_NOTES, payload: notes };
}

