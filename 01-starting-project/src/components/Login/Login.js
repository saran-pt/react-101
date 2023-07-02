import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const mailReducer = (state, action) => {
  if (action.type === 'USER_ENTERD_MAIL') {
    return {val: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'EMAIL_IS_VALID') {
    console.log('asdfasdfas', state.val)
    return {val: state.val, isValid: state.val.includes('@')};
  }
  return {val: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_ENTERD_PASSWORD') {
    return {val: action.val, isValid: state.val.trim().length>6};
  }
  if (action.type === 'PASSWORD_BLUR') {
    return {val: state.val, isValid: state.val.trim().length>6};
  };
  return {val: '', isValid: false};
};


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(mailReducer, {val: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {val: '', isValid: null});

  const {isValid: mailValidity} = emailState;
  const {isValid: passwordValidity} = passwordState

  useEffect(()=>{
    const timer = setTimeout(()=>{
      console.log('set time out');
      setFormIsValid(
        mailValidity && passwordValidity
      );
    }, 500);

    return ()=>{
      clearTimeout(timer);
    };
    
  }, [mailValidity, passwordValidity]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_ENTERD_MAIL', val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_ENTERD_PASSWORD', val: event.target.value});

    // setFormIsValid(
    //   // event.target.value.trim().length > 6 && enteredEmail.includes('@')
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type: 'EMAIL_IS_VALID'});
  };
  
  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'PASSWORD_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    props.onLogin(emailState.val, passwordState.val);
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
            value={emailState.val}
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
            value={passwordState.val}
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
