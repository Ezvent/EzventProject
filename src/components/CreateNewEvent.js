import React, { useState } from 'react';
import { Button, Icon, Image, Modal, List } from 'semantic-ui-react';
import userimg from './users.png';
import { Formik } from "formik";

const CreateNewEvent = () => {
    const [open, setOpen] = React.useState(false)
    const [users, setUsers] = useState([]);


    const usersHandler = () => {
        fetch('/getallusers').then(response => response.json().then(data => {
            console.log(data)
            setUsers(data.email)
        }))
    }
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button onClick={usersHandler}>Create New Event</Button>}
        >

            <Modal.Header>New Event</Modal.Header>
            <Modal.Content image scrolling>
                <Image size='medium' src={userimg} wrapped />

                <Modal.Description>


                    <Formik
                        initialValues={{
                        select_a_date: "" ,
                        start_time: "" ,
                        end_time: "",
                        job_description: "",
                        emails: new Array(20).fill(false)
                        }}
                        validate={(values) => {
                                       
                        const errors = {};
                        if (!values.select_a_date) {
                            errors.select_a_date = "Required";
                        }
                        if (!values.start_time) {
                            errors.start_time = "Required";
                        }
                        if (!values.end_time) {
                            errors.end_time = "Required";
                        }
                        if (!values.job_description) {
                            errors.job_description = "Required";
                        }
                        
                        return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {

                        const selected_emails = []
                        let j = 0;
                        for (let i = 0; i < users.length; i=i+1) {
                            if (values.emails[i]) {
                                selected_emails[j] = users[i]
                                j = j + 1;
                            }
                        }
                        const event_details = {select_a_date: values.select_a_date, start_time: values.start_time, end_time: values.end_time, job_description: values.job_description, emails: selected_emails}

                        console.log(event_details)
                        
                        fetch('/sendmail', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({"data": event_details})
                        }).then(response => response.json().then(data => {
                            console.log(data)

                            if (!data.message) {
                              alert('Invitation failed, there is some problem! :-(')
                          } else {
                              alert('Invitation sent successfully! :-)')
                          }
                        }))
                        
                        }}
                    >
                        {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                        }) => (
                        <form className="ui form" onSubmit={handleSubmit}>

                        <p><label>Select a date: 
                                <input 
                                    type="date"
                                    name="select_a_date"
                                    value={values.select_a_date}
                                    onChange={handleChange}
                                    onBlur={handleBlur} >
                                </input>
                            </label>
                        </p>
                        {errors.select_a_date && touched.select_a_date && errors.select_a_date}
                        <p><label>Start time 
                                <input 
                                    type="time"
                                    name="start_time"
                                    value={values.start_time}
                                    onChange={handleChange}
                                    onBlur={handleBlur} >
                                </input>
                            </label>
                        </p>
                        {errors.start_time && touched.start_time && errors.start_time}
                        <p><label>End time 
                                <input 
                                    type="time"
                                    name="end_time"
                                    value={values.end_time}
                                    onChange={handleChange}
                                    onBlur={handleBlur} >
                                </input>
                            </label>
                        </p>
                        {errors.end_time && touched.end_time && errors.end_time}
                        <p><label>Job description 
                                <input 
                                    type="text"
                                    name="job_description"
                                    value={values.job_description}
                                    onChange={handleChange}
                                    onBlur={handleBlur} >
                                </input>
                            </label>
                        </p>
                        {errors.job_description && touched.job_description && errors.job_description}


                        {users &&
                            <div>
                                <h3>All users</h3>
                                <List>
                                    {users.map((em, i) => {
                                        return (
                                            <List.Item style={{ marginBottom: "10px" }} key={Math.random}>
                                                <input 
                                                    style={{ margin: "12px" }} 
                                                    type="checkbox" 
                                                    name={`emails[${i}]`}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.emails[i]}
                                                />
                                                {em}
                                            </List.Item>
                                        )
                                    })}
                                </List>
                            </div>
                        }

                        <p></p>
                        <Button type="submit" disabled={isSubmitting} primary>
                            Invite <Icon name='chevron right' />
                        </Button>
                        </form>
                        )}
                    </Formik>


                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)} primary>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
export default CreateNewEvent;