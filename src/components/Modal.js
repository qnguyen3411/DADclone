import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { modalComponent } from '../constants/App';

import SubmissionForm from './Forms/SubmissionForm';
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';

import { hideModal } from '../actions/AppActions';

class ModalExample extends React.Component {

  resolveChildComponent(constant) {
    const { onToggle } = this.props;

    switch (constant) {
      case modalComponent.SUBMISSION_FORM:
        return (<SubmissionForm onClose={onToggle} />);
      case modalComponent.LOGIN_FORM:
        return (<LoginForm onClose={onToggle} />);
      case modalComponent.REGISTER_FORM:
        return (<RegisterForm onClose={onToggle} />)
      default:
        return (<div />)
    }
  }

  render() {
    const { isOpen, child, onToggle } = this.props;
    const childComponent = this.resolveChildComponent(child);
    return (
      <Modal isOpen={isOpen} toggle={onToggle} className={this.props.className}>
        <ModalHeader toggle={onToggle}>Modal title</ModalHeader>
        <ModalBody>
          {childComponent}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: state.app.showingModal,
  child: state.app.modalComponent
})

const mapDispatchToProps = (dispatch) => ({
  onToggle: () => dispatch(hideModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);