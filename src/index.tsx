import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Fallback from "./Components/Fallback";
import store from "./Reducers/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const App = React.lazy(() => import("./App"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/">
        <Suspense fallback={<Fallback />}>
          <App />
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
