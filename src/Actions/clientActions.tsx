import axios from "axios";
import * as Types from "../Constants/Types";
import Urls from "../Constants/Urls";

import * as appActions from "./appActions";

import handleCatchGeneric from "../Functions/handleCatchGeneric";

axios.interceptors.request.use(
  (config) => ({ ...config, withCredentials: true }),
  (error) => Promise.reject(error)
);

const server = axios.create({ withCredentials: true });

const initValidationType = { value: "", error: false, helperText: "" };

export const setFormNewJob = (value: FormJobType) => ({ type: Types.SET_FORM_NEW_JOB, value });

export const mergeFormNewJob = (value: Partial<FormJobType>) => ({ type: Types.MERGE_FORM_NEW_JOB, value });

export const cleanFormNewJob = () => (dispatch: any) =>
  dispatch(
    setFormNewJob({
      type_of_clothing: initValidationType,
      description: initValidationType,
      budget: initValidationType,
    })
  );

export const setJobs = (value: JobType[]) => ({ type: Types.SET_JOBS, value });

export const getJobs = () => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .get(`${Urls.getJobs}`)
      .then((response) => {
        dispatch(setJobs(response.data));
        dispatch(appActions.setIsLoading(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const newJob = (job: JobType) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.newJob}`, { ...job })
      .then((response) => {
        dispatch(appActions.setCurrentView("jobs"));
        dispatch(appActions.setIsLoading(false));
        dispatch(cleanFormNewJob());
      })
      .catch((error) =>
        handleCatchGeneric(error, (formValidation: Partial<FormJobType>) => {
          dispatch(mergeFormNewJob(formValidation));
          dispatch(appActions.setIsLoading(false));
        })
      );
  };
};
