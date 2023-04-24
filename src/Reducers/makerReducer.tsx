import * as Types from "../Constants/Types";

const initialState = {
  job: null,
  jobs: [],
};

type SetAllJobsAction = { type: typeof Types.SET_ALL_JOBS; value: JobType[] };
type SetJobAction = { type: typeof Types.SET_JOB; value: JobType };

type JobReducerAction = SetAllJobsAction | SetJobAction;

export default function makerReducer(state = initialState, action: JobReducerAction) {
  switch (action.type) {
    case Types.SET_JOB: {
      return { ...state, job: action.value };
    }
    case Types.SET_ALL_JOBS: {
      return { ...state, jobs: action.value };
    }
    default:
      return state;
  }
}
