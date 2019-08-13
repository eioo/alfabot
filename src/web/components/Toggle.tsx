import React from 'react';

interface IToggleProps {
  children?: any;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Toggle(props: IToggleProps) {
  return (
    <div className={'custom-control custom-switch'}>
      <input
        type="checkbox"
        className="custom-control-input"
        id="customSwitches"
        checked={props.checked}
        onChange={props.onChange}
      />

      <label className="custom-control-label" htmlFor="customSwitches">
        {props.children}
      </label>
    </div>
  );
}
