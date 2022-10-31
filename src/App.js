import React from "react";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import { Routes, BrowserRouter, Route } from "react-router-dom";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <Routes>
          <Route
            path="/profile"
            element={<Profile state={props.state.profilePage} />}
          />
          <Route
            path="/dialogs/*"
            element={
              <Dialogs
                state={props.state.dialogsPage}

              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
