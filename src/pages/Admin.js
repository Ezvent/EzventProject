import React, { useState } from 'react';



function User({ args }) {
    
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(isAdmin)
        console.log(email)
        if (email !== '') {
            const data = {
                'email': email,
                'is_admin': isAdmin
            }
            console.log(data)
            fetch('/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "data": data })
            }).then(response => response.json().then(data => {
                console.log(data)
                setEmail('')
                setIsAdmin(false)
            }))
        }

    }

    const isAdminHandler = (e) => {
        console.log(e.target.checked)
        setIsAdmin(e.target.checked)
    }


    const emailHandler = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value)
    }
    return (
        <>
            <h1> Welcome to Admin Page</h1>
            <h4> Hello {args.email}</h4>

            <form className="ui form" onSubmit={submitHandler}>
                <h2>Add user to the database</h2>
                <div className="inline field">
                    <div >
                        <input checked={isAdmin} onChange={isAdminHandler} type="checkbox" tabindex="0" />
                        <label> is Admin?</label>
                    </div>
                </div>
                <div className="fields" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="field">
                        <label>Email</label>
                        <input value={email} onChange={emailHandler} type="email" placeholder="example@email.com" />
                    </div>
                </div>
                <button type="submit" className="ui submit button">Submit</button>
            </form>

            <body>

                <main id="admin-homepage-main-holder">
                    <h1 id="homepage-header"></h1>
                    <div class="grid-container">
                        <div class="grid-admin-actions">
                            Actions
                            <ul>
                                <li><button class="create-button"><a href="/createuser">Create User</a></button></li>
                                <li><button class="remove-button"><a href="/removeuser">Remove User</a></button></li>
                                <li><button class="newevent-button"><a href="/createeventrequest">New Event</a></button></li>
                                <li><button class="calendar-button"><a href="/showcalendar">Calendar</a></button></li>
                            </ul> 
                        </div>
                    <div class="grid-employee-user-list">
                        Current Employees
                        <ol>
                            <li>Employee 1</li>
                            <li>Employee 2</li>
                            <li>Employee 3</li>
                            <li>Employee 4</li>
                            <li>Employee 5</li>
                        </ol> 
                    </div>
                    <div class="grid-swappable-element-holder">
                        Calendar Window
                    </div>
                </div>
            <div class="general-button-holder">
            <button class="default-button"><a href="/changepassword">Change Password</a></button>
            </div>
        </main>
    </body>
    </>
    );
}

export default User;
