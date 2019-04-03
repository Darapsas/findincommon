import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

let _isMounted;
export default props => {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    _isMounted = true;

    fetch(`http://192.168.99.100:8080/api/conversations`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        if (_isMounted) {
          setConversations(data);
        }
      });
    return () => {
      _isMounted = false;
    };
  }, [conversations]);

  const deleteConversation = id => {
    fetch(`http://192.168.99.100:8080/api/conversations/${id}`, {
      method: "DELETE"
    })
      .then(response => console.log("Success", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col" />
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {conversations.map((conversation, index) => (
          <tr key={conversation.id}>
            <th scope="col">{index + 1}</th>
            <th className="font-weight-normal" scope="col">
              {conversation.name}
            </th>
            <th scope="col">
              <Link
                to={{
                  pathname: `/conversation_edit/${conversation.id}`,
                  state: {
                    action: "Save Changes",
                    formName: "Edit a Conversation",
                    conversation: conversation
                  }
                }}
              >
                <button type="button" className="btn btn-primary float-right">
                  Show
                </button>
              </Link>
            </th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-danger float-right"
                onClick={() => deleteConversation(conversation.id)}
              >
                Delete
              </button>
            </th>
          </tr>
        ))}
        <tr>
          <td colSpan="2" />
          <td colSpan="2">
            <Link
              to={{
                pathname: "/conversation_create/",
                state: { action: "Create", formName: "Create new Conversation" }
              }}
            >
              <button className="btn btn-success float-right" type="button">
                Create new
              </button>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
