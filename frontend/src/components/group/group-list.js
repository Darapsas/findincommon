import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { deleteGroup } from "../../helpers/requests";

export default props => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col" />
        <th scope="col" />
        <th scope="col" />
        <th scope="col" />
        <th scope="col" />
      </tr>
    </thead>
    <tbody>
      {props.groups.length !== 0 &&
        props.groups.map((group, index) => (
          <tr key={group.id}>
            <th scope="col">{index + 1}</th>
            <th className="font-weight-normal" scope="col">
              {group.name}
            </th>
            <th className="font-weight-normal" scope="col">
              {group.description}
            </th>
            <th scope="col">
              <Link
                to={{
                  pathname: `/user/conversations/${
                    group.conversationId
                  }/in-action`,
                  state: {
                    action: "Save Changes",
                    formName: "Edit an Group",
                    group: group
                  }
                }}
              >
                <button type="button" className="btn btn-primary float-right">
                  Message
                </button>
              </Link>
            </th>
            <th scope="col">
              <Link
                to={{
                  pathname: `/`,
                  state: {
                    action: "Save Changes",
                    formName: "Edit an Group",
                    group: group
                  }
                }}
              >
                <button type="button" className="btn btn-primary float-right">
                  Create event
                </button>
              </Link>
            </th>
            {props.owned ? (
              <Fragment>
                <th scope="col">
                  <Link
                    to={{
                      pathname: `/user/groups/${group.id}/edit/`,
                      state: {
                        action: "Save Changes",
                        formName: "Edit an Group",
                        group: group
                      }
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary float-right"
                    >
                      Edit
                    </button>
                  </Link>
                </th>
                <th scope="col">
                  <button
                    type="button"
                    className="btn btn-danger float-right"
                    onClick={() => {
                      deleteGroup(group.id).then(response =>
                        props.handleDelete()
                      );
                    }}
                  >
                    Delete
                  </button>
                </th>
              </Fragment>
            ) : (
              <Fragment>
                <th scope="col" colSpan="2">
                  <Link
                    to={{
                      pathname: `/user/groups/${group.id}/info`,
                      state: {
                        group: group
                      }
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary float-right"
                    >
                      Show
                    </button>
                  </Link>
                </th>
              </Fragment>
            )}
          </tr>
        ))}

      {props.owned && (
        <tr>
          <td colSpan="5" />
          <td colSpan="2">
            <Link
              to={{
                pathname: "/user/groups/group/create",
                state: { action: "Create", formName: "Create new Group" }
              }}
            >
              <button className="btn btn-success float-right" type="button">
                Create new
              </button>
            </Link>
          </td>
        </tr>
      )}
    </tbody>
  </table>
);
