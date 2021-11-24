import React, {useState} from 'react';
import AddorRemovePopup from '../components/AddorRemovePopup';

import UsersListPopup from '../components/UsersListPopup';

function User({ args }) {
    // const [isAdmin, setIsAdmin] = useState(false);
    // const [email, setEmail] = useState('');
    

    // const submitHandler = (e) => {
    //     e.preventDefault();
    
    //     console.log(isAdmin)
    //     console.log(email)
    //     if (email !== '') {
    //         const data = {
    //             'email': email,
    //             'is_admin': isAdmin
    //         }
    //         console.log(data)
    //         fetch('/adduser', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({"data": data})
    //         }).then(response => response.json().then(data => {
    //             console.log(data)
    //             setEmail('')
    //             setIsAdmin(false)
    //         }))
    //     }

    // }

    // const isAdminHandler = (e) => {
    //     console.log(e.target.checked)
    //     setIsAdmin(e.target.checked)
    // }


    // const emailHandler = (e) => {
    //     console.log(e.target.value)
    //     setEmail(e.target.value)
    // }

  return (
    <>
    <h1> Welcome to Admin Page</h1>
    <h4> Hello {args.email}</h4>
    <UsersListPopup />
        
    {/* <form className="ui form" onSubmit={submitHandler}>
        <h2>Add user to the database</h2>
        <div className="inline field">
            <div >
                <input checked={isAdmin} onChange={isAdminHandler} type="checkbox" tabindex="0" />
                <label> is Admin?</label>
            </div>
        </div>
        <div className="fields" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="field">
            <label>Email</label>
            <input value={email} onChange={emailHandler} type="email" placeholder="example@email.com"/>
            </div>
        </div>
        <button type="submit" className="ui submit button">Submit</button>
    </form> */}

    <AddorRemovePopup />
     </>
  );
}

export default User;
