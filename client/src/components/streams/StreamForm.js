import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //because renderInput is called in a component in render, the this context is lost
  //so we cannot call this.renderError unless we tun renderInput into arrow func
  renderInput = ({ input, label, meta }) => {
    //if the field and the form both have classname error, the field will be highlighted
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          // onChange={formProps.input.onChange}
          // value={formProps.input.value}
          {...input} //take all key-value pairs and add them as props
        />
        {this.renderError(meta)}
      </div>
    );
  };

  //param: values inside the Form object 
  //call the action creator createStream
  //props.onSubmit() is passed down by parents aka StreamCreate & StreamEdit 
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error" //if 'error' is not here, CSS will hide error messages
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//errors.abc will check for the abc field in the form
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Must enter a title";
  }
  if (!formValues.description) {
    errors.description = "Must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validate,
})(StreamForm);

//since we already connect a form to the StreamCreate in formWrapped ^above, 
//we are connecting the action creator to formWrapped as a way to "double-connect"
