import React from "react";

export default props => (
  <div className="w-75 custom">
    <h2>Event info:</h2>
    <div className="form-group">
      <label>Name</label>
      <input
        className="form-control"
        name="name"
        type="text"
        placeholder="E.g. Flat Earth discussion"
        value={props.location.state.event.name}
        disabled
      />
    </div>

    <div className="form-group">
      <label>Description</label>
      <input
        className="form-control"
        rows="3"
        name="description"
        component="textarea"
        placeholder="E.g. Discussion will be about: How are we going to prove the world that Earth is not Round."
        value={props.location.state.event.description}
        disabled
      />
    </div>

    <div className="form-group">
      <label>When does the event start?</label>
      <input
        className="form-control"
        name="startDate"
        type="datetime-local"
        value={props.location.state.event.startDate}
        disabled
      />
    </div>

    <div className="form-group">
      <label>When does the event end?</label>
      <input
        className="form-control"
        name="endDate"
        type="datetime-local"
        value={props.location.state.event.endDate}
        disabled
      />
    </div>

    <div className="form-group">
      <label>Send reminders:</label>
      {props.location.state.event.reminders.map((reminder, index) => (
        <div key={index}>
          <label>
            <input
              name={`reminder-${index}`}
              type="checkbox"
              checked={true}
              disabled
            />{" "}
            {reminder.name}
          </label>
        </div>
      ))}
    </div>

    <div className="form-group">
      <label>Participants:</label>
      {props.location.state.event.participants.map((participant, index) => (
        <div key={index}>
          <input
            name={`reminder-${index}`}
            type="text"
            value={participant.name}
            disabled
          />
        </div>
      ))}
    </div>

    <button
      className="btn btn-danger"
      type="button"
      onClick={() => props.history.goBack()}
    >
      Go back
    </button>
  </div>
);
