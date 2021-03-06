import React from "react";
import Modal from '../Modal';
import {connect} from 'react-redux';
import {fetchStream, deleteStream} from '../../actions'
import history from '../../history';
import {Link} from 'react-router-dom'

class StreamDelete extends React.Component {
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions(){
    return (
      // invisible div tag <></>
      <React.Fragment> 
        <button onClick={()=>this.props.deleteStream(this.props.match.params.id)} className="ui negative button">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent(){
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }

    return `Are you sure you want to delete the stream "${this.props.stream.title}"`
  }
  render(){
    return(
      <Modal 
        title="Delete Stream"
        content={this.renderContent()}
        actions = {this.renderActions()}
        onDismiss ={() =>history.push('/')}
      />);
  }
}
//onProps is the props provided to the StreamEdit component aka the component;s own props instead of props from React store
const mapStateToProps = (state, ownProps) => {
  return{ stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
