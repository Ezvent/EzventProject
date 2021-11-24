import React, { useState } from 'react';
import { Button, Icon, Image, Modal, List } from 'semantic-ui-react';
import userimg from './users.png';
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
                    <p>
                        There are {users.length} users.
                    </p>

                    {users &&
                        <div>
                            <h3>All users</h3>
                            <List>
                                {users.map(em => {
                                    return (
                                        <List.Item style={{ marginBottom: "10px" }} key={Math.random}>
                                            <input style={{ margin: "12px" }} type="checkbox" />
                                            {em}
                                        </List.Item>
                                    )
                                })}
                            </List>
                        </div>
                    }
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)} primary>
                    Invite <Icon name='chevron right' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default CreateNewEvent;