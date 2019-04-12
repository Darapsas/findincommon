import React, { Fragment, useEffect, useState } from "react";
import "./home.css";
import Fake from "../fake";
import Member from "./member";
import Loader from "../templates/loader";

let _isMounted;
export default props => {
  if (props.loading) {
    return (
      <main role="main" style={{ textAlign: "center" }}>
        <Loader />
      </main>
    );
  }

  return (
    <Fragment>
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
          {props.authenticated ? (
            <div className="row">
              {props.members.length !== 0 &&
                props.members.map(
                  member =>
                    props.currentUser.id !== member.id && (
                      <Member key={member.id} member={member} />
                    )
                )}
            </div>
          ) : (
            <div className="row blur">
              <Fake />
            </div>
          )}
          <div>{console.log(JSON.stringify(props.members))}</div>
        </div>
      </div>
    </Fragment>
  );
};
