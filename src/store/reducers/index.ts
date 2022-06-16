import { combineReducers } from 'redux';
import { RegisterReducer } from './RegisterReducer';
import { LoginReducer } from './LoginReducer';
import { SignUpReducer } from './SignUpReducer';
import { SelectAthleteReducer } from './SelectAthleteReducer';
import { CreatePlanningReducer } from './CreatePlanningReducer';
import { PlanningDetailsReducer } from './PlanningDetailsReducer';
import { PerformedTrainingReducer } from './PerformedTrainingReducer';

export default combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  signUp: SignUpReducer,
  selectAthlete: SelectAthleteReducer,
  createPlanning: CreatePlanningReducer,
  planningDetails: PlanningDetailsReducer,
  performedTraining: PerformedTrainingReducer,
});
