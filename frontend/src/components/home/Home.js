import React, { Fragment, useEffect, useState } from "react";
import "./home.css";
import Fake from "../fake";
import { getMembers } from "../../helpers/requests";

let _isMounted;
export default props => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    _isMounted = true;
    if (props.authenticated) {
      getMembers().then(data => {
        if (_isMounted) {
          console.log(data);
          setMembers(data);
        }
      });
    }
    return () => {
      _isMounted = false;
    };
  }, []);

  return (
    <main role="main">
      <section className="jumbotron text-center">
        <div className="container">
          {props.authenticated ? (
            <Fragment>
              <h1 className="jumbotron-heading">Welcome and enjoy!</h1>
            </Fragment>
          ) : (
            <Fragment>
              <h1 className="jumbotron-heading">Find In Common</h1>
              <p className="lead text-muted">
                If you have some ideas for an event or you simply just want to
                do something, but youd don't have anyone to do it with. Well,
                try this web application - it will help you to find people who
                think like you or at least have same hobbies as you.
              </p>
              <p>
                <a href="/signin" className="btn btn-primary my-2 btn-block">
                  Join us now, it's free
                </a>
              </p>
            </Fragment>
          )}
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {props.authenticated ? (
              <Fragment>
                {members.length !== 0 &&
                  members.map(
                    (member, index) =>
                      props.currentUser.id !== member.id && (
                        <div key={member.id} className="col-md-4">
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
                              <title>{member.id}</title>
                              <image
                                width="100%"
                                height="100%"
                                href={"dsafasd" + member.imageUrl}
                              />
                            </svg>
                            <div className="card-body">
                              <h6>{member.name}</h6>
                              <p className="card-text">
                                This is a wider card with supporting text below
                                as a natural lead-in to additional content. This
                                content is a little bit longer.
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                  >
                                    View
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                  >
                                    Edit
                                  </button>
                                </div>
                                <small className="text-muted">9 mins</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
              </Fragment>
            ) : (
              <Fake />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
