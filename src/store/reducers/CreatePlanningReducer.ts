import {
  CREATE_PLANNING,
  CREATE_PLANNING_SUCCESS,
  CREATE_PLANNING_FAIL,
} from '@storeData/actions/CreatePlanning/types';

interface CreatePlanningState {
  loading: boolean;
}

const initialState: CreatePlanningState = {
  loading: false,
};

export const CreatePlanningReducer = (
  state: CreatePlanningState = initialState,
  action: StandardAction,
) => {
  switch (action.type) {
    case CREATE_PLANNING:
      return { ...state, loading: true };
    case CREATE_PLANNING_SUCCESS:
      return {
        ...state,
        ...initialState,
      };
    case CREATE_PLANNING_FAIL:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
