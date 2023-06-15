import React from "react";
import { connect } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormControls/FormControls";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import styles from "../common/FormControls/FormControls.module.css";
import withRouter from "../common/withRouter";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const LoginForm: React.FC<InjectedFormProps<
  LoginFormValuesType,
  LoginFormOwnProps
> &
  LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>(
        "email",
        "email",
        [required],
        Input
      )}
      {createField<LoginFormValuesTypeKeys>(
        "пароль",
        "password",
        [required],
        Input,
        "password"
      )}
      {error && <div className={styles.formSummaryError}>{error}</div>}
      {createField<LoginFormValuesTypeKeys>(
        undefined,
        "rememberMe",
        undefined,
        Input,
        "checkbox",
        "Запомнить меня"
      )}
      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl &&
        createField<LoginFormValuesTypeKeys>(
          "Символы с картинки",
          "captcha",
          [required],
          Input,
          {}
        )}
      <div>
        <Field component="button" name="submitButton">
          Зайти
        </Field>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
  ) => void;
};

type MapStatePropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
  userId: number | null;
};

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = ({
  login,
  userId,
  isAuth,
  captchaUrl,
}) => {
  const onSubmit = (formData: LoginFormValuesType) => {
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
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
});

export default compose(connect(mapStateToProps, { login }), withRouter)(Login);
