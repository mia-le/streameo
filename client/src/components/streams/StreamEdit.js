import React from "react";
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions'
import StreamForm from './StreamForm';
import _ from 'lodash';

//props is passed down by ReactRouter-DOM since StreamEdit is defined in <Route> in App.js
//In React-Router, each component needs to fetch its own data
class StreamEdit extends React.Component{
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues)
  }

  render(){
    if (!this.props.stream) {
      return<div>Loading...</div>
    }
    return(
    <div>
      <h3>Edit a Stream</h3>
      {/* initialValues is a special props of ReduxForm that takes a object */}
      {/* props.stream is an object with a field of `title` and `description` */}
      {/* _.pick returns an object with only the desired properties */}
      <StreamForm 
      initialValues={_.pick(this.props.stream, 'title','description')}
      onSubmit ={this.onSubmit}/>
    </div>);
  }
}
//onProps is the props provided to the StreamEdit component aka the component;s own props instead of props from React store
const mapStateToProps = (state, ownProps) => {
  return{ stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);
