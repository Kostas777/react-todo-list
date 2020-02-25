import React, {Component} from 'react';

import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList';

import 'bootstrap/dist/css/bootstrap.min.css';
import {v4 as uuid} from "uuid";
import { render } from '@testing-library/react';

class App extends Component {

// initial storage state
 state = {
    items:[],
    id: uuid(),
    item:"",
    editItem:false
  }
  // a method to write to input 
  handleChange = (e) => {
    this.setState({
      item:e.target.value
    });
  };
  // a method to hundle when the button is clicked
  // 1) prevent thedefault 
  // 2) create a new item 
  // 3) create an update item list 
  // 4) change the state using the new update list
  handleSubmit = (e) => {
    // preven the form from realoding...
    e.preventDefault();
    // an var object to create the new item
    const newItem = {
      id:this.state.id,
      title:this.state.item
    }
  
    // an var array to keep data updated passing the new item
    const updatedItems = [...this.state.items, newItem];
    // change the state passing the updated values
    this.setState({
      items:updatedItems,
      item:'',
      id:uuid(),
      editItem: false
    })
  };
  clearList = () => {
    this.setState({
      items:[]
    });
  };

  handleDelete = (id) => {
    const filteredItems = this.state.items.filter(item => 
      item.id !==id)
      this.setState({
        items:filteredItems
      });
  };

  handleEdit = (id) => {
    const filteredItems = this.state.items.filter(item => item.id !==id);

    const selectedItem = this.state.items.find(item => item.id ===id)

    console.log(selectedItem)

    this.setState({
      items:filteredItems,
      item: selectedItem.title,
      editItem:true,
      id:id
    });
  }
 
  render() { 
    return (

      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">
              todo input
            </h3>
            <TodoInput item={this.state.item} handleChange={this.handleChange}
            handleSubmit={this.handleSubmit} editItem = {this.state.editItem}
            />
            <TodoList items={this.state.items} clearList={this.clearList}
            handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
