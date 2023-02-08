import React from "react";
import styles from "./FormControls.module.css";
import { Field } from "redux-form";

export const FormControl = ({ input, meta: {touched, error}, child, ...props }) => {
  const hasError = touched && error;

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{props.children}</div>
      <div>{hasError && <span>{error}</span>}</div>
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  );
};

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps}></input>
    </FormControl>
  );
};

export const createField = (
  placeholder,
  nameField,
  validate,
  component,
  typeField,
  text
) => {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={nameField}
        validate={validate}
        component={component}
        type={typeField}
      />
      {text}
    </div>
  );
};
