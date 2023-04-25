import * as Types from "../Constants/Types";

const initValidationType = { value: "", error: false, helperText: "" };

const initialState = {
  job: null,
  jobs: [],
  formQuote: {
    quote: initValidationType,
    estimated_time: initValidationType,
    comments: initValidationType,
  },
};

type SetAllJobsAction = { type: typeof Types.SET_ALL_JOBS; value: JobType[] };
type SetJobAction = { type: typeof Types.SET_JOB; value: JobType };
type SetFormQuoteType = { type: typeof Types.SET_FORM_QUOTE; value: FormQuoteType };
type MergeFormQuoteType = { type: typeof Types.MERGE_FORM_QUOTE; value: FormQuoteType };

type JobReducerAction = SetAllJobsAction | SetJobAction | SetFormQuoteType | MergeFormQuoteType;

export default function makerReducer(state = initialState, action: JobReducerAction) {
  switch (action.type) {
    case Types.SET_JOB: {
      return { ...state, job: action.value };
    }
    case Types.SET_ALL_JOBS: {
      return { ...state, jobs: action.value };
    }
    case Types.SET_FORM_QUOTE: {
      return { ...state, formQuote: action.value };
    }
    case Types.MERGE_FORM_QUOTE: {
      let formQuote = Object.keys(state.formQuote).reduce((obj, key) => {
        //@ts-ignore
        obj[key] = action.value[key]
          ? //@ts-ignore
            { ...state.formQuote[key], error: action.value[key].error, helperText: action.value[key].helperText }
          : //@ts-ignore
            { ...state.formQuote[key], error: false, helperText: "" };
        return obj;
      }, {});

      return { ...state, formQuote };
    }

    default:
      return state;
  }
}
