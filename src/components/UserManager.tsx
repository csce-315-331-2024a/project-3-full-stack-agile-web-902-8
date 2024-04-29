import React, { useEffect, useState } from 'react';
import { User } from '@/lib/models';

/**
 * Interface for dynamicUser which contains the user and whether that user needs to be updated
 */
interface dynamicUser {
    user: User;
    flux: boolean;
}

/**
 * Creates the component for managing users
 * @returns the component for managing users
 */
function UserManager() {
    const [users, setUsers] = useState<dynamicUser[]>([]);
    const [inFlux, setInFlux] = useState<boolean>(false);
    const [needsRefresh, setNeedsRefresh] = useState<boolean>(false);
    const [hasRun, setHasRun] = useState<boolean>(false);

    /**
     * Fetches the list of users from the api route
     */
    async function fetchUsers() {
        const response = await fetch('/api/getAllUsers');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const userList = await response.json();
        const dUsers: dynamicUser[] = [];
        for (const user of userList) {
            const currentUser: dynamicUser = {
                user,
                flux: false,
            };
            dUsers.push(currentUser);
        }
        setUsers(dUsers);
        console.log('inside fetch');
        console.log(dUsers);
    }

    useEffect(() => {
        if (!hasRun) {
            fetchUsers();
            setHasRun(true);
        }
        if (needsRefresh) {
            console.log('Fetching again');
            fetchUsers();
            setNeedsRefresh(false);
        }
        //setNeedsRefresh(false);
    }, [needsRefresh, hasRun]);

    /**
     * Handles remvoving a user
     * @param i the index of the user
     */
    const handleRemoveUser = (i: number) => {
        async function removeUser(passedUsername: string) {
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

        const confirm = window.confirm(
            'Are you sure you want to remove this user?'
        );
        if (confirm) {
            const removed = [...users];
            removed.splice(i, 1);
            setUsers(removed);
            removeUser(users[i].user.username);
            handleRefresh();
        }
    };

    /**
     * Handles changing the username of a user
     * @param i the index of the user
     * @param newUsername the new username for the user
     */
    const handleChangeUsername = (i: number, newUsername: string) => {
        setInFlux(true);
        const changed = [...users];
        changed[i].user.username = newUsername;
        changed[i].flux = true;
        setUsers(changed);
    };

    /**
     * Handles changing the role of a user
     * @param i the index of the user
     * @param newUsername the new role for the user
     */
    const handleChangeRole = (i: number, newRole: string) => {
        setInFlux(true);
        const changed = [...users];
        changed[i].user.role = newRole;
        changed[i].flux = true;
        setUsers(changed);
    };

    /**
     * Handles changing the salary of a user
     * @param i the index of the user
     * @param newUsername the new salary for the user
     */
    const handleChangeHourlySalary = (i: number, newSalary: number) => {
        setInFlux(true);
        const changed = [...users];
        changed[i].user.hourlySalary = newSalary;
        changed[i].flux = true;
        setUsers(changed);
    };

    /**
     * Handles changing the hours of a user
     * @param i the index of the user
     * @param newUsername the new hours for the user
     */
    const handleChangeHours = (i: number, newHours: number) => {
        setInFlux(true);
        const changed = [...users];
        changed[i].user.hours = newHours;
        changed[i].flux = true;
        setUsers(changed);
    };

    /**
     * Handles submitting the adjusted users
     */
    const handleSubmit = () => {
        async function updateUser(passedUser: User) {
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

        for (const dUser of users) {
            if (dUser.user.username == '') {
                alert('Username cannot be empty');
                return;
            } else if (
                dUser.user.role != 'ADMINISTRATOR' &&
                dUser.user.role != 'MANAGER' &&
                dUser.user.role != 'COOK' &&
                dUser.user.role != 'CASHIER'
            ) {
                alert(
                    "Role must be one of the following: 'ADMINISTRATOR', 'MANAGER', 'COOK', 'CASHIER'"
                );
                return;
            } else if (dUser.user.hourlySalary < 7.25) {
                alert(
                    'Cannot have a salary below minimum wage which is 7.25 $/hr'
                );
                return;
            } else if (dUser.user.hours < 0) {
                alert('Cannot have negative hours');
                return;
            }
        }

        for (const dUser of users) {
            setInFlux(false);
            if (dUser.flux) {
                const updatedUser = new User(
                    0,
                    dUser.user.username,
                    '',
                    dUser.user.role,
                    dUser.user.hourlySalary,
                    dUser.user.hours
                );
                updateUser(updatedUser);
                handleRefresh();
                handleRefresh();
                dUser.flux = false;
            }
        }
    };

    /**
     * Handles adding a new user
     */
    const handleAdd = () => {
        setInFlux(true);
        const add = [...users];
        const newUser: dynamicUser = {
            user: new User(0, '', '', '', 0, 0),
            flux: true,
        };
        console.log(newUser);
        add.push(newUser);
        setUsers(add);
        console.log(add);
    };

    /**
     * Handles refreshing the users list
     */
    const handleRefresh = () => {
        console.log('Refreshing');
        setNeedsRefresh(true);
        console.log(needsRefresh);
        setInFlux(false);
        //setNeedsRefresh(false);
        fetchUsers();
    };

    return (
        <div>
            <button type="button" onClick={handleRefresh}>
                Refresh
            </button>

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
                                    onClick={() => handleRemoveUser(index)}
                                    type="button"
                                >
                                    X
                                </button>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={entry.user.username}
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
                                    value={entry.user.role}
                                    onChange={(e) =>
                                        handleChangeRole(index, e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={entry.user.hourlySalary}
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
                                    value={entry.user.hours}
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

            {inFlux && (
                <button type="button" onClick={handleSubmit}>
                    Save Changes
                </button>
            )}
            <button type="button" onClick={handleAdd}>
                Add a user
            </button>
        </div>
    );
}

export default UserManager;