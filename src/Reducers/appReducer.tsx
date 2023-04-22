import * as Types from "../Constants/Types";

const initialState = {
  isLoading: false,
  currentView: "main",
  user: null,
};

type SetLoadingAction = { type: typeof Types.SET_IS_LOADING; value: boolean };
type SetCurrentViewAction = { type: typeof Types.SET_CURRENT_VIEW; value: string };
type SetCurrentClientAction = { type: typeof Types.SET_CURRENT_USER; value: UserType };

type AppReducerAction = SetLoadingAction | SetCurrentViewAction | SetCurrentClientAction;

export default function appReducer(state = initialState, action: AppReducerAction) {
  switch (action.type) {
    case Types.SET_IS_LOADING: {
      return { ...state, isLoading: action.value };
    }
    case Types.SET_CURRENT_VIEW: {
      return { ...state, currentView: action.value };
    }
    case Types.SET_CURRENT_USER: {
      return { ...state, user: action.value };
    }
    default:
      return state;
  }
}
