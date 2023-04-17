import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import thunk from "redux-thunk";

import configReducer from "./configReducer";

export type StateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  configReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
