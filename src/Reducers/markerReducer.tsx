import * as Types from "../Constants/Types";

const initialState = {
  jobs: [],
};

type SetAllJobsAction = { type: typeof Types.SET_ALL_JOBS; value: JobType[] };
// type MergeFormNewJobAction = { type: typeof Types.MERGE_FORM_NEW_JOB; value: Partial<FormJobType> };

type JobReducerAction = SetAllJobsAction | SetAllJobsAction;

export default function markerReducer(state = initialState, action: JobReducerAction) {
  switch (action.type) {
    case Types.SET_ALL_JOBS: {
      return { ...state, jobs: action.value };
    }
    default:
      return state;
  }
}
