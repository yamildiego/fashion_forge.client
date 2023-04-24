import { MapDispatchToProps } from "react-redux";

declare global {
  interface Window {
    AddressFinder: any;
  }

  type StateType = {
    appReducer: {
      isLoading: boolean;
      currentView: string;
      user: UserType;
    };
    userReducer: {
      formUser: FormUserType;
    };
    clientReducer: {
      formNewJob: FormJobType;
      jobs: JobType[];
    };
    makerReducer: {
      job: JobType;
      jobs: JobType[];
    };
  };

  type ValidationType = {
    value: string;
    error: boolean;
    helperText: string;
  };

  type FormUserType = {
    business_name: ValidationType;
    name: ValidationType;
    lastname: ValidationType;
    phone: ValidationType;
    email: ValidationType;
    password: ValidationType;
    address: ValidationType;
    state: ValidationType;
    postcode: ValidationType;
  };

  type UserType = {
    business_name?: string;
    name?: string;
    lastname?: string;
    phone: string;
    email: string;
    password?: string;
    address?: string;
    state?: string;
    postcode?: string;
    user_type: "CLIENT" | "MAKER";
  };

  type FormJobType = {
    type_of_clothing: ValidationType;
    description: ValidationType;
    budget: ValidationType;
  };

  type JobType = {
    type_of_clothing: string;
    description: string;
    budget: number;
    quote?: number;
    user?: UserType;
    created_at: string;
  };

  type TypeOfClothing = "t_shirt" | "jeans" | "swimsuit" | "cocktail_dress" | "tracksuit" | "leather_jacket" | "business_suit" | "skirt";
  type ErrorIdType = "required" | "email" | "email" | "unique" | "wrongData" | "maxLength" | "minLength";

  export type MyMapDispatchToProps<TDispatchProps = {}, TOwnProps = {}> = MapDispatchToProps<TDispatchProps, TOwnProps>;
}

export {};
