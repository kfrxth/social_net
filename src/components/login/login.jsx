import React from "react";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormControls/FormControls";
import styles from './login.module.css';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"логин"}
          name="login"
          validate={[required]}
          component={Input}
        />
      </div>
      <div>
        <Field
          placeholder={"пароль"}
          validate={[required]}
          name="password"
          component={Input}
        />
      </div>
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

const Login = () => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div>
      <h1>Необходимо залогиниться</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
