import axios from 'axios';

const CREATE_MEETING = 'CREATE_MEETING';
const CANCEL_MEETINGS = 'CANCEL_MEETINGS';
const SET_MEETINGS = 'SET_MEETINGS';

const API_URL = 'https://boss-machine-rt4w.onrender.com';

export const setMeetings = (meetings) => {
  return {
    type: SET_MEETINGS,
    meetings,
  };
};

export const createMeeting = (meeting) => {
  return {
    type: CREATE_MEETING,
    meeting,
  };
};

export const cancelMeetings = () => {
  return {
    type: CANCEL_MEETINGS,
  };
};

export const createMeetingThunk = () => (dispatch) => {
  axios
    .post(`${API_URL}/api/meetings`)
    .then((res) => res.data)
    .then((createdMeeting) => {
      dispatch(createMeeting(createdMeeting));
    })
    .catch(console.error.bind(console));
};

export const cancelMeetingsThunk = () => (dispatch) => {
  axios
    .delete(`${API_URL}/api/meetings`)
    .then(() => {
      dispatch(cancelMeetings());
    })
    .catch(console.error.bind(console));
};

const initial = [];

export default (initialState = initial, action) => {
  switch (action.type) {
    case CREATE_MEETING:
      const newMeetings = [action.meeting, ...initialState];
      newMeetings.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      return newMeetings;
    case CANCEL_MEETINGS:
      return [];
    case SET_MEETINGS:
      return action.meetings;
    default:
      return initialState;
  }
};
