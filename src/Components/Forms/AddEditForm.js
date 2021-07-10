import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import uniqid from "uniqid";
class AddEditForm extends React.Component {
  state = {
    id: 0,
    taskName: "",
    priority: "",
    priorityValue: 0,
    status: "",
    statusValue: 0,
  };

  onCancelClick = () => {
    this.props.toggle();
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getPriority = (priorityValue) => {
    if (priorityValue === "1") {
      return "High";
    }
    if (priorityValue === "2") {
      return "Medium";
    }
    if (priorityValue === "3") {
      return "Low";
    }
  };

  getStatus = (statusValue) => {
    if (statusValue === "1") {
      return "Pending";
    }
    if (statusValue === "2") {
      return "In progress";
    }
    if (statusValue === "3") {
      return "Done";
    }
  };

  validateForm = () => {
    const taskName = this.state.taskName;
    const priorityValue = this.state.priorityValue;
    const statusValue = this.state.statusValue;

    if (taskName && priorityValue && statusValue) {
      return true;
    }
    return false;
  };

  submitFormAdd = (e) => {
    e.preventDefault();
    const validForm = this.validateForm();
    if (validForm) {
      try {
        const id = uniqid.process();
        const taskName = this.state.taskName;
        const priorityValue = this.state.priorityValue;
        const priority = this.getPriority(priorityValue);

        const statusValue = this.state.statusValue;
        const status = this.getStatus(statusValue);

        const taskTodo = {
          id: id,
          taskName: taskName,
          priority: priority,
          priorityValue: priorityValue,
          status: status,
          statusValue: statusValue,
        };

        console.log(taskTodo);
        this.props.addItemToState(taskTodo);
        this.props.toggle();
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  submitFormEdit = (e) => {
    e.preventDefault();
    const validForm = this.validateForm();
    if (validForm) {
      try {
        const id = this.state.id;
        const taskName = this.state.taskName;
        const priorityValue = this.state.priorityValue;
        const priority = this.getPriority(priorityValue);

        const statusValue = this.state.statusValue;
        const status = this.getStatus(statusValue);

        const taskTodo = {
          id: id,
          taskName: taskName,
          priority: priority,
          priorityValue: priorityValue,
          status: status,
          statusValue: statusValue,
        };

        console.log(taskTodo);
        this.props.updateState(taskTodo);
        this.props.toggle();
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  componentDidMount() {
    if (this.props.item) {
      const { id, taskName, priority, status } = this.props.item;
      this.setState({ id, taskName, priority, status });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="taskName">Task name</Label>
          <Input
            type="textarea"
            name="taskName"
            id="taskName"
            maxLength={100}
            onChange={this.onChange}
            value={this.state.taskName === null ? "" : this.state.taskName}
          />
          <Input
            type="text"
            hidden
            name="priority"
            id="priority"
            onChange={this.onChange}
            value={this.state.priority === null ? "" : this.state.priority}
          />

          <Label for="priorityValue">Priority</Label>
          <Input
            type="select"
            id="priorityValue"
            name="priorityValue"
            value={this.state.priorityValue}
            onChange={this.onChange}
          >
            <option value={"0"}></option>
            <option value={"1"}>High</option>
            <option value={"2"}>Medium</option>
            <option value={"3"}>Low</option>
          </Input>

          <Input
            type="text"
            hidden
            name="status"
            id="status"
            onChange={this.onChange}
            value={this.state.status === null ? "" : this.state.status}
          />

          <Label for="statusValue">Status</Label>
          <Input
            type="select"
            id="statusValue"
            name="statusValue"
            value={this.state.statusValue}
            onChange={this.onChange}
          >
            <option value={"0"}></option>
            <option value={"1"}>Pending</option>
            <option value={"2"}>In progress</option>
            <option value={"3"}>Done</option>
          </Input>
        </FormGroup>
        <div className="d-flex justify-content-center">
          <div className="p-2 col-example text-left">
            <Button color="success">Save</Button>
          </div>
          <div className="p-2 col-example text-left">
            <Button color="secondary" onClick={this.onCancelClick}>
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}

export default AddEditForm;
