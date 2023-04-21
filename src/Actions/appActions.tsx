import * as Types from "../Constants/Types";

export const setIsLoading = (value: boolean) => ({ type: Types.SET_IS_LOADING, value });

export const setCurrentView = (value: string) => ({ type: Types.SET_CURRENT_VIEW, value });

export const setCurrentClient = (value: ClientType) => ({ type: Types.SET_CURRENT_CLIENT, value });
