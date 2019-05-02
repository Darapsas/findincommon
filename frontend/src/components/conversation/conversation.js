import React, { useState, useEffect, useRef } from 'react'
import {
  getUserConversations,
  getUserCreatedConversations
} from '../../helpers/requests'
import ConversationList from './conversation-list'
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
  const [conversations, setConversations] = useState([])
  const [userConversations, setUserConversations] = useState([])
  const [itemDeleted, setItemDeleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, 3000)

  useEffect(() => {
    _isMounted = true
    async function fetchData() {
      await getUserConversations(props.currentUser.id)
        .then(data => {
          if (_isMounted) {
            setConversations(data)
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
  }, [itemDeleted, count])

  useEffect(() => {
    _isMounted = true
    async function fetchData() {
      await getUserCreatedConversations(props.currentUser.id)
        .then(data => {
          if (_isMounted) {
            setUserConversations(data)
          }
        })
        .catch(error => {
          console.error('Error: ', error)
        })
      setLoading(false)
    }
    fetchData()
    // FIX double rerender, if there will be time
    setItemDeleted(false)
    return () => {
      _isMounted = false
    }
  }, [itemDeleted, count])

  const handleDelete = () => {
    setItemDeleted(true)
  }

  if (loading) {
    return (
      <main role="main" style={{ textAlign: 'center' }}>
        <Loader />
      </main>
    )
  }

  return (
    <div className="custom w-75">
      <br />
      <h2>Your created conversations:</h2>
      <ConversationList
        conversations={userConversations}
        handleDelete={handleDelete}
        owned={true}
      />
      <br />
      <br />
      <h2>Other conversations:</h2>
      {conversations.length !== 0 && (
        <ConversationList conversations={conversations} owned={false} />
      )}
    </div>
  )
}
