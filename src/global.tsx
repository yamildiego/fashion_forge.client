import { MapDispatchToProps } from "react-redux";
import { AlertColor } from "@mui/material";
import { NavigateFunction as MUINavigateFunction } from "react-router-dom";

declare global {
  interface Window {
    AddressFinder: any;
  }

  type NavigateFunction = MUINavigateFunction;

  type StateType = {
    appReducer: {
      isLoading: boolean;
      user: UserType;
      openModal: boolean;
      job: JobType | null;
      errors: ErrorType[];
    };
    userReducer: {
      formUser: FormUserType;
    };
    clientReducer: {
      formNewJob: FormJobType;
      jobs: JobType[];
    };
    makerReducer: {
      jobs: JobType[];
      formQuote: FormQuoteType;
      filter: FilterType;
    };
    imageReducer: {
      images: ImageType[];
    };
  };

  type FilterType = {
    type_of_clothing: TypeOfClothing | "All";
    state: States | "All";
    postcode: string;
  };

  type ValidationType = {
    value: string;
    error: boolean;
    helperText: string;
  };

  type FormQuoteType = {
    quote: ValidationType;
    estimated_time: ValidationType;
    comments: ValidationType;
  };

  type QuoteType = {
    quote: number;
    estimated_time: number;
    comments: string;
    user_id?: number;
  };

  type FormUserType = {
    business_name: ValidationType;
    name: ValidationType;
    lastname: ValidationType;
    phone: ValidationType;
    email: ValidationType;
    password: ValidationType;
    confirm_password: ValidationType;
    address: ValidationType;
    state: ValidationType;
    postcode: ValidationType;
  };

  type UserType = {
    id: number;
    business_name?: string;
    name?: string;
    lastname?: string;
    phone: string;
    email: string;
    password?: string;
    confirm_password?: string;
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
    id: number;
    type_of_clothing: TypeOfClothing;
    description: string;
    budget: number;
    images?: ImageType[];
    status: string;
    quotes?: QuoteType[];
    user?: UserType;
    user_id?: number;
    created_at: string;
  };

  type ImageType = {
    index?: number;
    id?: number;
    error?: string;
    lastModified: number;
    path: string;
    name: string;
    size: string;
    type: string;
  };

  type ErrorFormType = {
    rule: ErrorIdType;
    field: string;
    message?: string;
  };

  interface ErrorType {
    key: number;
    title: string;
    description: string;
    severity: AlertColor | undefined;
    datetime?: number;
    opacity?: number;
  }

  type States = "VIC" | "QLD" | "SA" | "NT" | "WA" | "TAS" | "NSW" | "ACT";
  type TypeOfClothing = "t_shirt" | "jeans" | "swimsuit" | "cocktail_dress" | "tracksuit" | "leather_jacket" | "business_suit" | "skirt";
  type ErrorIdType = "required" | "email" | "email" | "unique" | "wrongData" | "maxLength" | "minLength" | "matchPassword" | "number";
  type StatusType = "DRAFT" | "PUBLISHED" | "ASSINGNED" | "SHIPPED" | "FINISHED";

  type ColorType = "warning" | "inherit" | "primary" | "secondary" | "success" | "error" | "info" | undefined;
  type VariantType = "text" | "contained" | "outlined" | undefined;

  export type MyMapDispatchToProps<TDispatchProps = {}, TOwnProps = {}> = MapDispatchToProps<TDispatchProps, TOwnProps>;
}

export {};
