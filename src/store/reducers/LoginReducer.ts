import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from '@storeData/actions/Login/types';

interface LoginState {
  loading: boolean;
  token: string | null;
  athlete: Athlete | null;
}

interface Athlete {
  id: string;
  name: string;
  user_type: string | number;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
  created_at: string;
  token: string;
}

const formatAthleteData = (data: any): Athlete => {
  const {
    athlete: { id, name, user_type, email, phone, birthdate, gender, created_at },
    token,
  } = data;
  return { id, name, user_type, email, phone, birthdate, gender, created_at, token };
};

const loginInitialState: LoginState = {
  loading: false,
  token: null,
  athlete: null,
};

export const LoginReducer = (state: LoginState = loginInitialState, action: StandardAction) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, ...loginInitialState, athlete: formatAthleteData(action.payload) };
    case LOGIN_FAIL:
      return { ...state, ...loginInitialState };
    default:
      return state;
  }
};
