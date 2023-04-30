import * as Types from "../Constants/Types";

const initialState = {
  images: [],
};

type AddImagesAction = { type: typeof Types.ADD_IMAGES; value: ImageType[] };
type RemoveImageAction = { type: typeof Types.REMOVE_IMAGE; value: number };
type SetImagesAction = { type: typeof Types.SET_IMAGES; value: ImageType[] };

type ImageReducerAction = AddImagesAction | RemoveImageAction | SetImagesAction;

export default function imageReducer(state = initialState, action: ImageReducerAction) {
  switch (action.type) {
    case Types.ADD_IMAGES: {
      let images = action.value.map((x) => ({ ...x, index: Math.floor(Math.random() * 50000000) + 1 }));
      return { ...state, images: [...state.images, ...images] };
    }
    case Types.SET_IMAGES: {
      let images = action.value.map((x) => ({ ...x, index: Math.floor(Math.random() * 50000000) + 1 }));
      return { ...state, images };
    }
    case Types.REMOVE_IMAGE: {
      let images = state.images.filter((x: ImageType) => x.index !== action.value);
      return { ...state, images };
    }
    default:
      return state;
  }
}
