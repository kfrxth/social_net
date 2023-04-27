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

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
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
      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl &&
        createField("Символы с картинки", "captcha", [required], Input, {})}
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

const Login = ({ login, userId, isAuth, captchaUrl }) => {
  const onSubmit = (formData) => {
    login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (isAuth) {
    return <Navigate to={`/profile/${userId}`}></Navigate>;
  }

  return (
    <div>
      <h1>Авторизация</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
});

export default compose(connect(mapStateToProps, { login }), withRouter)(Login);
