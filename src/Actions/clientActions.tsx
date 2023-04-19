import axios from "axios";
import * as Types from "../Constants/Types";

import * as appActions from "./appActions";

const server = axios.create({ withCredentials: true });

export const setFormNewClient = (value: FormClientType) => ({ type: Types.SET_FORM_NEW_CLIENT, value });

export const newClient = () => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    // await server
    //   .post(`${Urls.editFields}`, { id, value })
    //   .then((response) => (response.data.status === "OK" ? dispatch(setReloadData(true)) : console.log("ERROR 200")))
    //   .catch((error) => handleCatchGeneric(error, dispatch));
  };
};
