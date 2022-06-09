import {
  GET_ALL_PLANNINGS_FROM_ATHLETE,
  GET_ALL_PLANNINGS_FROM_ATHLETE_SUCCESS,
  GET_ALL_PLANNINGS_FROM_ATHLETE_FAIL,
} from '@storeData/actions/PlanningDetails/types';

interface Athlete {
  id: string;
  image: string | null;
  name: string;
  phone: string;
  birthdate: string;
  email: string;
  gender: string;
  createdAt: string;
  groupId: string | null;
  updatedAt: string;
  userType: string;
}

interface AthleteFromApi extends Athlete {
  created_at: string;
  group_id: string | null;
  updated_at: string;
  user_type: string;
}

interface PlanningDetailsState {
  // athletesFromGroup: Array<Athlete>;
  plannings: Array<any>;
  loading: Boolean;
}

const initialState: PlanningDetailsState = {
  plannings: [],
  loading: false,
};

const formatAthleteListData = (data: any): Array<Athlete> => {
  const athletes: Array<Athlete> = [];
  data.map(
    ({
      id,
      image,
      name,
      phone,
      birthdate,
      email,
      gender,
      created_at,
      group_id,
      updated_at,
      user_type,
    }: AthleteFromApi) => {
      athletes.push({
        id,
        image,
        name,
        phone,
        birthdate,
        email,
        gender,
        createdAt: created_at,
        groupId: group_id,
        updatedAt: updated_at,
        userType: user_type,
      });
    },
  );

  return athletes;
};

export const PlanningDetailsReducer = (
  state: PlanningDetailsState = initialState,
  action: StandardAction,
) => {
  switch (action.type) {
    case GET_ALL_PLANNINGS_FROM_ATHLETE:
      return { ...state, ...initialState, loading: true };
    case GET_ALL_PLANNINGS_FROM_ATHLETE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        ...initialState,
        // athletesFromGroup: formatAthleteListData(action.payload),
        plannings: action.payload,
      };
    case GET_ALL_PLANNINGS_FROM_ATHLETE_FAIL:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
