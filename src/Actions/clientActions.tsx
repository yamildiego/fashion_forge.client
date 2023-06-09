import axios from "axios";
import * as Types from "../Constants/Types";
import Urls from "../Constants/Urls";

import * as appActions from "./appActions";
import * as imageActions from "./imageActions";

import handleCatchGeneric from "../Functions/handleCatchGeneric";

axios.interceptors.request.use(
  (config) => ({ ...config, withCredentials: true }),
  (error) => Promise.reject(error)
);

const server = axios.create({ withCredentials: true });

const initValidationType = { value: "", error: false, helperText: "" };

export const setFormNewJob = (value: FormJobType) => ({ type: Types.SET_FORM_NEW_JOB, value });

export const mergeFormNewJob = (value: Partial<FormJobType>) => ({ type: Types.MERGE_FORM_NEW_JOB, value });

export const cleanFormNewJob = () => {
  return async (dispatch: any) => {
    dispatch(setFormNewJob({ type_of_clothing: initValidationType, description: initValidationType, budget: initValidationType }));
    dispatch(imageActions.cleanImages());
  };
};

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
        handleCatchGeneric(error, dispatch);
      });
  };
};

export const newJob = (job: JobType, images: ImageType[], status?: string) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.newJob}`, { ...job, images, status })
      .then((response) => {
        dispatch(getJobs());
        dispatch(cleanFormNewJob());
        dispatch(appActions.setIsLoading(false));
        dispatch(appActions.setJob(null));
      })
      .catch((error) =>
        handleCatchGeneric(error, dispatch, (formValidation: Partial<FormJobType>) => {
          dispatch(mergeFormNewJob(formValidation));
          dispatch(appActions.setIsLoading(false));
        })
      );
  };
};

export const editJob = (id: number, job: JobType, images: ImageType[], status?: string) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.editJob}`, { ...job, status, images, id })
      .then((response) => {
        dispatch(cleanFormNewJob());
        dispatch(appActions.setIsLoading(false));
        dispatch(appActions.setJob(null));
      })
      .catch((error) =>
        handleCatchGeneric(error, dispatch, (formValidation: Partial<FormJobType>) => {
          dispatch(mergeFormNewJob(formValidation));
          dispatch(appActions.setIsLoading(false));
        })
      );
  };
};

export const getJobById = (id: number) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .get(`${Urls.getJobById}/${id}`)
      .then((response) => {
        console.log(response);
        const job = response.data;
        dispatch(appActions.setJob(job));

        let valueBudget = job.budget === null ? "" : job.budget.toString();

        let formJob = {
          type_of_clothing: { value: job.type_of_clothing, error: false, helperText: "" },
          description: { value: job.description, error: false, helperText: "" },
          budget: { value: valueBudget, error: false, helperText: "" },
        };

        dispatch(setFormNewJob(formJob));
        dispatch(imageActions.setImages(job.images ? job.images : []));
        dispatch(appActions.setIsLoading(false));
      })
      .catch((error) => handleCatchGeneric(error, dispatch));
  };
};

export const publishJob = (jobId: number) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .get(`${Urls.publishJob}/${jobId}`)
      .then((response) => {
        dispatch(getJobs());
        dispatch(appActions.setIsLoading(false));
      })
      .catch((error) => handleCatchGeneric(error, dispatch));
  };
};
