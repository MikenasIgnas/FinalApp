/* eslint-disable jsx-a11y/label-has-associated-control */
import { TextField } from '@mui/material';
import React from 'react';

type InputComponentProps = {
    value?: string,
    name: string,
    placeholder:string,
    children?:React.ReactNode
    id:string,
    className?:string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    error?:boolean | undefined,
    helperText:string | false | undefined
    label:string
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    type:string
    inputRef?: React.MutableRefObject<HTMLInputElement>
};

const InputComponent:React.FC<InputComponentProps> = ({
 value,
 name,
 placeholder,
 id,
 onChange,
 label,
 className,
 error,
 helperText,
 children,
 onBlur,
 type,
 inputRef,

}) => (
  <TextField
    sx={{ mb: '50px' }}
    label={label}
    value={value}
    onChange={onChange}
    name={name}
    type={type}
    className={className}
    placeholder={placeholder}
    id={id}
    error={error}
    helperText={helperText}
    onBlur={onBlur}
    inputRef={inputRef}
  >
    {children}

  </TextField>
  );

export default InputComponent;
