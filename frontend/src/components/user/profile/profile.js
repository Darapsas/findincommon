import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { deleteAccount } from '../../../helpers/requests'
import './profile.css'

export default props => {
  let user = props.currentUser ? props.currentUser : props.location.state.user

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
            <button
              type="button"
              className="btn btn-sm btn-outline-danger btn-block"
              onClick={() => {
                deleteAccount(user.id).then(response =>
                  props.handleAccountDeletion()
                )
              }}
            >
              Delete account
            </button>
          </Fragment>
        )}
      </div>
      <div className="profile-info">
        <h3>About {props.currentUser ? 'you' : user.name}</h3>
        <p>{user.description}</p>
        <ul className="list-group">
          <li className="list-group-item list-group-item-dark">
            These are your hobbies:
          </li>
          {user.hobbies.length !== 0 ? (
            user.hobbies.map(hobby => (
              <li className="list-group-item" key={hobby.id}>
                {hobby.name}
              </li>
            ))
          ) : (
            <li className="list-group-item list-group-item-warning">
              Add at least one hobby if you want to be seen by other members!
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
