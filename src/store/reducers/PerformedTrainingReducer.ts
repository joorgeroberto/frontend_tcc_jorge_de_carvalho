import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '@storeData/actions/PerformedTraining/types';

interface PerformedTrainingState {
  loading: boolean;
}

const initialState: PerformedTrainingState = {
  loading: false,
};

export const PerformedTrainingReducer = (
  state: PerformedTrainingState = initialState,
  action: StandardAction,
) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...initialState,
      };
    case REGISTER_FAIL:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
