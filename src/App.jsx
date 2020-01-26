import React, { Component } from 'react';
import { TodoBanner } from './TodoBanner';
import { TodoRow } from './TodoRow';
import { TodoCreator } from './TodoCreator';
import { VisibilityControl } from './VisibilityControl';
// import logo from './logo.svg';
// import './App.css';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userName: "Mohammed",
      todoItems:  [
                  {action: "Buy flowers", done: false},
                  {action: "Get Shoes", done: false},
                  {action: "Collect tickets", done: true},
                  {action: "Call Joe", done: false}
                  ],
      showCompleted: true

    }
  }

  updateTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }

  createNewToDo = (task) => {
    if(!this.state.todoItems
      .find(item => item.action === task)) {
        this.setState({
          todoItems: [...this.state.todoItems,
          {action: task, done: false}],
        });
      }
  }

  toggleTodo = (todo) => this.setState({
    todoItems: this.state.todoItems.map(item => item.action === todo.action ? {...item, done: !item.done}: item)
  })

  todoTableRows = (doneValue) => this.state.todoItems.filter(item => item.done === doneValue).map(item => 
    <TodoRow key={ item.action } item={item} callback={this.toggleTodo} />);

  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Mohammed" ? "Yousef" : "Mohammed"
    })
  }

  render = () =>
      <div>
        
        <TodoBanner name={ this.state.userName } tasks= { this.state.todoItems } />

        <div className="container-fluid">

        <TodoCreator callback={ this.createNewToDo }/>

          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                
                <th>Done</th>  
              </tr>
            </thead>
            
            <tbody>{ this.todoTableRows(false) }</tbody>

          </table>

          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed tasks"
            isChecked={ this.state.showCompleted }
            callback={(checked) => this.setState({showCompleted: checked})} />
          </div>

          { 
            this.state.showCompleted && 
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
                <tbody>{ this.todoTableRows(true) }</tbody>
              </thead>
            </table>
          }
        </div>
      </div>
}