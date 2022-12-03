import React from "react";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
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
              profilePage={props.state.profilePage}
              dispatch={props.dispatch}
            />
          }
        />
        <Route
          path="/dialogs/*"
          element={<Dialogs dispatch={props.dispatch} store={props.store} />}
        />
      </Routes>
    </div>
  );
};

export default App;
