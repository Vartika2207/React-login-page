import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

//116:05:00
//action is always the last state snapshot
const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return (
      {value: action.val, isValid: action.val.includes('@')}
    );
  }
  if(action.type === 'INPUT_BLUR') {
    return (
      {value: state.val, isValid: state.value.includes('@')}
    );
  }

  return (
    {value: '', isValid: false}
  );
};

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return (
      {value: action.val, isValid: action.val.trim().length > 6}
    );
  }
  if(action.type === 'INPUT_BLUR') {
    return (
      {value: state.val, isValid: state.value.trim().length > 6}
    );
  }

  return (
    {value: '', isValid: false}
  );
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  //object destructuring, to pull out certain properties of object
  //here we are pulling isValid property and storing it in alias
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  /*sideEffect function which runs if either of the dependencies are valid*/
  useEffect(() => {
    //to avoid execution of this with every stroke or change, below returns a timer-identifier
    const identifier = setTimeout(() => {
      console.log('Checking form validity');
      setFormIsValid(
        emailIsValid && passwordIsValid
        );
    }, 500);

    /*below is clean-up function in useEffect */
    return (() => {
      console.log('CLEAN-UP');
      clearTimeout(identifier);
    })
    }, [emailIsValid, passwordIsValid]);


  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    //below returns object
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});


    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid 
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})

    // setFormIsValid(
    //   // event.target.value.trim().length > 6 && enteredEmail.includes('@')
    //   event.target.value.trim().length > 6 && emailState.isValid
    //   );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
