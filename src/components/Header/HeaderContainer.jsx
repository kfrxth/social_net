import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setAuthUserData } from "../../redux/auth-reducer";
import { usersAPI } from "../../api/api-js";

class HeaderContainer extends React.Component {
  componentDidMount() {
    usersAPI.getMyHeader().then((response) => {
      if (response.data.resultCode === 0) {
        const { email, id, login } = response.data.data;
        this.props.setAuthUserData(id, email, login);
      }
    });
  }

  render() {
    return <Header {...this.props}></Header>;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);
