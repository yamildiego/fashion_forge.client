import * as Types from "../Constants/Types";

const initialState = {
  isLoading: false,
  currentView: "jobs",
};

type SetLoadingAction = { type: typeof Types.SET_IS_LOADING; value: boolean };
type SetCurrentFilterAction = { type: typeof Types.SET_CURRENT_VIEW; value: string };

type AppReducerAction = SetCurrentFilterAction | SetLoadingAction;

export default function appReducer(state = initialState, action: AppReducerAction) {
  switch (action.type) {
    case Types.SET_IS_LOADING: {
      return { ...state, isLoading: action.value };
    }
    case Types.SET_CURRENT_VIEW: {
      return { ...state, currentView: action.value };
    }
    default:
      return state;
  }
}
