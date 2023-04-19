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
    state: string;
    postcode: string;
  };

  export type MyMapDispatchToProps<TDispatchProps = {}, TOwnProps = {}> = MapDispatchToProps<TDispatchProps, TOwnProps>;
}

export {};
