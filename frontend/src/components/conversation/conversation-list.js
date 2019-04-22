import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { deleteConversation } from "../../helpers/requests";

export default props => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Created by</th>
        <th scope="col" />
        <th scope="col" />
        <th scope="col" />
      </tr>
    </thead>
    <tbody>
      {props.conversations.length !== 0 &&
        props.conversations.map((conversation, index) => (
          <tr key={conversation.id}>
            <th scope="col">{index + 1}</th>
            <th className="font-weight-normal" scope="col">
              {conversation.name}
            </th>
            <th className="font-weight-normal" scope="col">
              {conversation.creator.name}
            </th>

            {props.owned ? (
              <Fragment>
                <th scope="col">
                  <Link
                    to={{
                      pathname: `/user/conversations/${
                        conversation.id
                      }/in-action`,
                      state: {
                        conversation: conversation
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
                <th scope="col">
                  <Link
                    to={{
                      pathname: `/user/conversations/${conversation.id}/edit/`,
                      state: {
                        action: "Save Changes",
                        formName: "Edit an Conversation",
                        conversation: conversation
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
                      deleteConversation(conversation.id).then(response =>
                        props.handleDelete()
                      );
                    }}
                  >
                    Delete
                  </button>
                </th>
              </Fragment>
            ) : (
              <Fragment>
                <th scope="col" colSpan="3">
                  <Link
                    to={{
                      pathname: `/user/conversations/${conversation.id}/info`,
                      state: {
                        conversation: conversation
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
          <td colSpan="4" />
          <td colSpan="2">
            <Link
              to={{
                pathname: "/user/conversations/conversation/create",
                state: { action: "Create", formName: "Create new Conversation" }
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
);
