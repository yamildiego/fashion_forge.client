import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import thunk from "redux-thunk";

import appReducer from "./appReducer";
import clientReducer from "./clientReducer";
import jobReducer from "./jobReducer";
import markerReducer from "./markerReducer";

export type StateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  appReducer,
  clientReducer,
  jobReducer,
  markerReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
