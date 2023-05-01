import * as Types from "../Constants/Types";
import axios from "axios";
import Urls from "../Constants/Urls";

axios.interceptors.request.use(
  (config) => ({ ...config, withCredentials: true }),
  (error) => Promise.reject(error)
);

const server = axios.create({ withCredentials: true });

export const setIsLoading = (value: boolean) => ({ type: Types.SET_IS_LOADING, value });

export const setCurrentUser = (value: UserType | null) => ({ type: Types.SET_CURRENT_USER, value });

export const setOpenModal = (value: boolean) => ({ type: Types.SET_OPEN_MODAL, value });

export const setJob = (value: JobType | null) => ({ type: Types.SET_JOB, value });

export const addError = (value: ErrorType) => ({ type: Types.ADD_ERROR, value });

export const removeError = (value: number) => ({ type: Types.REMOVE_ERROR, value });

export const getCurrentUser = () => {
  return async (dispatch: any) => {
    dispatch(setIsLoading(true));
    await server
      .get(`${Urls.getCurrentUser}`)
      .then((response) => {
        dispatch(setCurrentUser(response.data));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setCurrentUser(null));
        dispatch(setIsLoading(false));
      });
  };
};
