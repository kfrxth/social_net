import React from "react";
import styles from "./FormControls.module.css";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators/validators";

type FormControlParamsType = {
  meta: WrappedFieldMetaProps;
  child?: React.ReactNode;
  children: React.ReactNode;
};

export const FormControl: React.FC<FormControlParamsType> = ({
  meta: { touched, error },
  child,
  ...props
}) => {
  const hasError = touched && error;

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{props.children}</div>
      <div>{hasError && <span>{error}</span>}</div>
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps}></input>
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  nameField: FormKeysType,
  validate: Array<FieldValidatorType> | undefined,
  component: React.FC<WrappedFieldProps>,
  typeField?: string | object,
  text?: string
) {
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
}
