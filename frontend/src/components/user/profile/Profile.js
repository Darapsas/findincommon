import React from "react";
import "./profile.css";

const Profile = props => {
  console.log(props);
  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile-info">
          <div className="profile-avatar">
            {props.currentUser.imageUrl ? (
              <img
                src={props.currentUser.imageUrl}
                alt={props.currentUser.name}
              />
            ) : (
              <div className="text-avatar">
                <span>
                  {props.currentUser.name && props.currentUser.name[0]}
                </span>
              </div>
            )}
          </div>
          <div className="profile-name">
            <h2>{props.currentUser.name}</h2>
            <p className="profile-email">{props.currentUser.email}</p>
            <p className="profile">{props.currentUser.description}</p>
            <br />
            <br />
            <ul className="list-group">
              <li className="list-group-item active">
                These are your hobbies:
              </li>
              {props.currentUser.hobbies.length !== 0 &&
                props.currentUser.hobbies.map(hobby => (
                  <li className="list-group-item" key={hobby.id}>
                    {hobby.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
