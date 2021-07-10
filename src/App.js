import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import ModalAddEdit from "./Components/Modals/ModalAddEdit";
import TodosTable from "./Components/Tables/TodosTable";
import Linkedin from "./Components/Links/Linkedin";
import listHeaders from "./Components/Tables/listHeaders"

function countByPriority(items) {
  let counterHighPriority = 0;
  let counterMediumPriority = 0;
  let counterLowPriority = 0;
  for (const item of items) {
    if (item.priorityValue === "1") counterHighPriority++;
    if (item.priorityValue === "2") counterMediumPriority++;
    if (item.priorityValue === "3") counterLowPriority++;
  }

  return [counterHighPriority, counterMediumPriority, counterLowPriority];
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      highPriority: 0,
      mediumPriority: 0,
      lowPriority: 0,
    };
  }

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
      <Container>
        <Row>
          <Col>
            <h1 style={{ margin: "1%" }}>My tasks to-do</h1>
          </Col>
        </Row>
        <Row style={{ margin: "1% 0" }}>
          <Col>
            <Row>
              <ModalAddEdit
                buttonLabel="Add To-do"
                addItemToState={this.addItemToState}
              />
            </Row>
          </Col>
        </Row>
        {/* <Row style={{ marginBottom: "1%" }}>
          <Col>
            <Alert color="info">Pending: {}</Alert>
          </Col>
          <Col>
            <Alert color="dark">In progress</Alert>
          </Col>
          <Col>
            <Alert color="success">Done:</Alert>
          </Col>
        </Row> */}

        <Row style={{ marginBottom: "1%" }}>

          <Col>
            <div className="p-3 bg-danger">
              <Toast>
                <ToastHeader>High Priority</ToastHeader>
                <ToastBody>{counterHighPriority}</ToastBody>
              </Toast>
            </div>
          </Col>
          <Col>
            <div className="p-3 bg-warning">
              <Toast>
                <ToastHeader>Medium Priority</ToastHeader>
                <ToastBody>{counterMediumPriority}</ToastBody>
              </Toast>
            </div>
          </Col>
          <Col>
            <div className="p-3 bg-primary">
              <Toast>
                <ToastHeader>Low Priority</ToastHeader>
                <ToastBody>{counterLowPriority}</ToastBody>
              </Toast>
            </div>
          </Col>
          
        </Row>

        <Row>
          <Col>
            <TodosTable
              columns={listHeaders}
              loading={false}
              data={this.state.items}
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
