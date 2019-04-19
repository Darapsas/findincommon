import React from "react";
import { Link } from "react-router-dom";

export default props => (
  <div key={props.member.id} className="col-md-4">
    <div className="card mb-4 shadow-sm">
      <svg
        className="bd-placeholder-img card-img-top"
        width="100%"
        height="225"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
        aria-label="Placeholder: Hulk"
      >
        <title>{props.member.id}</title>
        <image width="100%" height="100%" href={props.member.imageUrl} />
      </svg>
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
