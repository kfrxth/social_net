import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormControls/FormControls";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import styles from "../common/FormControls/FormControls.module.css";
import withRouter from "../common/withRouter";
import { compose } from "redux";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"email"}
          name="email"
          validate={[required]}
          component={Input}
        />
      </div>
      <div>
        <Field
          placeholder={"пароль"}
          validate={[required]}
          name="password"
          type={"password"}
          component={Input}
        />
      </div>
      {props.error && (
        <div className={styles.formSummaryError}>{props.error}</div>
      )}
      <div>
        <Field type={"checkbox"} name="rememberMe" component={Input} />
        запомнить меня
      </div>
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

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };
  
  if (props.isAuth) {
    return <Navigate to={`/profile/${props.userId}`}></Navigate>;
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
