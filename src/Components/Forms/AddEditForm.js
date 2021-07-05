import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import uniqid from "uniqid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class AddEditForm extends React.Component {
  state = {
    id: 0,
    taskName: "",
    priority: "",
    priorityValue: 0,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getPriority = (priorityValue) => {
    if (priorityValue === 1) {
      return "High";
    }
    if (priorityValue === 2) {
      return "Medium";
    }
    if (priorityValue === 3) {
      return "Low";
    }
  };

  validateForm = () => {
    const taskName = this.state.taskName;
    const priorityValue = this.state.priorityValue;
    if (taskName && priorityValue) return true;
    else return false;
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

        const taskTodo = {
          id: id,
          taskName: taskName,
          priority: priority,
          priorityValue: priorityValue,
        };
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

        const taskTodo = {
          id: id,
          taskName: taskName,
          priority: priority,
          priorityValue: priorityValue,
        };
        this.props.updateState(taskTodo);
        this.props.toggle();
      } catch (err) {
        console.log(err);
      }
    } else return;
  };

  componentDidMount() {
    if (this.props.item) {
      const { id, taskName, priority } = this.props.item;
      this.setState({ id, taskName, priority });
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
            type="text"
            name="taskName"
            id="taskName"
            onChange={this.onChange}
            value={this.state.taskName === null ? "" : this.state.taskName}
          />
        </FormGroup>
        <FormGroup>
          <Label></Label>
          <Input
            type="text"
            hidden
            name="priority"
            id="priority"
            onChange={this.onChange}
            value={this.state.priority === null ? "" : this.state.priority}
          />
          <FormControl>
            <Label for="priority">Priority</Label>
            <Select
              labelId="priorityValue-select-label"
              id="priorityValue"
              name="priorityValue"
              value={this.state.priorityValue}
              onChange={this.onChange}
            >
              <MenuItem value={0}></MenuItem>
              <MenuItem value={1}>High</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>Low</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;
