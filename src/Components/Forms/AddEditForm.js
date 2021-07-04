import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import uniqid from 'uniqid';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    taskName: '',
    priority: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    try{
      const id = uniqid.process()
      const taskName = this.state.taskName
      const priority = this.state.priority
      
      const taskTodo = {
        id: id,
        taskName: taskName, 
        priority: priority
      }
      this.props.addItemToState(taskTodo)
      this.props.toggle()
    } 
    catch(err) {
      console.log(err)
    }
  }

  submitFormEdit = e => {
    e.preventDefault()
    try{
      const id = this.state.id
      const taskName = this.state.taskName
      const priority = this.state.priority
      
      const taskTodo = {
        id: id,
        taskName: taskName, 
        priority: priority
      }
      this.props.updateState(taskTodo)
      this.props.toggle()
    } 
    catch(err) {
      console.log(err)
    }
  }

  componentDidMount(){
    if(this.props.item){
      const { id, taskName, priority } = this.props.item
      this.setState({ id, taskName, priority })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="taskName">Task name</Label>
          <Input type="text" name="taskName" id="taskName" onChange={this.onChange} value={this.state.taskName === null ? '' : this.state.taskName} />
        </FormGroup>
        <FormGroup>
          <Label for="priority">Priority</Label>
          <Input type="text" name="priority" id="priority" onChange={this.onChange} value={this.state.priority === null ? '' : this.state.priority}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm