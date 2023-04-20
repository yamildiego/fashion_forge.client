import { MapDispatchToProps } from "react-redux";

declare global {
  interface Window {
    AddressFinder: any;
  }

  type StateType = {
    appReducer: {
      isLoading: boolean;
      currentView: string;
    };
    clientReducer: {
      formNewClient: FormClientType;
      existing_customer_email: ValidationType;
    };
    jobReducer: {
      formNewJob: FormJobType;
    };
  };

  type ValidationType = {
    value: string;
    error: boolean;
    helperText: string;
  };

  type FormClientType = {
    name: ValidationType;
    lastname: ValidationType;
    phone: ValidationType;
    email: ValidationType;
    address: ValidationType;
    state: ValidationType;
    postcode: ValidationType;
  };

  type ClientType = {
    name: string;
    lastname: string;
    phone: string;
    email: string;
    address: string;
    state: string;
    postcode: string;
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
  };

  type TypeOfClothing = "t_shirt" | "jeans" | "swimsuit" | "cocktail_dress" | "tracksuit" | "leather_jacket" | "business_suit" | "skirt";

  export type MyMapDispatchToProps<TDispatchProps = {}, TOwnProps = {}> = MapDispatchToProps<TDispatchProps, TOwnProps>;
}

export {};
