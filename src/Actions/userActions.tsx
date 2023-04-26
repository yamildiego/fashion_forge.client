import axios from "axios";
import * as Types from "../Constants/Types";
import Urls from "../Constants/Urls";

import * as appActions from "./appActions";
import * as makerActions from "./makerActions";

import handleCatchGeneric from "../Functions/handleCatchGeneric";

axios.interceptors.request.use(
  (config) => ({ ...config, withCredentials: true }),
  (error) => Promise.reject(error)
);

const server = axios.create({ withCredentials: true });

const initValidationType = { value: "", error: false, helperText: "" };

const initValidationTypeTEMP1 = { value: "yamildiego@gmail.com", error: false, helperText: "" };
const initValidationTypeTEMP2 = { value: "0466273586", error: false, helperText: "" };

const initFormUser = {
  business_name: initValidationType,
  name: initValidationType,
  lastname: initValidationType,
  phone: initValidationType,
  email: initValidationTypeTEMP1,
  password: initValidationTypeTEMP2,
  confirm_password: initValidationType,
  address: initValidationType,
  state: initValidationType,
  postcode: initValidationType,
};

export const setFormUser = (value: FormUserType) => ({ type: Types.SET_FORM_USER, value });

export const mergeFormUser = (value: Partial<FormUserType>) => ({ type: Types.MERGE_FORM_USER, value });

export const cleanFormUser = () => (dispatch: any) => dispatch(setFormUser(initFormUser));

export const newUser = (user: UserType, userType: string) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.newUser}`, { ...user, user_type: userType })
      .then((response) => {
        if (response.statusText === "OK") {
          dispatch(makerActions.cleanFilter());
          dispatch(appActions.setCurrentView("jobs"));
          dispatch(appActions.setIsLoading(false));
          dispatch(appActions.setCurrentUser(response.data));
        } else console.log("ERROR 200");
      })
      .catch((error) =>
        handleCatchGeneric(error, (formValidation: Partial<FormUserType>) => {
          dispatch(mergeFormUser(formValidation));
          dispatch(appActions.setIsLoading(false));
        })
      );
  };
};

export const signInUser = (email: string, password: string, userType: string) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.signInUser}`, { email, password, user_type: userType })
      .then((response) => {
        if (response.statusText === "OK") {
          dispatch(makerActions.cleanFilter());
          dispatch(appActions.setCurrentView("jobs"));
          dispatch(appActions.setIsLoading(false));
          dispatch(appActions.setCurrentUser(response.data));
        } else console.log("ERROR 200");
      })
      .catch((error) =>
        handleCatchGeneric(error, (formValidation: Partial<FormUserType>) => {
          dispatch(mergeFormUser(formValidation));
          dispatch(appActions.setIsLoading(false));
        })
      );
  };
};
