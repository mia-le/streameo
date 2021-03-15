import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

//auth: name of the state created by authReducer
export default combineReducers({ auth: authReducer, form: formReducer, streams: streamReducer });
