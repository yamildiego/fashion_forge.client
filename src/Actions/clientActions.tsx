import axios from "axios";
import * as Types from "../Constants/Types";

import * as appActions from "./appActions";

const server = axios.create({ withCredentials: true });

const initValidationType = { value: "", error: false, helperText: "" };

export const setEmail = (value: ValidationType) => ({ type: Types.SET_EMAIL, value });

export const cleanEmail = () => (dispatch: any) => dispatch(setEmail(initValidationType));

export const setFormNewClient = (value: FormClientType) => ({ type: Types.SET_FORM_NEW_CLIENT, value });

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

export const newClient = () => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    // await server
    //   .post(`${Urls.editFields}`, { id, value })
    //   .then((response) => (response.data.status === "OK" ? dispatch(setReloadData(true)) : console.log("ERROR 200")))
    //   .catch((error) => handleCatchGeneric(error, dispatch));
  };
};

export const getExistingClient = (email: string) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    // dispatch(setEmail({ value: email, error: true, helperText: "HERE ERROR NO FOUND" }));
    // await server
    //   .post(`${Urls.editFields}`, { id, value })
    //   .then((response) => (response.data.status === "OK" ? dispatch(setReloadData(true)) : console.log("ERROR 200")))
    //   .catch((error) => handleCatchGeneric(error, dispatch));
  };
};
