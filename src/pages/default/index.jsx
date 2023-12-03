import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DefaultPage() {
  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <>
      <div>
        <header className="jumbotron">
          <div className="container">
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
          </div>
        </header>

      </div>
    </>
  );
}