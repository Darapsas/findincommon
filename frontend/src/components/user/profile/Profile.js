import React from "react";
import "./profile.css";

export default props => {
  console.log(props);

  let user = props.currentUser ? props.currentUser : props.location.state.user;

  return (
    <div className="profile-container">
      <div className="container">
        <div className="profile-info">
          <div className="profile-avatar">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.name} />
            ) : (
              <div className="text-avatar">
                <span>{user.name && user.name[0]}</span>
              </div>
            )}
          </div>
          <div className="profile-name">
            <h2>{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="profile">{user.description}</p>
            <br />
            <br />
            <ul className="list-group">
              <li className="list-group-item active">
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
      </div>
    </div>
  );
};
