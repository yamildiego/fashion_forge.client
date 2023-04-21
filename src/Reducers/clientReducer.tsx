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
type MergeFormNewClientAction = { type: typeof Types.MERGE_FORM_NEW_CLIENT; value: Partial<FormClientType> };
type SetEmailAction = { type: typeof Types.SET_EMAIL; value: ValidationType };
type MergeEmailAction = { type: typeof Types.MERGE_EMAIL; value: ValidationType };

type ClientReducerAction = SetFormNewClientAction | MergeFormNewClientAction | SetEmailAction | MergeEmailAction;

export default function clientReducer(state = initialState, action: ClientReducerAction) {
  switch (action.type) {
    case Types.SET_FORM_NEW_CLIENT: {
      return { ...state, formNewClient: action.value };
    }
    case Types.MERGE_FORM_NEW_CLIENT: {
      let formNewClient = Object.keys(state.formNewClient).reduce((obj, key) => {
        //@ts-ignore
        obj[key] = action.value[key]
          ? //@ts-ignore
            { ...state.formNewClient[key], error: action.value[key].error, helperText: action.value[key].helperText }
          : //@ts-ignore
            { ...state.formNewClient[key], error: false, helperText: "" };
        return obj;
      }, {});
      console.log(state.formNewClient);

      return { ...state, formNewClient };
    }
    case Types.SET_EMAIL: {
      return { ...state, existing_customer_email: action.value };
    }
    case Types.MERGE_EMAIL: {
      return {
        ...state,
        existing_customer_email: {
          ...state.existing_customer_email,
          error: action.value.error,
          helperText: action.value.helperText,
        },
      };
    }

    default:
      return state;
  }
}
