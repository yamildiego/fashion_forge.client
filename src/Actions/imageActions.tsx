import axios from "axios";
import * as Types from "../Constants/Types";
import Urls from "../Constants/Urls";

import * as appActions from "./appActions";

import handleCatchGeneric from "../Functions/handleCatchGeneric";

const server = axios.create({ withCredentials: true });

export const setImages = (value: ImageType[]) => ({ type: Types.SET_IMAGES, value });

export const addImages = (value: ImageType[]) => ({ type: Types.ADD_IMAGES, value });

export const cleanImages = () => async (dispatch: any) => dispatch(setImages([]));

export const removeImage = (value: number) => ({ type: Types.REMOVE_IMAGE, value });

export const uploadImages = (images: ImageType[], formData: FormData) => {
  return async (dispatch: any) => {
    dispatch(appActions.setIsLoading(true));
    await server
      .post(`${Urls.uploadImages}`, formData)
      .then((response) => {
        if (Array.isArray(response.data)) {
          let loadErrorImages: ImageType[] = [];
          response.data.forEach((error) => {
            console.log(error);
            loadErrorImages = images.map((x) => ({ ...x, ...(error.clientName === x.path ? { error: error.message } : {}) }));
          });

          console.log(loadErrorImages);
          dispatch(setImages(loadErrorImages));
        }

        dispatch(appActions.setIsLoading(false));
      })
      .catch((error) => dispatch(appActions.setIsLoading(false)));
  };
};
