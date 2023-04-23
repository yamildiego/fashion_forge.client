import * as Types from "../Constants/Types";

const initValidationType = { value: "", error: false, helperText: "" };

const initialState = {
  formNewUser: {
    business_name: initValidationType,
    name: initValidationType,
    lastname: initValidationType,
    phone: initValidationType,
    email: initValidationType,
    address: initValidationType,
    state: initValidationType,
    postcode: initValidationType,
  },
  userEmail: { value: "", error: false, helperText: "" },
};

type SetFormNewUserAction = { type: typeof Types.SET_FORM_NEW_USER; value: FormUserType };
type MergeFormNewUserAction = { type: typeof Types.MERGE_FORM_NEW_USER; value: Partial<FormUserType> };
type SetEmailAction = { type: typeof Types.SET_EMAIL; value: ValidationType };
type MergeEmailAction = { type: typeof Types.MERGE_EMAIL; value: ValidationType };

type UserReducerAction = SetFormNewUserAction | MergeFormNewUserAction | SetEmailAction | MergeEmailAction;

export default function userReducer(state = initialState, action: UserReducerAction) {
  switch (action.type) {
    case Types.SET_FORM_NEW_USER: {
      return { ...state, formNewUser: action.value };
    }
    case Types.MERGE_FORM_NEW_USER: {
      let formNewUser = Object.keys(state.formNewUser).reduce((obj, key) => {
        //@ts-ignore
        obj[key] = action.value[key]
          ? //@ts-ignore
            { ...state.formNewUser[key], error: action.value[key].error, helperText: action.value[key].helperText }
          : //@ts-ignore
            { ...state.formNewUser[key], error: false, helperText: "" };
        return obj;
      }, {});

      return { ...state, formNewUser };
    }
    case Types.SET_EMAIL: {
      return { ...state, userEmail: action.value };
    }
    case Types.MERGE_EMAIL: {
      return {
        ...state,
        userEmail: {
          ...state.userEmail,
          error: action.value.error,
          helperText: action.value.helperText,
        },
      };
    }

    default:
      return state;
  }
}
