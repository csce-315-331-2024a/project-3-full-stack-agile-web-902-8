import React, { useEffect, useState } from 'react';
import { User } from "@/lib/models";


function UserManager() {
    const [users, setUsers] = useState<User[]>([]);
    const [inFlux, setInFlux] = useState<boolean>(false);
    const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);

     /**
     * Fetches the list of users from the api route
     */
     async function fetchUsers() {
        const response = await fetch('/api/getAllUsers');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const userList = await response.json();
        setUsers(userList);
    }


    useEffect(() => {
        fetchUsers();
        setNeedsRefresh(false);
    }, [needsRefresh]);

    const handleRemoveUser = (i: number) => {

        async function removeUser(passedUsername: string) {
            console.log(passedUsername);
            const response = await fetch('/api/removeUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passedUsername),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        }

        const confirm = window.confirm("Are you sure you want to remove this user?")
        if(confirm)
        {
            const removed = [...users];
            removed.splice(i, 1);
            setUsers(removed);
            removeUser(users[i].username);
            fetchUsers();
            setNeedsRefresh(true);
        }
    }

    const handleChangeUsername = (i: number, newUsername: string) => {
        setInFlux(true);
        const changed = [...users];
        changed[i].username = newUsername;
        setUsers(changed);  
    }

    const handleChangeRole = (i: number, newRole: string) => {
        setInFlux(true);
        const changed = [...users];
        changed[i].role= newRole;
        setUsers(changed);
    }

    const handleChangeHourlySalary = (i: number, newSalary: number) => {
        setInFlux(true);
        const changed = [...users];
        changed[i].hourlySalary = newSalary;
        setUsers(changed);
    }

    const handleChangeHours = (i: number, newHours: number) => {
        setInFlux(true);
        const changed = [...users];
        changed[i].hours = newHours;
        setUsers(changed);
    }

    const handleSubmit = () => {

        async function updateUser(passedUser: User) {
            console.log(passedUser);
            const response = await fetch('/api/addOrUpdateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passedUser),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        }


        for (const user of users){
            if(user.username == '')
            {
                alert("Username cannot be empty")
                return;
            }
            else if(user.role != 'ADMINISTRATOR' && user.role != 'MANAGER' && user.role != 'COOK' && user.role != 'CASHIER')
            {
                alert("Role must be one of the following: 'ADMINISTRATOR', 'MANAGER', 'COOK', 'CASHIER'");
                return;
            }
            else if (user.hourlySalary < 7.25)
            {
                alert("Cannot have a salary below minimum wage");
                return;
            }
            else if (user.hours < 0)
            {
                alert("Cannot have negative hours");
                return;
            }
        }

        for (const user of users)
        {
            setInFlux(false);
            const updatedUser = new User(0, user.username, "", user.role, user.hourlySalary, user.hours);
            updateUser(updatedUser);
            fetchUsers();
            setNeedsRefresh(true);
        }
    }

    const handleAdd = () => {
        setInFlux(true);
        const add = [...users];
        add.push(new User(0, "", "", "", 0, 0));
        setUsers(add);
    }

    const refresh = () => {
        setNeedsRefresh(true);
        setInFlux(false);
    }

    return(
        <div>

            <button type="button" onClick={refresh}>Refresh</button>

            <table>
                <thead>
                    <tr>
                        <th>Remove</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Hourly Salary</th>
                        <th>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((entry, index) => (
                        <tr key={index}>
                            <td>
                                <button
                                    onClick={() =>
                                        handleRemoveUser(index)
                                    }
                                    type="button"
                                >
                                    X
                                </button>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={entry.username}
                                    onChange={(e) =>
                                        handleChangeUsername(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={entry.role}
                                    onChange={(e) =>
                                        handleChangeRole(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={entry.hourlySalary}
                                    onChange={(e) =>
                                        handleChangeHourlySalary(
                                            index,
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={entry.hours}
                                    onChange={(e) =>
                                        handleChangeHours(
                                            index,
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {inFlux && (<button type="button" onClick={handleSubmit}>
                Save Changes
            </button>)}
            <button type="button" onClick={handleAdd}>
                Add a user
            </button>
        </div>
    );
}

export default UserManager;