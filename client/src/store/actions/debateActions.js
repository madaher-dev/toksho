import {
  CLEAR_ERRORS,
  SET_DEBATE_LOADING,
  OPEN_CREATE_DEBATE,
  CLOSE_CREATE_DEBATE
} from './Types';
import axios from 'axios';
const factory = require('./actionsFactory');

// Create New Debate
export const createDebate = values =>
  factory.post(values, '/api/v1/debates/', 'DEBATE_ADDED', 'DEBATE_ERROR');

// Get all debates

export const getAllDebates = () =>
  factory.get(`/api/v1/debates/`, 'GET_ALL_DEBATES', 'DEBATE_ERROR');

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Set Loading
export const setLoading = () => ({ type: SET_DEBATE_LOADING });

// Open Create Debate Form
export const openModal = () => ({ type: OPEN_CREATE_DEBATE });

// Open Create Debate Form
export const closeModal = () => ({ type: CLOSE_CREATE_DEBATE });
