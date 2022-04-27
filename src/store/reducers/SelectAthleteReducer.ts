import {
  GET_ALL_ATHLETES_FROM_GROUP,
  GET_ALL_ATHLETES_FROM_GROUP_SUCCESS,
  GET_ALL_ATHLETES_FROM_GROUP_FAIL,
} from '@storeData/actions/SelectAthlete/types';

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

interface SelectAthleteState {
  athletesFromGroup: Array<Athlete>;
  loading: Boolean;
}

const selectAthleteInitialState: SelectAthleteState = {
  athletesFromGroup: [],
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

export const SelectAthleteReducer = (
  state: SelectAthleteState = selectAthleteInitialState,
  action: StandardAction,
) => {
  switch (action.type) {
    case GET_ALL_ATHLETES_FROM_GROUP:
      return { ...state, ...selectAthleteInitialState, loading: true };
    case GET_ALL_ATHLETES_FROM_GROUP_SUCCESS:
      return {
        ...state,
        ...selectAthleteInitialState,
        athletesFromGroup: formatAthleteListData(action.payload),
      };
    case GET_ALL_ATHLETES_FROM_GROUP_FAIL:
      return {
        ...state,
        ...selectAthleteInitialState,
      };
    default:
      return state;
  }
};
