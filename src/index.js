import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/redux-store";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const rerenderMainTree = (state) => {
  root.render(
    <BrowserRouter>
      <App dispatch={store.dispatch.bind(state)} store={store} />
    </BrowserRouter>
  );
};

rerenderMainTree(store.getState());

store.subscribe(() => {
	let state = store.getState();
	rerenderMainTree(state);
});

reportWebVitals();
