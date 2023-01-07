import React, { useRef, useImperativeHandle } from "react";
import classes from './Input.module.css'

//ref is passed bcz in Input.js it ref prop was passed
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        // this fnctn should return obj which can be accessed from outside 
        //the lhs is externally available name
        return{
            focus: activate
        };
    });

    return (
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
    );
});

export default Input;