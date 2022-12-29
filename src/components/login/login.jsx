import React from "react";
import { Field, reduxForm } from "redux-form";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"логин"} name="login" component="input" />
      </div>
      <div>
        <Field placeholder={"пароль"} name="password" component="input" />
      </div>
      <div>
        <Field type={"checkbox"} name="rememberMe" component="input" />
        запомнить меня
      </div>
      <div>
        <Field component="button" name="submitButton">
          зайти
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
