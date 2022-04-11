import { combineReducers } from 'redux';
import { RegisterReducer } from './RegisterReducer';
import { LoginReducer } from './LoginReducer';

export default combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
});
