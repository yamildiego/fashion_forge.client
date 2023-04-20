// import axios from "axios";
import * as Types from "../Constants/Types";

import * as appActions from "./appActions";

// const server = axios.create({ withCredentials: true });

const initValidationType = { value: "", error: false, helperText: "" };

export const setFormNewJob = (value: FormJobType) => ({ type: Types.SET_FORM_NEW_JOB, value });

export const cleanFormNewJob = () => (dispatch: any) =>
  dispatch(
    setFormNewJob({
      type_of_clothing: initValidationType,
      description: initValidationType,
      budget: initValidationType,
    })
  );

export const newJob = (job: JobType) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    setTimeout(() => {
      dispatch(appActions.setIsLoading(false));
    }, 1500);

    // await server
    //   .post(`${Urls.editFields}`, { id, value })
    //   .then((response) => (response.data.status === "OK" ? dispatch(setReloadData(true)) : console.log("ERROR 200")))
    //   .catch((error) => handleCatchGeneric(error, dispatch));
  };
};
