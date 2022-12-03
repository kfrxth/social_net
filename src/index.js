import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/State";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const rerenderMainTree = (state) => {
  root.render(
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
    </BrowserRouter>
  );
};

rerenderMainTree(store.getState());

store.subscribe(rerenderMainTree);

reportWebVitals();
