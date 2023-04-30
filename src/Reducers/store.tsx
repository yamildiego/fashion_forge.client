import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import thunk from "redux-thunk";

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import clientReducer from "./clientReducer";
import makerReducer from "./makerReducer";
import imageReducer from "./imageReducer";

export type StateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  appReducer,
  userReducer,
  clientReducer,
  makerReducer,
  imageReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
