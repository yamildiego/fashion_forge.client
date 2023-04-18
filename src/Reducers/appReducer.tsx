import * as Types from "../Constants/Types";

const initialState = {
  currentView: "main",
};

type SetCurrentFilterAction = { type: typeof Types.SET_CURRENT_VIEW; value: string };
type AddFilteringAction = { type: typeof Types.SET_CURRENT_VIEW; value: string };

type AppReducerAction = SetCurrentFilterAction | AddFilteringAction;

export default function appReducer(state = initialState, action: AppReducerAction) {
  switch (action.type) {
    case Types.SET_CURRENT_VIEW: {
      return { ...state, currentView: action.value };
    }
    default:
      return state;
  }
}
