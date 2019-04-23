import React from "react";
import { removeUserHobby, addUserHobby } from "../../helpers/requests";

export default props => {
  let counter = 1;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {props.hobbies.length !== 0 &&
          props.currentUser &&
          props.hobbies.map((hobby, index) => {
            let test = true;

            props.currentUser.hobbies &&
              props.currentUser.hobbies.map(({ id }) => {
                if (id === hobby.id && !props.owned) {
                  test = false;
                }
              });
            return props.owned ? (
              <tr key={hobby.id}>
                <th scope="col">{index + 1}</th>
                <th className="font-weight-normal" scope="col">
                  {hobby.name}
                </th>
                <th className="font-weight-normal" scope="col">
                  {hobby.description}
                </th>
                <th scope="col">
                  <button
                    type="button"
                    className="btn btn-danger float-right"
                    onClick={() => {
                      removeUserHobby(props.currentUser.id, hobby.id).then(
                        response => props.handleChange()
                      );
                    }}
                  >
                    Remove
                  </button>
                </th>
              </tr>
            ) : (
              test && (
                <tr key={hobby.id}>
                  <th scope="col">{counter++}</th>
                  <th className="font-weight-normal" scope="col">
                    {hobby.name}
                  </th>
                  <th className="font-weight-normal" scope="col">
                    {hobby.description}
                  </th>
                  <th scope="col">
                    <button
                      type="button"
                      className="btn btn-success float-right"
                      onClick={() => {
                        addUserHobby(props.currentUser.id, hobby.id).then(
                          response => props.handleChange()
                        );
                      }}
                    >
                      Add
                    </button>
                  </th>
                </tr>
              )
            );
          })}
      </tbody>
    </table>
  );
};
//let test;
//props.currentUser.hobbies.forEach(({ id }) => {});
