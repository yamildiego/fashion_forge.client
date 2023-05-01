import * as Types from "../Constants/Types";

const initValidationType = { value: "", error: false, helperText: "" };

const initialState = {
  formUser: {
    business_name: initValidationType,
    name: initValidationType,
    lastname: initValidationType,
    phone: initValidationType,
    email: initValidationType,
    password: initValidationType,
    confirm_password: initValidationType,
    address: initValidationType,
    state: initValidationType,
    postcode: initValidationType,
  },
};

type SetFormUserAction = { type: typeof Types.SET_FORM_USER; value: FormUserType };
type MergeFormUserAction = { type: typeof Types.MERGE_FORM_USER; value: Partial<FormUserType> };

type UserReducerAction = SetFormUserAction | MergeFormUserAction;

export default function userReducer(state = initialState, action: UserReducerAction) {
  switch (action.type) {
    case Types.SET_FORM_USER: {
      return { ...state, formUser: action.value };
    }
    case Types.MERGE_FORM_USER: {
      let formUser = Object.keys(state.formUser).reduce((obj, key) => {
        //@ts-ignore
        obj[key] = action.value[key]
          ? //@ts-ignore
            { ...state.formUser[key], error: action.value[key].error, helperText: action.value[key].helperText }
          : //@ts-ignore
            { ...state.formUser[key], error: false, helperText: "" };
        return obj;
      }, {});

      return { ...state, formUser };
    }

    default:
      return state;
  }
}
