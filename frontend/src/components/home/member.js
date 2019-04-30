import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { getConversation } from '../../helpers/requests'

export default props => {
  const [conversation, setConversation] = useState()
  const handleConversation = to => {
    getConversation(props.currentUser.id, to)
      .then(data => {
        if (data.id !== 'fail') {
          setConversation(data)
        } else {
          getConversation(props.currentUser.id, to)
            .then(data => {
              setConversation(data)
            })
            .catch(error => {
              console.error('Error: ', error)
            })
        }
      })
      .catch(error => {
        console.error('Error: ', error)
      })
  }

  return (
    <div key={props.member.id} className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <img
          className="bd-placeholder-img card-img-top"
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '5px'
          }}
          src={props.member.imageUrl}
          alt={props.member.name}
        />
        <div className="card-body">
          <h6>{props.member.name}</h6>
          <p className="card-text">
            {props.member.description && props.member.description.length > 150
              ? props.member.description.substring(0, 150) + '...'
              : props.member.description}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group btn-block">
              <Link
                role="button"
                className="btn btn-sm btn-outline-secondary"
                to={{
                  pathname: `/user/${props.member.id}/profile`,
                  state: {
                    user: props.member
                  }
                }}
              >
                View
              </Link>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleConversation(props.member.id)}
              >
                Message
              </button>
              {conversation && (
                <Redirect
                  to={{
                    pathname: `/user/conversations/${
                      conversation.id
                    }/in-action`,
                    state: {
                      conversation: conversation
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
