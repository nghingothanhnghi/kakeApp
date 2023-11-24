import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DefaultPage() {
    const auth = useSelector(x => x.auth.value);
    return (
        <>
        <div>
            <h1>Hi {auth?.fullName}!</h1>
            <p>You're logged in with React 18 + Redux & JWT!!</p>
            <p><Link to="/users">Manage Users</Link></p>
        </div>
        </>
    );
}