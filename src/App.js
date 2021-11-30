import './App.css';
import React from 'react';
import Admin from './pages/Admin';
import User from './pages/User';
import Header from './components/Header';
import Home from './pages/Home';
const args = JSON.parse(document.getElementById("data").text);


function App() {
  console.log('isadmin', args.is_admin)
  return (
    <>
      <Header isSignin={args.email} />

      <div>
        {args.is_admin && <Admin args={args} />}

        {args.is_admin === false && args.email !== null && <User args={args} />}

        {args.email === null && <Home />}

      </div>

    </>

  );
}

export default App;
