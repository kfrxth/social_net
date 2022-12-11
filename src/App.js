import React from "react";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsСontainer";
import { Routes, Route } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dialogs/*" element={<DialogsContainer />} />
        <Route path="/users" element={<UsersContainer></UsersContainer>} />
      </Routes>
    </div>
  );
};

export default App;
