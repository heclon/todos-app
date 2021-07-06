import React, { Component } from "react";
import { Container, Row, Col, Toast, ToastBody, ToastHeader } from "reactstrap";
import ModalAddEdit from "./Components/Modals/ModalAddEdit";
import TodoTable from "./Components/Tables/TodoTable";
import Linkedin from "./Components/Links/Linkedin";

function countByPriority(items) {
  let counterHighPriority = 0;
  let counterMediumPriority = 0;
  let counterLowPriority = 0;
  for (const item of items) {
    if (item.priorityValue === 1) counterHighPriority++;
    if (item.priorityValue === 2) counterMediumPriority++;
    if (item.priorityValue === 3) counterLowPriority++;
  }

  return [counterHighPriority, counterMediumPriority, counterLowPriority];
}
class App extends Component {
  state = {
    items: [],
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,
  };

  getItems() {
    this.setState({ items: [] });
  }

  addItemToState = (item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
    this.updateCounters();
  };

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex((data) => data.id === item.id);
    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1),
    ];
    this.setState({ items: newArray });
    this.updateCounters();
  };

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: updatedItems });
    this.updateCounters();
  };

  componentDidMount() {
    this.getItems();
  }

  updateCounters() {
    const items = this.state.items;
    const [counterHighPriority, counterMediumPriority, counterLowPriority] =
      countByPriority(items);

    this.setState({
      highPriority: counterHighPriority,
      mediumPriority: counterMediumPriority,
      lowPriority: counterLowPriority,
    });
  }

  render() {
    const [counterHighPriority, counterMediumPriority, counterLowPriority] =
      countByPriority(this.state.items);

    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>My To-do's</h1>
          </Col>
        </Row>
        <Row style={{ marginBottom: "3%" }}>
          <Col>
            <ModalAddEdit
              buttonLabel="Add To-do task"
              addItemToState={this.addItemToState}
            />
          </Col>
          <Col>
            <div className="p-3 bg-danger rounded">
              <Toast>
                <ToastHeader>High Priority</ToastHeader>
                <ToastBody style={{ fontSize: "20px" }}>
                  {counterHighPriority}
                </ToastBody>
              </Toast>
            </div>
          </Col>
          <Col>
            <div className="p-3 bg-warning rounded">
              <Toast>
                <ToastHeader>Medium Priority</ToastHeader>
                <ToastBody style={{ fontSize: "20px" }}>
                  {counterMediumPriority}
                </ToastBody>
              </Toast>
            </div>
          </Col>
          <Col>
            <div className="p-3 bg-primary rounded">
              <Toast>
                <ToastHeader>Low Priority</ToastHeader>
                <ToastBody style={{ fontSize: "20px" }}>
                  {counterLowPriority}
                </ToastBody>
              </Toast>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <TodoTable
              items={this.state.items}
              updateState={this.updateState}
              deleteItemFromState={this.deleteItemFromState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Linkedin
              author="Hector Longarte"
              link="https://linkedin.com/in/hector-longarte"
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
