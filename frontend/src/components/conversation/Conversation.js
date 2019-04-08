import React, { Fragment } from "react";
import ConversationInput from "./ConversationInput";
import Message from "./Message";

export default props => {
  return (
    <Fragment>
      <h2>{props.location.state.conversation.name}</h2>
      {props.location.state.conversation.messages.map(message => {
        return (
          <Fragment>
            <div>
              <span className="shadow p-3 mb-2 bg-white rounded">
                {message.text}
              </span>
            </div>
            <br />
          </Fragment>
        ); //<Message />;
      })}
      <ConversationInput />
    </Fragment>
  );
};
