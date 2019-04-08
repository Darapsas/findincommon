import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

let _isMounted;
export default props => {
  const [hobbies, setHobbies] = useState([]);
  useEffect(() => {
    _isMounted = true;

    fetch(`http://192.168.99.100:8080/api/hobbies`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        if (_isMounted) {
          setHobbies(data);
        }
      });
    return () => {
      _isMounted = false;
    };
  }, [hobbies]);

  const deleteHobby = id => {
    fetch(`http://192.168.99.100:8080/api/hobbies/${id}`, {
      method: "DELETE"
    })
      .then(response => console.log("Success", JSON.stringify(response)))
      .catch(error => console.error("Error:", error));
  };

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col" />
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {hobbies.map((hobby, index) => (
          <tr key={hobby.id}>
            <th scope="col">{index + 1}</th>
            <th className="font-weight-normal" scope="col">
              {hobby.name}
            </th>
            <th className="font-weight-normal" scope="col">
              {hobby.description}
            </th>
            <th scope="col">
              <Link
                to={{
                  pathname: `/hobby_edit/${hobby.id}`,
                  state: {
                    action: "Save Changes",
                    formName: "Edit a Hobby",
                    hobby: hobby
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
                onClick={() => deleteHobby(hobby.id)}
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
                pathname: "/hobby_create/",
                state: { action: "Create", formName: "Create new Hobby" }
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
  );
};
