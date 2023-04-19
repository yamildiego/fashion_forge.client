import validateEmail from "./validateEmail";

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

const validations = { required: "The %F field is required.", email: "The %F field must contain a valid email address." };

const getMsgError = (id: "required" | "email", field: string) => {
  return validations[id].replace("%F", field);
};

export default genericValidation;
