import { combineReducers } from 'redux';
import { RegisterReducer } from './RegisterReducer';
import { LoginReducer } from './LoginReducer';
import { SignUpReducer } from './SignUpReducer';
import { SelectAthleteReducer } from './SelectAthleteReducer';
import { CreatePlanningReducer } from './CreatePlanningReducer';

export default combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  signUp: SignUpReducer,
  selectAthlete: SelectAthleteReducer,
  createPlanning: CreatePlanningReducer,
});
