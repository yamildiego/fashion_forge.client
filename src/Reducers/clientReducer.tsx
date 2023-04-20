import * as Types from "../Constants/Types";

const initValidationType = { value: "", error: false, helperText: "" };

const initialState = {
  formNewClient: {
    name: initValidationType,
    lastname: initValidationType,
    phone: initValidationType,
    email: initValidationType,
    address: initValidationType,
    state: initValidationType,
    postcode: initValidationType,
  },
  existing_customer_email: { value: "", error: false, helperText: "" },

  formNewJob: {
    type_of_clothing: initValidationType,
    description: initValidationType,
    budget: initValidationType,
  },
};

type SetFormNewClientAction = { type: typeof Types.SET_FORM_NEW_CLIENT; value: FormClientType };
type SetCurrentFilterAction = { type: typeof Types.SET_EMAIL; value: ValidationType };

type ClientReducerAction = SetFormNewClientAction | SetCurrentFilterAction;

export default function clientReducer(state = initialState, action: ClientReducerAction) {
  switch (action.type) {
    case Types.SET_FORM_NEW_CLIENT: {
      return { ...state, formNewClient: action.value };
    }
    case Types.SET_EMAIL: {
      return { ...state, existing_customer_email: action.value };
    }

    default:
      return state;
  }
}
