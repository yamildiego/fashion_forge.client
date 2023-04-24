import axios from "axios";
import * as Types from "../Constants/Types";
import Urls from "../Constants/Urls";

import * as appActions from "./appActions";

import handleCatchGeneric from "../Functions/handleCatchGeneric";

const server = axios.create({ withCredentials: true });

const initValidationType = { value: "", error: false, helperText: "" };
const initFormUser = {
  business_name: initValidationType,
  name: initValidationType,
  lastname: initValidationType,
  phone: initValidationType,
  email: initValidationType,
  password: initValidationType,
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
