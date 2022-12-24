import { connect } from "react-redux";
import {
  sendNewMessageActionCreator,
  updateNewMessageActionCreator,
} from "../../redux/dialogs-reducer.js";
import Dialogs from "./Dialogs.jsx";
import { withAuthRedirect } from "../../hoc/AuthRedirect.jsx";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessage: (body) => {
      dispatch(updateNewMessageActionCreator(body));
    },
    sendMessage: () => {
      dispatch(sendNewMessageActionCreator());
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
