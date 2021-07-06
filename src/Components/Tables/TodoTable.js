import React, { Component } from "react";
import { Table } from "reactstrap";
import ModalAddEdit from "../Modals/ModalAddEdit";
import ModalConfirmDelete from "../Modals/ModalConfirmDelete";
class TodoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: "INIT",
      items: this.props.items,
    };
  }

  sortByName = () => {
    // console.log(this.state.sortOrder);
    let sortedItems = [];
    if (this.state.sortOrder !== "desc") {
      this.setState({
        sortOrder: "desc",
      });

      sortedItems = this.props.items.sort(function (x, y) {
        let a = x.taskName.toUpperCase(),
          b = y.taskName.toUpperCase();
        return a === b ? 0 : a > b ? 1 : -1;
      });
    } else if (this.state.sortOrder === "desc") {
      this.setState({
        sortOrder: "asc",
      });

      sortedItems = this.props.items.sort(function (x, y) {
        let a = x.taskName.toUpperCase(),
          b = y.taskName.toUpperCase();
        return a === b ? 0 : a > b ? -1 : 1;
      });
    }
    this.setState({
      items: sortedItems,
    });
    // console.log(sortedItems);
  };

  sortByPriority = () => {
    // console.log(this.state.sortOrder);
    let sortedItems = [];
    if (this.state.sortOrder !== "desc") {
      this.setState({
        sortOrder: "desc",
      });

      sortedItems = this.props.items.sort(function (x, y) {
        let a = x.priorityValue,
          b = y.priorityValue;
        return a === b ? 0 : a > b ? 1 : -1;
      });
    } else if (this.state.sortOrder === "desc") {
      this.setState({
        sortOrder: "asc",
      });

      sortedItems = this.props.items.sort(function (x, y) {
        let a = x.priorityValue,
          b = y.priorityValue;
        return a === b ? 0 : a > b ? -1 : 1;
      });
    }
    this.setState({
      items: sortedItems,
    });
    // console.log(sortedItems);
  };

  render() {
    const items = this.props.items.map((item) => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.taskName}</td>
          <td>{item.priority}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalAddEdit
                buttonLabel="Edit To-do"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <ModalConfirmDelete
                buttonLabel="Delete To-do"
                item={item}
                deleteItemFromState={this.props.deleteItemFromState}
              ></ModalConfirmDelete>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Table dark responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th
              id="task-header"
              style={{ cursor: "pointer" }}
              onClick={() => this.sortByName()}
            >
              Task to-do name
            </th>
            <th
              id="priority-header"
              style={{ cursor: "pointer" }}
              onClick={() => this.sortByPriority()}
            >
              Priority
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default TodoTable;
