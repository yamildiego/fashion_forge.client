import getMsgError from "./getMsgError";
import capitalizeFirstLetter from "./capitalizeFirstLetter";

import * as appActions from "../Actions/appActions";

const initValidationType = {
  value: "",
  error: false,
  helperText: "",
};

const handleCatchGeneric = (error: any, dispatch: any, callback?: (formValidation: Partial<any>) => void) => {
  console.log(error);
  if (error.code === "ERR_BAD_REQUEST") {
    let errors = JSON.parse(error.request.response).errors ?? ([] as ErrorFormType[]);
    let status = JSON.parse(error.request.response).status ?? "";

    //has at least one error is a form error
    if (status === "" && errors.length > 0) {
      let formValidation = {};

      const errorsType = ["required", "email", "unique", "wrongData", "maxLength", "minLength", "matchPassword", "number"];

      errors.forEach((error: ErrorFormType) => {
        if (errorsType.includes(error.rule)) {
          //@ts-ignore
          formValidation[error.field] = {
            ...initValidationType,
            error: true,
            helperText: getMsgError(error.rule, capitalizeFirstLetter(error.field).replaceAll("_", " ")),
          };
        } else {
          //@ts-ignore
          formValidation[error.field] = {
            ...initValidationType,
            error: true,
            helperText: "Unexpecter Error",
          };
        }
      });
      if (callback) callback(formValidation);
    } else {
      switch (status) {
        case "session_expired":
          dispatch(
            appActions.addError({
              key: Math.random(),
              severity: "warning",
              title: "Session expired",
              description: "Sign in again",
            })
          );
          dispatch(appActions.setCurrentUser(null));
          dispatch(appActions.setIsLoading(false));
          break;
        case "unexpected_error":
          dispatch(
            appActions.addError({
              key: Math.random(),
              severity: "error",
              title: "Unexpected error",
              description: "Try again. if the problem persists contact the Administrator",
            })
          );
          dispatch(appActions.setCurrentUser(null));
          dispatch(appActions.setIsLoading(false));
          break;

        default:
          break;
      }
    }
  } else {
    dispatch(
      appActions.addError({
        key: Math.random(),
        severity: "error",
        title: "Could not connect to server",
        description: "Please check your internet connection and try again",
      })
    );
    dispatch(appActions.setCurrentUser(null));
    dispatch(appActions.setIsLoading(false));
  }
};

export default handleCatchGeneric;
