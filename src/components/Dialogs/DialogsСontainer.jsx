import { connect } from "react-redux";
import { sendNewMessageActionCreator } from "../../redux/dialogs-reducer.ts";
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
    sendMessage: (newMessageBody) => {
      dispatch(sendNewMessageActionCreator(newMessageBody));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
