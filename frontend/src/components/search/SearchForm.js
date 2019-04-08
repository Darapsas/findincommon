import React, { Component } from "react";
import { Formik } from "formik";

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      peopleFilter: ""
    };
  }

  render() {
    return (
      <form className="form-inline mt-2 mt-md-0">
        <input
          className="form-control mr-sm-2"
          type="text"
          name="peopleFilter"
          value={this.state.peopleFilter}
          placeholder="Search"
          aria-label="Search"
          onChange={this.handleChange}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    );
  }
}

/*const SearchForm = () => {
  <React.Fragment>
    <Formik
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 2000);
      }}

      render={props => (
        <form className="form-inline mt-2 mt-md-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            name="peopleFilter"
            value={this.state.peopleFilter}
            placeholder="Search"
            aria-label="Search"
            onChange={this.handleChange}
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      )}
    />
  </React.Fragment>;
};*/

export default SearchForm;
