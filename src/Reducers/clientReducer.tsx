import * as Types from "../Constants/Types";

const initialState = {
  formNewClient: {
    name: { value: "", error: false, helperText: "" },
    lastname: { value: "", error: false, helperText: "" },
    phone: { value: "", error: false, helperText: "" },
    email: { value: "", error: false, helperText: "" },
    address: { value: "", error: false, helperText: "" },
    state: { value: "", error: false, helperText: "" },
    postcode: { value: "", error: false, helperText: "" },
  },
  client: null,
};

type SetFormNewClientAction = { type: typeof Types.SET_FORM_NEW_CLIENT; value: FormClientType };
type SetCurrentFilterAction = { type: typeof Types.SET_CURRENT_VIEW; value: string };

type ClientReducerAction = SetFormNewClientAction | SetCurrentFilterAction;

export default function clientReducer(state = initialState, action: ClientReducerAction) {
  switch (action.type) {
    case Types.SET_FORM_NEW_CLIENT: {
      return { ...state, formNewClient: action.value };
    }

    default:
      return state;
  }
}
