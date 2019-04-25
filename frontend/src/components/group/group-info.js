import React from "react";

export default props => (
  <div className="w-75 custom">
    <h2>Group info:</h2>
    <div className="form-group">
      <label>Name</label>
      <input
        className="form-control"
        name="name"
        type="text"
        value={props.location.state.group.name}
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
        value={props.location.state.group.description}
        disabled
      />
    </div>

    <div className="form-group">
      <label>Members:</label>
      {props.location.state.group.members.map((member, index) => (
        <div key={index}>
          <input
            name={`reminder-${index}`}
            type="text"
            value={member.name}
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
