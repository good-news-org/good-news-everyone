import { combineReducers } from 'redux';
import { authReducer } from '../auth/authReducer';
import { reducer as formReducer } from 'redux-form';

export const appReducer = combineReducers({
  form: formReducer,
  auth: authReducer
});
