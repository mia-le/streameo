import _ from 'lodash';
import {CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } from "../actions/types";

    //the state starts out by being a blank array of streams
export default (state={}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            // create a new object, use lodash's mapKeys
            // to take array from action.payload, create object with list of key value pairs, with keys being 'id, value being the array element
            // put ... in front so that only the key-value pairs are included, not the entire big object
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_STREAM:
            // we have to create a new object for Redux to dectect there has been changes in the store
            //                this syntax means adding a new key-value pair to the state array
            //                with the content being [key]:value
            return {...state, [action.payload.id]: action.payload}
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload}
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload}
        case DELETE_STREAM:
            //this uses lodash to make a new object without the item specified in the second param
            // does no have to say action.payload.id since deleteStream action's payload is the id
            return _.omit(state, action.payload)
        default:
            return state; 
    }
}