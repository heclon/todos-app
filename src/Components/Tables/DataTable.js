import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (field, direction) => {
  const mapper = x => x[field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (field === 'priority') {
    sorter = direction === 'asc' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = direction === 'asc' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};
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
    let sorter = ''
    if (this.state.sortOrder === 'asc'){
      this.setState({
        sortOrder: 'desc',
      })
       sorter = getSorter('name','desc')
    }
    else if (this.state.sortOrder === 'desc'){
      this.setState({
        sortOrder: 'asc',
      })
       sorter = getSorter('name','asc')
    }

    let sortedItems = Array.from(this.state.items);
    sortedItems = sortedItems.sort(sorter);
    console.log(sortedItems)
    return sortedItems;
  }

  sortByPriority = () => {
    const sorter = getSorter('priority')

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