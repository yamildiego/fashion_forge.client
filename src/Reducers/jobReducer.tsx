import * as Types from "../Constants/Types";

const initValidationType = { value: "", error: false, helperText: "" };

const initialState = {
  formNewJob: {
    type_of_clothing: initValidationType,
    description: initValidationType,
    budget: initValidationType,
  },
};

type SetFormNewJobAction = { type: typeof Types.SET_FORM_NEW_JOB; value: FormJobType };
//TODO: maybe no needed
// type SetCurrentFilterAction = { type: typeof Types.SET_EMAIL; value: ValidationType };
// type JobReducerAction = SetFormNewJobAction | SetCurrentFilterAction;
type JobReducerAction = SetFormNewJobAction;

export default function jobReducer(state = initialState, action: JobReducerAction) {
  switch (action.type) {
    case Types.SET_FORM_NEW_JOB: {
      return { ...state, formNewJob: action.value };
    }
    default:
      return state;
  }
}
