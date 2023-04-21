const validations = {
  required: "The %F field is required.",
  email: "The %F field must contain a valid email address.",
  unique: "The %F is already registered.",
  exists: "This %F is not registered.",
};

const getMsgError = (id: "required" | "email", field: string) => {
  return validations[id].replace("%F", field);
};

export default getMsgError;
