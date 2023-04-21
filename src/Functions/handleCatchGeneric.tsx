import getMsgError from "./getMsgError";
import capitalizeFirstLetter from "./capitalizeFirstLetter";

const initValidationType = {
  value: "",
  error: false,
  helperText: "",
};

const handleCatchGeneric = (error: any, callback: (formValidation: Partial<any>) => void) => {
  console.log(error);
  if (error.code === "ERR_BAD_REQUEST") {
    let errors = JSON.parse(error.request.response).errors;

    let formValidation = {};

    errors.forEach((error: any) => {
      if (error.rule === "required" || error.rule === "email" || error.rule === "unique" || error.rule === "exists") {
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
          helperText: "unexpecter error",
          // helperText: getMsgError(error.rule, capitalizeFirstLetter(error.field)),
        };
      }
    });

    callback(formValidation);
  }
};

export default handleCatchGeneric;
