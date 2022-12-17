import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsСontainer";
import { Routes, Route } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = () => {
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <Routes>
        <Route path="/profile/:userId" element={<ProfileContainer />} />
        <Route path="/dialogs/*" element={<DialogsContainer />} />
        <Route path="/users" element={<UsersContainer />} />
      </Routes>
    </div>
  );
};

export default App;
