import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../../store'
import UserListComponent from '../../components/user-list';

export default function UsersPage() {
    const users = useSelector(x => x.users.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);
    return (
        <>
            <UserListComponent users={users} userActions={userActions} />
        </>
    );
}