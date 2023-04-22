import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import thunk from "redux-thunk";

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import clientReducer from "./clientReducer";
import markerReducer from "./markerReducer";

export type StateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  appReducer,
  userReducer,
  clientReducer,
  markerReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
