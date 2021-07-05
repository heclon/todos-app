import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

class ModalConfirmDelete extends Component {
  state = {
    modal: false,
    item: 0,
  };

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  deleteItem = (id) => {
    // console.log("will delete: ", id);
    this.props.deleteItemFromState(id);
    this.toggle();
  };

  componentDidMount() {
    if (this.props.id) {
      const { id } = this.props.id;
      this.setState({ id });
    }
  }

  render() {
    const { buttonLabel, className, item } = this.props;

    // console.log(item);
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={className}
        >
          <ModalHeader toggle={this.toggle}>
            Delete To-do confirmation
          </ModalHeader>
          <ModalBody>
            <Container className="App">
              <Row style={{ marginBottom: "3%" }}>
                <Col>Are you sure that you wish to delete this task To-do?</Col>
              </Row>
              <Row>
                <Col>ID: {item.id}</Col>
              </Row>
              <Row>
                <Col>To-do: {item.taskName}</Col>
              </Row>
              <Row>
                <Col>Priority: {item.priority}</Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.deleteItem(item.id)}>
              Yes, delete it
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalConfirmDelete;
