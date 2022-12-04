import React from "react";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsСontainer";
import { Routes, Route } from "react-router-dom";

const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <Routes>
        <Route
          path="/profile"
          element={
            <Profile
              store={props.store}
            />
          }
        />
        <Route
          path="/dialogs/*"
          element={<DialogsContainer store={props.store} />}
        />
      </Routes>
    </div>
  );
};

export default App;
