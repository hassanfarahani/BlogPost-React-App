import { SIGN_IN, SIGN_OUT, FETCH_POSTS, FETCH_POST, DELETE_POST, CREATE_POST } from './types';
import axios from 'axios';
import history from '../history';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = 'key=PAPERCLIP1234';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const fetchPosts = () => async dispatch => {
    const response = await axios.get(`${ROOT_URL}/posts?${API_KEY}`);
    dispatch ({ type: FETCH_POSTS, payload: response.data })
}

export const fetchPost = id => async dispatch => {
    const response = await axios.get(`${ROOT_URL}/posts/${id}?${API_KEY}`);
    dispatch({ type: FETCH_POST, payload: response.data })
}

export const deletePost = id => async dispatch => {
    const response = await axios.delete(`${ROOT_URL}/posts/${id}?${API_KEY}`)
    dispatch({ type: DELETE_POST, payload: id });
}

export const createPost = formValues => async dispatch => {
    const response = await axios.post(`${ROOT_URL}/posts?${API_KEY}`, formValues);
    dispatch({ type: CREATE_POST, payload: response.data});
    history.push('/');
}