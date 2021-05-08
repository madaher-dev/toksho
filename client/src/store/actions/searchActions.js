import { SET_SEARCH_LOADING } from './Types';
import axios from 'axios';
// const FormData = require('form-data');
const factory = require('./actionsFactory');

//Set search Loading
export const setSearchLoading = () => ({ type: SET_SEARCH_LOADING });

export const getSearchTopic = topic =>
  factory.get(
    `/api/v1/debates?topics=${topic}`,
    'GET_SEARCH',
    'GET_SEARCH_ERROR'
  );
