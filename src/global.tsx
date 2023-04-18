import { MapDispatchToProps } from "react-redux";

declare global {
  interface Window {
    AddressFinder: any;
  }

  type StateType = {
    appReducer: {
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

  // type ClientType = {
  //   name: string;
  //   lastname: string;
  //   phone: string;
  //   email: string;
  //   address: string;
  //   state: string;
  //   postcode: string;
  // };

  type FormClientType = {
    name: ValidationType;
    lastname: ValidationType;
    phone: ValidationType;
    email: ValidationType;
    address: ValidationType;
    state: ValidationType;
    postcode: ValidationType;
  };

  export type MyMapDispatchToProps<TDispatchProps = {}, TOwnProps = {}> = MapDispatchToProps<TDispatchProps, TOwnProps>;
}

export {};
