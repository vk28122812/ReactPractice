
# Form Handling in React

This guide provides a comprehensive overview of handling form submissions, input validation, and input management in a React application using JSX.

## Overview

Effectively managing form submissions and input validation is crucial for creating a smooth user experience in React applications. This guide covers:

1. Input Validation
2. Handling Form Submission
3. Managing Input States
4. Example Code

## Input Validation

Input validation can be approached in several ways, each with its pros and cons:

- **On Every Keystroke:** Errors may be shown too early.
- **On Lost Focus:** Errors may be shown too long.
- **On Form Submission:** Errors may be shown too late.

Choose the validation method that best fits your use case to enhance user experience.

**Note on JSX:** In React, when using JSX, use `htmlFor` instead of `for` in label elements to prevent conflicts with JavaScript's reserved keywords.

## Handling Form Submission

By default, clicking a button inside a form submits it, triggering an HTTP request. To prevent this default behavior, you can use one of the following methods:

### Method 1: Using `type="button"`

Set the button's `type` attribute to `"button"` to prevent form submission:

```jsx
function handleSubmit() {
    console.log("Submitted");
}

return (
    <form>
        <h2>Login</h2>
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" />
        </div>
        <div>
            <button type="button" onClick={handleSubmit}>Login</button>
        </div>
    </form>
);
```

### Method 2: Using `onSubmit` with `event.preventDefault()`

Add the `onSubmit` attribute to the `<form>` element and use `event.preventDefault()` in the handler:

```jsx
function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted");
}

return (
    <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" />
        </div>
        <div>
            <button type="reset">Reset</button>
            <button type="submit">Login</button>
        </div>
    </form>
);
```

## Managing Input States

It's often more efficient to manage all input fields using a single state object rather than separate states for each input. Here’s how you can do it:

```jsx
import React, { useState } from 'react';

function LoginForm() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    function handleInputChange(identifier, value) {
        setInputs(prevInputs => ({
            ...prevInputs,
            [identifier]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(inputs);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={(event) => handleInputChange('email', event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={inputs.password}
                    onChange={(event) => handleInputChange('password', event.target.value)}
                />
            </div>
            <div>
                <button type="reset">Reset</button>
                <button type="submit">Login</button>
            </div>
        </form>
    );
}
```

## Using Refs for Inputs

Alternatively, you can use refs to access input values. This method can be simpler for a small number of fields but may become complicated for larger forms.

```jsx
import React, { useRef } from 'react';

function LoginForm() {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        console.log(`${enteredEmail} ${enteredPassword}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" ref={emailRef} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" ref={passwordRef} />
            </div>
            <div>
                <button type="reset">Reset</button>
                <button type="submit">Login</button>
            </div>
        </form>
    );
}
```

## Using FormData

You can also extract form data using the browser's built-in FormData. All input fields must have a name property. Here's how to implement it:

```jsx
function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);
}

return (
    <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" />
        </div>
        <div>
            <button type="reset">Reset</button>
            <button type="submit">Sign up</button>
        </div>
    </form>
);
```

## Resetting Forms in React

Resetting forms can be achieved through various methods depending on whether you are using controlled or uncontrolled components.

### Using Button with `type="reset"`

One of the simplest ways to reset a form is by using a button with the `type` attribute set to `"reset"`:

```jsx
return (
    <form>
        {/* Input fields */}
        <div>
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
        </div>
    </form>
);
```

### Using `event.target.reset()`

When handling form submissions, you can use `event.target.reset()` to clear the form after submission:

```jsx
function handleSubmit(event) {
    event.preventDefault();
    // Process form data...
    event.target.reset(); // This will reset the form fields
}
```

### Using Refs to Clear Inputs

If you are using refs to manage input values, you can reset the input fields by directly manipulating their values:

```jsx
import React, { useRef } from 'react';

function LoginForm() {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        console.log(`Email: ${emailRef.current.value}, Password: ${passwordRef.current.value}`);
        
        // Resetting input fields
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" ref={emailRef} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" ref={passwordRef} />
            </div>
            <div>
                <button type="reset">Reset</button>
                <button type="submit">Login</button>
            </div>
        </form>
    );
}
```

## Validation Techniques

### Validation on Keystroke

Create flags for input fields and show error messages accordingly.

```jsx
export default function StateLogin() {
  
  const [inputs, setInputs] = useState({
      email: '',
      password: ''
  });

  const emailIsInvalid = inputs.email !== '' && !inputs.email.includes('@');
  
  function handleInputChange(identifier, value) {
      setInputs(prevInputs => ({
          ...prevInputs,
          [identifier]: value
      }));
  }

  function handleSubmit(event) {
      event.preventDefault();
      console.log(inputs);
  }
  
  return (
      <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div>
              <label htmlFor="email">Email</label>
              <input
                  id="email"
                  type="text"
                  value={inputs.email}
                  onChange={(event) => handleInputChange('email', event.target.value)}
              />
          </div>
          {emailIsInvalid && <p>Please enter a valid Email</p>}
          <div>
              <button type="reset">Reset</button>
              <button type="submit">Login</button>
          </div>
      </form>
  );
}
```

### Validation on Lost Focus (Blur)

```jsx
export default function StateLogin() {
  
  const [inputs, setInputs] = useState({
      email: '',
      password: ''
  });

  const [didEdit

, setDidEdit] = useState({
      email: false,
      password: false
  });

  const emailIsInvalid = didEdit.email && !inputs.email.includes('@');

  function handleInputChange(identifier, value) {
      setInputs(prevInputs => ({
          ...prevInputs,
          [identifier]: value
      }));

      setDidEdit(prevEdit => ({
          ...prevEdit,
          [identifier]: false
      }));
  }
  
  function handleInputBlur(identifier) {
      setDidEdit(prevEdit => ({
          ...prevEdit,
          [identifier]: true
      }));
  }

  function handleSubmit(event) {
      event.preventDefault();
      console.log(inputs);
  }
  
  return (
      <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div>
              <label htmlFor="email">Email</label>
              <input
                  id="email"
                  type="text"
                  value={inputs.email}
                  onChange={(event) => handleInputChange('email', event.target.value)}
                  onBlur={() => handleInputBlur('email')}
              />
              {emailIsInvalid && <p>Please enter a valid Email</p>}
          </div>
          <div>
              <button type="reset">Reset</button>
              <button type="submit">Login</button>
          </div>
      </form>
  );
}
```

### Validation on Submission

```jsx
export default function Login() {
    
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const emailRef = useRef();
  
    function handleSubmit(event) {
        event.preventDefault();
        const enteredEmail = emailRef.current.value;
        const emailIsValid = enteredEmail.includes('@');
        if (!emailIsValid) {
            setEmailIsInvalid(true);
            return; 
        }
        setEmailIsInvalid(false);
        console.log("sending http request....");
    }
  
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    ref={emailRef}
                />
                {emailIsInvalid && <p>Email is invalid</p>}
            </div>
            <div>
                <button type="reset">Reset</button>
                <button type="submit">Login</button>
            </div>
        </form>
    );
}
```

### Validation using Props

Using built-in validation props like `required`, `minLength`, `maxLength`, and `type` can simplify your code.

### Mixing Custom and Built-in Validation 

For scenarios like Confirm Password validation:

```jsx
export default function SignUp() {
    const [passwordNotEqual, setPasswordNotEqual] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        
        if (data['password'] !== data['confirm-password']) {
            setPasswordNotEqual(true);
            return;
        }
        setPasswordNotEqual(false);
        console.log(data);
        event.target.reset();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Welcome on board!</h2>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" />
            </div>
            <div>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    id="confirm-password"
                    type="password"
                    name="confirm-password"
                />
                {passwordNotEqual && <p>Passwords must match.</p>}
            </div>
            <div>
                <button type="reset">Reset</button>
                <button type="submit">Sign up</button>
            </div>
        </form>
    );
}
```
