import * as Types from "../Constants/Types";

const initValidationType = { value: "", error: false, helperText: "" };

const initialState = {
  formNewJob: {
    type_of_clothing: initValidationType,
    description: initValidationType,
    budget: initValidationType,
  },
  jobs: [],
};

type SetFormNewJobAction = { type: typeof Types.SET_FORM_NEW_JOB; value: FormJobType };
type MergeFormNewJobAction = { type: typeof Types.MERGE_FORM_NEW_JOB; value: Partial<FormJobType> };
type SetJobsAction = { type: typeof Types.SET_JOBS; value: JobType[] };

type JobReducerAction = SetFormNewJobAction | MergeFormNewJobAction | SetJobsAction;

export default function jobReducer(state = initialState, action: JobReducerAction) {
  switch (action.type) {
    case Types.SET_FORM_NEW_JOB: {
      return { ...state, formNewJob: action.value };
    }
    case Types.MERGE_FORM_NEW_JOB: {
      let formNewJob = Object.keys(state.formNewJob).reduce((obj, key) => {
        //@ts-ignore
        obj[key] = action.value[key]
          ? //@ts-ignore
            { ...state.formNewJob[key], error: action.value[key].error, helperText: action.value[key].helperText }
          : //@ts-ignore
            { ...state.formNewJob[key], error: false, helperText: "" };
        return obj;
      }, {});

      return { ...state, formNewJob };
    }
    case Types.SET_JOBS: {
      return { ...state, jobs: action.value };
    }
    default:
      return state;
  }
}
