import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    //create a <div modal> in index.html as a sibling of root div
    //and attribute this html component to that div using portal so that
    //modal is not nested through the React component tree
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div  onClick={(e)=> e.stopPropagation()} className="ui standard modal visible active">
                <i onClick={props.onDismiss} className="close icon"></i>
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal;