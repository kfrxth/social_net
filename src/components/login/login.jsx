import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormControls/FormControls";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import styles from "../common/FormControls/FormControls.module.css";
import withRouter from "../common/withRouter";
import { compose } from "redux";

const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("email", "email", [required], Input)}
      {createField("пароль", "password", [required], Input, "password")}
      {error && <div className={styles.formSummaryError}>{error}</div>}
      {createField(
        null,
        "rememberMe",
        null,
        Input,
        "checkbox",
        "Запомнить меня"
      )}
      <div>
        <Field component="button" name="submitButton">
          Зайти
        </Field>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = ({ login, userId, isAuth }) => {
  const onSubmit = (formData) => {
    login(formData.email, formData.password, formData.rememberMe);
  };

  if (isAuth) {
    return <Navigate to={`/profile/${userId}`}></Navigate>;
  }

  return (
    <div>
      <h1>Авторизация</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
});

export default compose(connect(mapStateToProps, { login }), withRouter)(Login);
