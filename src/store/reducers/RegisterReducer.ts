import { SET_REGISTER_NAME } from '@storeData/actions/Register/types';

interface RegisterState {
  name: string | undefined;
}

const registerInitialState: RegisterState = {
  name: undefined,
};

export const RegisterReducer = (
  state: RegisterState = registerInitialState,
  action: StandardAction,
) => {
  switch (action.type) {
    case SET_REGISTER_NAME:
      return { ...state, name: action.payload };

    default:
      return state;
  }
};
