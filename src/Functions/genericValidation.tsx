import validateEmail from "./validateEmail";
import getMsgError from "./getMsgError";

const genericValidation = (value: string, validation: string, nameField: string): ValidationType => {
  let validated: ValidationType = { value, error: false, helperText: "" };

  switch (validation) {
    case "required":
      if (value === "" || value === undefined || value === null)
        validated = { value, error: true, helperText: getMsgError(`required`, nameField) };
      break;
    case "email":
      if (!validateEmail(value)) validated = { value, error: true, helperText: getMsgError(`email`, nameField) };
      break;
    default:
      break;
  }

  return validated;
};

export default genericValidation;
