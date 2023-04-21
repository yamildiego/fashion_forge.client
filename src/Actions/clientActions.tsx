import axios from "axios";
import * as Types from "../Constants/Types";
import Urls from "../Constants/Urls";

import * as appActions from "./appActions";

import handleCatchGeneric from "../Functions/handleCatchGeneric";

const server = axios.create();

const initValidationType = { value: "", error: false, helperText: "" };
const initValidationTypeTEMP = { value: "yamildiego@gmail.com", error: false, helperText: "" };

export const setEmail = (value: ValidationType) => ({ type: Types.SET_EMAIL, value });

export const mergeEmail = (value: ValidationType) => ({ type: Types.MERGE_EMAIL, value });

export const cleanEmail = () => (dispatch: any) => dispatch(setEmail(initValidationTypeTEMP));

export const setFormNewClient = (value: FormClientType) => ({ type: Types.SET_FORM_NEW_CLIENT, value });

export const mergeFormNewClient = (value: Partial<FormClientType>) => ({ type: Types.MERGE_FORM_NEW_CLIENT, value });

export const cleanFormNewClient = () => (dispatch: any) =>
  dispatch(
    setFormNewClient({
      name: initValidationType,
      lastname: initValidationType,
      phone: initValidationType,
      email: initValidationType,
      address: initValidationType,
      state: initValidationType,
      postcode: initValidationType,
    })
  );

export const newClient = (client: ClientType) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.newClient}`, { ...client })
      .then((response) => {
        if (response.statusText === "OK") {
          dispatch(appActions.setCurrentView("jobs"));
          dispatch(appActions.setIsLoading(false));
          dispatch(appActions.setCurrentClient(response.data));
        } else console.log("ERROR 200");
      })
      .catch((error) =>
        handleCatchGeneric(error, (formValidation: Partial<FormClientType>) => {
          dispatch(mergeFormNewClient(formValidation));
          dispatch(appActions.setIsLoading(false));
        })
      );
  };
};

export const getExistingClient = (email: string) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.getExistingClient}`, { email })
      .then((response) => {
        if (response.statusText === "OK") {
          dispatch(appActions.setCurrentView("jobs"));
          dispatch(appActions.setIsLoading(false));
          dispatch(appActions.setCurrentClient(response.data));
        } else console.log("ERROR 200");
      })
      .catch((error) =>
        handleCatchGeneric(error, (formValidation: Partial<FormClientType>) => {
          if (formValidation?.email) dispatch(mergeEmail(formValidation.email));
          dispatch(appActions.setIsLoading(false));
        })
      );
  };
};
