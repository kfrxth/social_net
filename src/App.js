import React, { Component, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import { initializeApp } from "./redux/app-reducer";
import { connect, Provider } from "react-redux";
import withRouter from "./components/common/withRouter";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import { NewsPage } from "./components/News/NewsPage";
import { DocumentsPage } from "./components/Documents/DocumentsPage";
import { SettingsPage } from "./components/Settings/SettingsPage";
import store from "./redux/redux-store";
//import DialogsContainer from "./components/Dialogs/DialogsСontainer";
//import UsersContainer from "./components/Users/UsersContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
//import LoginPage from "./components/Login/Login";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsСontainer")
);

const LoginPage = React.lazy(() => import("./components/Login/Login"));

const UsersContainer = React.lazy(() =>
  import("./components/Users/UsersContainer")
);

const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/profile/:userId" element={<ProfileContainer />} />
              <Route path="/profile/" element={<ProfileContainer />} />
              <Route path="/dialogs/*" element={<DialogsContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const MainApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
