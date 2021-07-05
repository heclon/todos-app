import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  state = {
    sortOrder: 'INIT',
    items: this.props.items
  }

  deleteItem = id => {
    let confirmDelete = window.confirm('Sure you wish to delete this To-do?')
    if(confirmDelete){
        this.props.deleteItemFromState(id)
    }
  }

  sortByName = () => {

    console.log(this.state.sortOrder)
    let sortedItems = []
    if (this.state.sortOrder !== 'desc'){
      this.setState({
        sortOrder: 'desc',
      })

      sortedItems = this.props.items.sort(function (x, y) {
        let a = x.taskName.toUpperCase(),
            b = y.taskName.toUpperCase();
        return a === b ? 0 : a > b ? 1 : -1;
    });

    }
    else if (this.state.sortOrder === 'desc'){
      this.setState({
        sortOrder: 'asc',
      })

      sortedItems = this.props.items.sort(function (x, y) {
        let a = x.taskName.toUpperCase(),
            b = y.taskName.toUpperCase();
        return a === b ? 0 : a > b ? -1 : 1;
    });
    }
    this.setState({
      items: sortedItems,
    })
  console.log(sortedItems)
  }

  sortByPriority = () => {

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.taskName}</td>
          <td>{item.priority}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit To-do" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Delete To-do</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table dark responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th style={{cursor:'pointer'}} onClick={() => this.sortByName()}>Task to-do name</th>
            <th style={{cursor:'pointer'}} onClick={() => this.sortByPriority()}>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable