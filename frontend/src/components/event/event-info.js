import React, { Fragment } from "react";

export default props => (
  <Fragment>
    <h2>Event info:</h2>
    <div className="form-group">
      <label>Name</label>
      <input
        className="form-control"
        name="name"
        type="text"
        placeholder="E.g. Flat Earth discussion"
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
      />
    </div>

    <div className="form-group">
      <label>When does the event start?</label>
      <input className="form-control" name="startDate" type="datetime-local" />
    </div>

    <div className="form-group">
      <label>When does the event end?</label>
      <input className="form-control" name="endDate" type="datetime-local" />
    </div>

    <div className="form-group">
      <label>Send reminders:</label>
      {props.location.state.event.reminders.map((reminder, index) => (
        <div key={index}>
          <label>
            <input name={`reminder-${index}`} type="checkbox" checked={true} />{" "}
            {reminder.name}
          </label>
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
  </Fragment>
);
