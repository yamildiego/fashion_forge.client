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

  export type MyMapDispatchToProps<TDispatchProps = {}, TOwnProps = {}> = MapDispatchToProps<TDispatchProps, TOwnProps>;
}

export {};
