// import React, { Component } from "react";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// class ModalConfirmDelete extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             modal: false,
//         };
//     }

//     toggle = () => {
//       this.setState((prevState) => ({
//         modal: !prevState.modal,
//       }));
//     };
  
//   render() {
//     const {
//         buttonLabel,
//         className,
//         itemId,
//       } = this.props;

//     return (
//         <div>
//         <Button color="danger" onClick={this.toggle}>{buttonLabel}</Button>
//         <Modal isOpen={this.state.modal} toggle={this.toggle} className={className}>
//             <ModalHeader toggle={this.toggle}>Delete To-do confirmation</ModalHeader>
//             <ModalBody>
//             Are you sure that you wish to delete this task To-do?
//             </ModalBody>
//             <ModalFooter>
//             <Button color="danger" onClick={() => this.props.deleteItemFromState(itemId)}>Yes, delete it</Button>{' '}
//             <Button color="secondary" onClick={this.toggle}>Cancel</Button>
//             </ModalFooter>
//         </Modal>
//         </div>
//     );
//   }
// }

// export default ModalConfirmDelete;