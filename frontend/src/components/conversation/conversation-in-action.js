// interval hook was borrowed from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import React, { Fragment, useState, useEffect, useRef } from "react";
import ConversationInput from "./conversation-input";
import { getConversationMessages } from "../../helpers/requests";
import Loader from "../templates/loader";

let _isMounted;
export default props => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [interval, setInterval] = useState(0);

  useEffect(() => {
    _isMounted = true;
    async function fetchData() {
      await getConversationMessages(props.location.state.conversation.id)
        .then(data => {
          if (_isMounted) {
            setMessages(data);
          }
        })
        .catch(error => {
          console.error("Error: ", error);
        });
      setLoading(false);
    }
    fetchData();
    return () => {
      _isMounted = false;
    };
  }, [interval]);

  useInterval(() => {
    setInterval(interval + 1);
  }, 1000);

  if (loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }
  return (
    <div className="container conversation-in-action custom w-75">
      <h2 className="row">{props.location.state.conversation.name}</h2>
      {messages.length !== 0 &&
        messages.map(message => {
          if (message.creator.id === props.currentUser.id) {
            return (
              <div key={message.id} className="row">
                <div className="ml-auto">
                  <small>You</small>
                  <br />
                  <span className="btn shadow p-3 mb-2 rounded bg-primary text-light">
                    {message.text}
                  </span>
                </div>
              </div>
            );
          } else {
            return (
              <div key={message.id} className="row">
                <div className="mr-auto">
                  <small>{message.creator.name}</small>
                  <br />
                  <span className="btn shadow p-3 mb-2 bg-white rounded">
                    {message.text}
                  </span>
                </div>
              </div>
            );
          }
        })}
      <ConversationInput
        currentUser={props.currentUser}
        conversation={props.location.state.conversation}
      />
    </div>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
