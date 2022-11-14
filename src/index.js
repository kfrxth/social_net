import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {rerenderMainTree} from './render';
import state from "./redux/State";

rerenderMainTree(state);

reportWebVitals();
