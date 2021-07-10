import React, { Component } from "react";
import { Container, Row, Col, Toast, ToastBody, ToastHeader } from "reactstrap";
import ModalAddEdit from "./Components/Modals/ModalAddEdit";
import TodosTable from "./Components/Tables/TodosTable";
import XTable from "./Components/Tables/XTable"
import Linkedin from "./Components/Links/Linkedin";

const listHeader = [
  {
    Header: "ID",
    className: "t-cell-1 text-left",
    accessor: "id",
    notShowSortingDisplay: true
  },
  {
    Header: "Task Name",
    accessor: "taskName",
    className: "t-cell-2 text-left"
  },
  {
    Header: "Priority",
    accessor: "priority",
    className: "t-cell-3 text-left"
  },
  {
    Header: "Status",
    accessor: "status",
    className: "t-cell-4 text-center"
  },
  {
    Header: "Actions",
    accessor: "actions",
    className: "t-cell-5 text-center"
  },
];

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
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>My tasks to-do</h1>
          </Col>
        </Row>
        <Row style={{ margin: "3%" }}>
          <Col>
            <ModalAddEdit
              buttonLabel="Add To-do"
              addItemToState={this.addItemToState}
            />
          </Col>
        </Row>
          <Row style={{ margin: "3%" }}>
          <Col>
            <div className="p-3 bg-danger">
              <Toast>
                <ToastHeader>High Priority</ToastHeader>
                <ToastBody >
                  {counterHighPriority}
                </ToastBody>
              </Toast>
            </div>
          </Col>
          <Col>
            <div className="p-3 bg-warning">
              <Toast>
                <ToastHeader>Medium Priority</ToastHeader>
                <ToastBody>
                  {counterMediumPriority}
                </ToastBody>
              </Toast>
            </div>
          </Col>
          <Col>
            <div className="p-3 bg-primary">
              <Toast>
                <ToastHeader>Low Priority</ToastHeader>
                <ToastBody>
                  {counterLowPriority}
                </ToastBody>
              </Toast>
            </div>
          </Col>
          </Row>
        <Row>
          <Col>
            <TodosTable
              items={this.state.items}
              updateState={this.updateState}
              deleteItemFromState={this.deleteItemFromState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
          <div>
          <XTable 
          columns={listHeader} 
          loading={false} 
          data={this.state.items}
          updateState={this.updateState}
          deleteItemFromState={this.deleteItemFromState}
           />
        </div>
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
