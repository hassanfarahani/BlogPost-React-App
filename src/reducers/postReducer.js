import { FETCH_POSTS, FETCH_POST, DELETE_POST, CREATE_POST } from '../actions/types';
import _ from 'lodash';

export default (state={}, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return { ...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_POST:
            return { ...state, [action.payload.id]: action.payload }
        case CREATE_POST:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_POST:
            return _.omit(state, action.payload)
        default:
            return state;
    }
}