import React from "react";
import { Link } from "react-router-dom";

export default props => (
  <div key={props.member.id} className="col-md-4">
    <div className="card mb-4 shadow-sm">
      <img
        className="bd-placeholder-img card-img-top"
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "5px"
        }}
        src={props.member.imageUrl}
        alt={props.member.name}
      />
      <div className="card-body">
        <h6>{props.member.name}</h6>
        <p className="card-text">
          {props.member.description && props.member.description.length > 150
            ? props.member.description.substring(0, 150) + "..."
            : props.member.description}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group btn-block">
            <Link
              role="button"
              className="btn btn-sm btn-outline-secondary"
              to={{
                pathname: `/user/${props.member.id}/profile`,
                state: {
                  user: props.member
                }
              }}
            >
              View
            </Link>
            <Link
              role="button"
              className="btn btn-sm btn-outline-secondary"
              to="/"
            >
              Message
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
