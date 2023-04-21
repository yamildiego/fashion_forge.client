import axios from "axios";
import * as Types from "../Constants/Types";
import Urls from "../Constants/Urls";

import * as appActions from "./appActions";

const server = axios.create({ withCredentials: true });

export const setAllJobs = (value: JobType[]) => ({ type: Types.SET_ALL_JOBS, value });

export const getAllJobs = () => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .get(`${Urls.getAllJobs}`)
      .then((response) => {
        if (response.statusText === "OK") {
          dispatch(setAllJobs(response.data));
          dispatch(appActions.setIsLoading(false));
        } else console.log("ERROR 200");
      })
      .catch((error) => {});
  };
};
