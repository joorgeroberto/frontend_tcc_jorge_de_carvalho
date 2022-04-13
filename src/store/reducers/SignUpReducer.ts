import {
  SIGN_UP_SENDING_DATA,
  SIGN_UP_SENDING_ATHLETE_IMAGE,
  SIGN_UP_SENDING_GROUP_IMAGE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from '@storeData/actions/SignUp/types';

interface SignUpState {
  sending_data: boolean;
  sending_athlete_image: boolean;
  sending_group_image: boolean;
}

const signUpInitialState: SignUpState = {
  sending_data: false,
  sending_athlete_image: false,
  sending_group_image: false,
};

export const SignUpReducer = (state: SignUpState = signUpInitialState, action: StandardAction) => {
  switch (action.type) {
    case SIGN_UP_SENDING_DATA:
      return { ...state, sending_data: true };
    case SIGN_UP_SENDING_ATHLETE_IMAGE:
      return { ...state, sending_athlete_image: true };
    case SIGN_UP_SENDING_GROUP_IMAGE:
      return { ...state, sending_group_image: true };
    case SIGN_UP_SUCCESS:
      return { ...state, ...signUpInitialState };
    case SIGN_UP_FAIL:
      return { ...state, ...signUpInitialState };
    default:
      return state;
  }
};
