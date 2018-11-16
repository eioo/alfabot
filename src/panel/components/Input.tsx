import React from 'react';

interface IInputProps {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
}

export default function Input({
  type,
  name,
  onChange,
  value,
  ...rest
}: IInputProps) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={event => {
        event.preventDefault();
        onChange(name, event.target.value);
      }}
      {...rest}
    />
  );
}
