import { SET_SEARCH_LOADING } from './Types';
import axios from 'axios';
// const FormData = require('form-data');
const factory = require('./actionsFactory');

//Set search Loading
export const setSearchLoading = () => ({ type: SET_SEARCH_LOADING });

export const getSearchTopic = topic =>
  factory.get(`/api/v1/debates?topics=${topic}`, 'GET_SEARCH', 'SEARCH_ERROR');

export const getSearch = query =>
  factory.get(
    `/api/v1/debates/search/?q=${query}`,
    'GET_SEARCH',
    'SEARCH_ERROR'
  );

export const getTopicsCloud = () =>
  factory.get(`/api/v1/debates/topics`, 'GET_TOPICS', 'SEARCH_ERROR');

export const getUsers = query =>
  factory.get(
    `/api/v1/users/search?q=${query}`,
    'GET_SEARCH_USERS',
    'SEARCH_ERROR'
  );
