import streams from "../apis/streams";
import history from "../history";
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

//using redux thunk, set up in src index.js
export const createStream = (formValues) => {
  return async (dispatch,getState) => { 
    const {userId} = getState().auth; //auth is in React store's state (see React Dev Tool to see), add getState to ReduxThunk parameter to access the store
  //make post request by axios                 //merge values in formValues and auth
    const response = await streams.post("/streams", {...formValues, userId});
    dispatch({ type: CREATE_STREAM, payload: response.data });
    //Do some programmatic navigation to bring user back to root page
    history.push('/');
  }         
};

export const fetchStreams = () => {
  return async (dispatch) => {
  const response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
  }         
};

export const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({type:FETCH_STREAM, payload: response.data})
  }
}

export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`/streams/${id}`);
    dispatch({type:DELETE_STREAM, payload: id})
    //Do some programmatic navigation to bring user back to root page
    history.push('/');
  }
}

export const editStream = (id, formValues) => {
  return async (dispatch) => {
    //PATC instead of PUT request to only update SOME properites in API
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({type:EDIT_STREAM, payload: response.data})

    //Do some programmatic navigation to bring user back to root page
    history.push('/');
  }
}