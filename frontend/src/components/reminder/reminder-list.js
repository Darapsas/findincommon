import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

let _isMounted
export default props => {
  const [reminders, setReminders] = useState([])
  useEffect(() => {
    _isMounted = true

    fetch(`http://192.168.99.100:8080/api/reminders`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (_isMounted) {
          setReminders(data)
        }
      })
    return () => {
      _isMounted = false
    }
  }, [reminders])

  const deleteReminder = id => {
    fetch(`http://192.168.99.100:8080/api/reminders/${id}`, {
      method: 'DELETE'
    })
      .then(response => console.log('Success', JSON.stringify(response)))
      .catch(error => console.error('Error:', error))
  }

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Time in seconds</th>
          <th scope="col" />
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {reminders.map((reminder, index) => (
          <tr key={reminder.id}>
            <th scope="col">{index + 1}</th>
            <th className="font-weight-normal" scope="col">
              {reminder.name}
            </th>
            <th className="font-weight-normal" scope="col">
              {reminder.timeInSeconds}
            </th>
            <th scope="col">
              <Link
                to={{
                  pathname: `/reminder_edit/${reminder.id}`,
                  state: {
                    action: 'Save Changes',
                    formName: 'Edit a Reminder',
                    reminder: reminder
                  }
                }}
              >
                <button type="button" className="btn btn-primary float-right">
                  Edit
                </button>
              </Link>
            </th>
            <th scope="col">
              <button
                type="button"
                className="btn btn-danger float-right"
                onClick={() => deleteReminder(reminder.id)}
              >
                Delete
              </button>
            </th>
          </tr>
        ))}
        <tr>
          <td colSpan="4" />
          <td colSpan="2">
            <Link
              to={{
                pathname: '/reminder_create/',
                state: { action: 'Create', formName: 'Create new Reminder' }
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
  )
}
