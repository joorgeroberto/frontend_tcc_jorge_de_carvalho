import { SET_REGISTER_NAME } from './types';

export const RegisterActions = {
  SetRegisterName: (payload: string): StandardAction => ({
    type: SET_REGISTER_NAME,
    payload,
  }),
};
