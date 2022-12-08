import { connect } from "react-redux";
import {
  sendNewMessageActionCreator,
  updateNewMessageActionCreator,
} from "../../redux/dialogs-reducer.js";
import Dialogs from "./Dialogs.jsx";

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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
