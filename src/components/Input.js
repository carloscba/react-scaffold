import React from 'react';

const Input = (props) => (
    <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input autoComplete="off" type="text" className="form-control" name={props.name}
               id={props.name}
               placeholder={props.placeholder} value={props.value}
               onChange={props.onChange} />
    </div>
);

export default Input;