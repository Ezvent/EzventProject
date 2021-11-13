import './App.css';
import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setUsernameForm = (e) => {
    setUsername(e.target.value.trim());
  }

  const setPasswordForm = (e) => {
    setPassword(e.target.value.trim());
  }

  const submitLogin = () => {
    console.log(username);
    console.log(password);

    const data = {
      'username': username,
      'password': password
    }

    console.log(data);

    fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
                              'user': username,
                              'pswd': password
                            })
    }).then(response => response.json().then(newData => {
        console.log(newData);
    }))
  }

  return (  
    <div className="App">
      
          <h1 id="login-header">Login</h1>
          
          <div id="login-error-msg-holder">
            <p id="login-error-msg">Invalid username <span id="error-msg-second-line">and/or password</span></p>
          </div>
          
          <form id="login-form">
            <input type="text" name="username" id="username-field" onChange={ setUsernameForm } class="login-form-field" placeholder="Username"/>
            <input type="password" name="password" id="password-field" onChange={ setPasswordForm } class="login-form-field" placeholder="Password"/>
          </form>
          <button onClick={ submitLogin }>Submit</button>
    </div>
  );
}

export default App;
