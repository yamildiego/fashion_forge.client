import axios from "axios";
import * as Types from "../Constants/Types";
import Urls from "../Constants/Urls";

import handleCatchGeneric from "../Functions/handleCatchGeneric";

import * as appActions from "./appActions";

axios.interceptors.request.use(
  (config) => ({ ...config, withCredentials: true }),
  (error) => Promise.reject(error)
);

const server = axios.create({ withCredentials: true });

const initValidationType = { value: "", error: false, helperText: "" };

const initFormQuote = { quote: initValidationType, estimated_time: initValidationType, comments: initValidationType };

const initFilter = { type_of_clothing: "All" as "All", state: "All" as "All", postcode: "" };

export const setFormQuote = (value: FormQuoteType) => ({ type: Types.SET_FORM_QUOTE, value });

export const mergeFormQuote = (value: Partial<FormQuoteType>) => ({ type: Types.MERGE_FORM_QUOTE, value });

export const cleanFormQuote = () => (dispatch: any) => dispatch(setFormQuote(initFormQuote));

export const setAllJobs = (value: JobType[]) => ({ type: Types.SET_ALL_JOBS, value });

export const setFilter = (value: FilterType) => ({ type: Types.SET_FILTER, value });

export const cleanFilter = () => (dispatch: any) => dispatch(setFilter(initFilter));

export const getJobsByFilter = (filter: FilterType) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.jobsByFilter}`, filter)
      .then((response) => {
        dispatch(setAllJobs(response.data));
        dispatch(appActions.setIsLoading(false));
      })
      .catch((error) => handleCatchGeneric(error, dispatch));
  };
};

export const newQuote = (quote: QuoteType, job_id: number) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.newQuote}`, { ...quote, job_id })
      .then((response) => {
        // dispatch(appActions.setCurrentView("reload"));
        dispatch(appActions.setIsLoading(false));
      })
      .catch((error) =>
        handleCatchGeneric(error, dispatch, (formValidation: Partial<FormQuoteType>) => {
          dispatch(mergeFormQuote(formValidation));
          dispatch(appActions.setIsLoading(false));
        })
      );
  };
};
