import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { getConversationById } from '../../helpers/requests'
import { deleteGroup } from '../../helpers/requests'

export default props => {
  const [conversation, setConversation] = useState({})
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col" />
          <th scope="col" />
          <th scope="col" />
          <th scope="col" />
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {props.groups.length !== 0 &&
          props.groups.map((group, index) => (
            <tr key={group.id}>
              <th scope="col">{index + 1}</th>
              <th className="font-weight-normal" scope="col">
                {group.name}
              </th>
              <th className="font-weight-normal" scope="col">
                {group.description}
              </th>
              <th scope="col">
                <button
                  type="button"
                  className="btn btn-primary float-right"
                  onClick={() => {
                    getConversationById(group.conversationId)
                      .then(data => {
                        setConversation(data)
                      })
                      .catch(error => {
                        console.error('Error: ', error)
                      })
                  }}
                >
                  Message
                </button>
                {conversation && conversation.id === group.conversationId && (
                  <Redirect
                    to={{
                      pathname: `/user/conversations/${
                        group.conversationId
                      }/in-action`,
                      state: {
                        action: 'Save Changes',
                        formName: 'Edit an Group',
                        conversation: conversation
                      }
                    }}
                  />
                )}
              </th>
              <th scope="col">
                <Link
                  to={{
                    pathname: `/user/events/event/create/`,
                    state: {
                      action: 'Create',
                      formName: 'Create new Event',
                      event: {
                        name: `Group event: ${group.name}`,
                        description: `This event is created for ${
                          group.name
                        }. You can edit description however you like.`,
                        creator: group.creator,
                        participants: group.members
                      }
                    }
                  }}
                >
                  <button type="button" className="btn btn-primary float-right">
                    Create event
                  </button>
                </Link>
              </th>
              {props.owned ? (
                <Fragment>
                  <th scope="col">
                    <Link
                      to={{
                        pathname: `/user/groups/${group.id}/edit/`,
                        state: {
                          action: 'Save Changes',
                          formName: 'Edit an Group',
                          group: group
                        }
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-primary float-right"
                      >
                        Edit
                      </button>
                    </Link>
                  </th>
                  <th scope="col">
                    <button
                      type="button"
                      className="btn btn-danger float-right"
                      onClick={() => {
                        deleteGroup(group.id).then(response =>
                          props.handleDelete()
                        )
                      }}
                    >
                      Delete
                    </button>
                  </th>
                </Fragment>
              ) : (
                <Fragment>
                  <th scope="col" colSpan="2">
                    <Link
                      to={{
                        pathname: `/user/groups/${group.id}/info`,
                        state: {
                          group: group
                        }
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-primary float-right"
                      >
                        Show
                      </button>
                    </Link>
                  </th>
                </Fragment>
              )}
            </tr>
          ))}

        {props.owned && (
          <tr>
            <td colSpan="5" />
            <td colSpan="2">
              <Link
                to={{
                  pathname: '/user/groups/group/create',
                  state: { action: 'Create', formName: 'Create new Group' }
                }}
              >
                <button className="btn btn-success float-right" type="button">
                  Create new
                </button>
              </Link>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
