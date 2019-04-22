import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./profile.css";

export default props => {
  let user = props.currentUser ? props.currentUser : props.location.state.user;

  return (
    <div className="profile-container custom w-75">
      <div className="profile">
        {user.imageUrl ? (
          <div className="profile-avatar">
            <img src={user.imageUrl} alt={user.name} />
          </div>
        ) : (
          <div className="text-avatar">
            <span>{user.name && user.name[0]}</span>
          </div>
        )}
        <h2 className="profile-name text-center">{user.name}</h2>
        <p className="profile-email text-center">{user.email}</p>
        {props.currentUser && (
          <Fragment>
            <Link
              role="button"
              className="btn btn-sm btn-outline-secondary btn-block"
              to="/profile/edit"
            >
              Edit profile
            </Link>
            <Link
              role="button"
              className="btn btn-sm btn-outline-secondary btn-block"
              to="/user/hobbies"
            >
              Manage hobbies
            </Link>
          </Fragment>
        )}
      </div>
      <div className="profile-info">
        <h3>About {props.currentUser ? "you" : user.name}</h3>
        <p>{user.description}</p>
        <ul className="list-group">
          <li className="list-group-item list-group-item-dark">
            These are your hobbies:
          </li>
          {user.hobbies.length !== 0 &&
            user.hobbies.map(hobby => (
              <li className="list-group-item" key={hobby.id}>
                {hobby.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
