import React, { useState, useEffect, useRef } from 'react'
import ConversationInput from './conversation-input'
import { getConversationMessages, deleteMessage } from '../../helpers/requests'
import Loader from '../templates/loader'

// interval hook was borrowed from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

let _isMounted
export default props => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    _isMounted = true
    async function fetchData() {
      await getConversationMessages(props.location.state.conversation.id)
        .then(data => {
          if (_isMounted) {
            setMessages(data)
          }
        })
        .catch(error => {
          console.error('Error: ', error)
        })
      setLoading(false)
    }
    fetchData()
    return () => {
      _isMounted = false
    }
  }, [count])

  useInterval(() => {
    setCount(count + 1)
  }, 1000)

  if (loading) {
    return (
      <main role="main" style={{ textAlign: 'center' }}>
        <Loader />
      </main>
    )
  }
  return (
    <div className="container conversation-in-action custom w-75">
      <h2 className="row">{props.location.state.conversation.name}</h2>
      {messages.length !== 0 &&
        messages.map(message => {
          if (!message.creator) {
            let user = { id: 'deleted' }
            message.creator = user
          }
          if (
            message.creator.id === props.currentUser.id &&
            message.text !== 'Message was removed'
          ) {
            return (
              <div key={message.id} className="row">
                <div className="ml-auto">
                  <small>You</small>
                  <small
                    className="float-right"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      deleteMessage(message.id).then(response =>
                        console.log('Message deleted: ' + response)
                      )
                    }}
                  >
                    &#10006;
                  </small>
                  <br />
                  <span className="btn shadow p-3 mb-2 rounded bg-primary text-light">
                    {message.text}
                  </span>
                </div>
              </div>
            )
          } else if (
            message.creator.id === props.currentUser.id &&
            message.text === 'Message was removed'
          ) {
            return (
              <div key={message.id} className="row">
                <div className="ml-auto">
                  <small>You</small>
                  <br />
                  <span className="btn shadow p-3 mb-2 rounded bg-danger text-light">
                    {message.text}
                  </span>
                </div>
              </div>
            )
          } else if (message.text === 'Message was removed') {
            return (
              <div key={message.id} className="row">
                <div className="mr-auto">
                  <small>{message.creator.name}</small>
                  <br />
                  <span className="btn shadow p-3 mb-2 rounded bg-danger text-light">
                    {message.text}
                  </span>
                </div>
              </div>
            )
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
            )
          }
        })}
      <ConversationInput
        currentUser={props.currentUser}
        conversation={props.location.state.conversation}
      />
    </div>
  )
}
