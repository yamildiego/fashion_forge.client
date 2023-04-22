import axios from "axios";
import * as Types from "../Constants/Types";
import Urls from "../Constants/Urls";

import * as appActions from "./appActions";

import handleCatchGeneric from "../Functions/handleCatchGeneric";

const server = axios.create({ withCredentials: true });

const initValidationType = { value: "", error: false, helperText: "" };
const initValidationTypeTEMP = { value: "yamildiego@gmail.com", error: false, helperText: "" };

export const setEmail = (value: ValidationType) => ({ type: Types.SET_EMAIL, value });

export const mergeEmail = (value: ValidationType) => ({ type: Types.MERGE_EMAIL, value });

export const cleanEmail = () => (dispatch: any) => dispatch(setEmail(initValidationTypeTEMP));

export const setFormNewUser = (value: FormUserType) => ({ type: Types.SET_FORM_NEW_USER, value });

export const mergeFormNewUser = (value: Partial<FormUserType>) => ({ type: Types.MERGE_FORM_NEW_USER, value });

export const cleanFormNewUser = () => (dispatch: any) =>
  dispatch(
    setFormNewUser({
      name: initValidationType,
      lastname: initValidationType,
      phone: initValidationType,
      email: initValidationType,
      address: initValidationType,
      state: initValidationType,
      postcode: initValidationType,
    })
  );

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
          dispatch(mergeFormNewUser(formValidation));
          dispatch(appActions.setIsLoading(false));
        })
      );
  };
};

export const signInUser = (email: string, userType: string) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.signInUser}`, { email, user_type: userType })
      .then((response) => {
        if (response.statusText === "OK") {
          dispatch(appActions.setCurrentView("jobs"));
          dispatch(appActions.setIsLoading(false));
          dispatch(appActions.setCurrentUser(response.data));
        } else console.log("ERROR 200");
      })
      .catch((error) =>
        handleCatchGeneric(error, (formValidation: Partial<FormUserType>) => {
          if (formValidation?.email) dispatch(mergeEmail(formValidation.email));
          dispatch(appActions.setIsLoading(false));
        })
      );
  };
};
