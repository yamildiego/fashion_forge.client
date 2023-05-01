import * as Types from "../Constants/Types";

const initialState = {
  isLoading: false,
  user: undefined,
  openModal: false,
  job: null,
  errors: [],
};

type SetLoadingAction = { type: typeof Types.SET_IS_LOADING; value: boolean };
type SetCurrentViewAction = { type: typeof Types.SET_CURRENT_VIEW; value: string };
type SetCurrentClientAction = { type: typeof Types.SET_CURRENT_USER; value: UserType };
type SetOpenModalAction = { type: typeof Types.SET_OPEN_MODAL; value: boolean };
type SetJobAction = { type: typeof Types.SET_JOB; value: JobType };
type AddErrorAction = { type: typeof Types.ADD_ERROR; value: ErrorType };
type RemoveErrorAction = { type: typeof Types.REMOVE_ERROR; value: number };

type AppReducerAction =
  | SetLoadingAction
  | SetCurrentViewAction
  | SetCurrentClientAction
  | SetOpenModalAction
  | SetJobAction
  | AddErrorAction
  | RemoveErrorAction;

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
    case Types.SET_OPEN_MODAL: {
      return { ...state, openModal: action.value };
    }
    case Types.SET_JOB: {
      return { ...state, job: action.value };
    }
    case Types.ADD_ERROR: {
      return { ...state, errors: [...state.errors, { ...action.value, datetime: Date.now(), opacity: 1 }] };
    }
    case Types.REMOVE_ERROR: {
      let errors: ErrorType[] = state.errors.filter((error: ErrorType) => error.key !== action.value);
      return { ...state, errors };
    }
    default:
      return state;
  }
}
