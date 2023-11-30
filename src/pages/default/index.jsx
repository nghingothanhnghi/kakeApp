import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DefaultPage() {
    const { user: currentUser } = useSelector((state) => state.auth);
    return (
        <>
        <div>
        <header className="jumbotron">
        <h3>
           Profile
        </h3>
      </header>
     
        </div>
        </>
    );
}