import {
  SIGN_UP_SENDING_DATA,
  SIGN_UP_SENDING_ATHLETE_IMAGE,
  SIGN_UP_SENDING_GROUP_IMAGE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  GET_GROUP_LIST,
  GET_GROUP_LIST_FAIL,
  GET_GROUP_LIST_SUCCESS,
} from '@storeData/actions/SignUp/types';

interface Group {
  id: string;
  image: string;
  name: string;
  athletesQuantity: number;
  sportName: string;
  advisorName: string;
  advisorId: string;
}

interface GroupFromApi extends Group {
  athletes_quantity: number;
  sport_name: string;
  advisor_name: string;
  advisor_id: string;
}

interface SignUpState {
  groupList: Array<Group>;
  loading: boolean;
  sendingData: boolean;
  sendingAthleteImage: boolean;
  sendingGroupImage: boolean;
}

const signUpInitialState: SignUpState = {
  groupList: [],
  loading: false,
  sendingData: false,
  sendingAthleteImage: false,
  sendingGroupImage: false,
};

const formatGroupListData = (data: any): Array<Group> => {
  const groupList: Array<Group> = [];
  data.map(
    ({
      id,
      image,
      name,
      athletes_quantity,
      sport_name,
      advisor_name,
      advisor_id,
    }: GroupFromApi) => {
      groupList.push({
        id,
        image,
        name,
        athletesQuantity: athletes_quantity,
        sportName: sport_name,
        advisorName: advisor_name,
        advisorId: advisor_id,
      });
    },
  );

  return groupList;
};

export const SignUpReducer = (state: SignUpState = signUpInitialState, action: StandardAction) => {
  switch (action.type) {
    case SIGN_UP_SENDING_DATA:
      return {
        ...state,
        sendingAthleteImage: false,
        sendingGroupImage: false,
        sendingData: true,
      };
    case SIGN_UP_SENDING_ATHLETE_IMAGE:
      return {
        ...state,
        sendingGroupImage: false,
        sendingData: false,
        sendingAthleteImage: true,
      };
    case SIGN_UP_SENDING_GROUP_IMAGE:
      return {
        ...state,
        sendingData: false,
        sendingAthleteImage: false,
        sendingGroupImage: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        sendingData: false,
        sendingAthleteImage: false,
        sendingGroupImage: false,
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        loading: false,
        sendingData: false,
        sendingAthleteImage: false,
        sendingGroupImage: false,
      };
    case GET_GROUP_LIST:
      return { ...state, ...signUpInitialState, loading: true };
    case GET_GROUP_LIST_SUCCESS:
      return { ...state, ...signUpInitialState, groupList: formatGroupListData(action.payload) };
    case GET_GROUP_LIST_FAIL:
      return {
        ...state,
        ...signUpInitialState,
      };
    default:
      return state;
  }
};
