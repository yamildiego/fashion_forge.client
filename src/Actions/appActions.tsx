import * as Types from "../Constants/Types";

export const setIsLoading = (value: boolean) => ({ type: Types.SET_IS_LOADING, value });

export const setCurrentView = (value: string) => ({ type: Types.SET_CURRENT_VIEW, value });

export const setCurrentUser = (value: UserType | null) => ({ type: Types.SET_CURRENT_USER, value });

export const setOpenModal = (value: boolean) => ({ type: Types.SET_OPEN_MODAL, value });

export const setJob = (value: JobType) => ({ type: Types.SET_JOB, value });
