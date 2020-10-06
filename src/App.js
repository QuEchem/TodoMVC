import React, { Component } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";

export default class App extends Component {
  state = {
    todos: [],
    todosToShow: "all",
    toggleAllComplete: true,
  };

  addTodo = (todo) => {
    this.setState(state =>({
      todos: [todo, ...state.todos],
    }));
  };

  toggleComplete = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      }),
    }));
  };

  updateTodoToShow = (optionSelect) => {
    this.setState({
      todosToShow: optionSelect,
    });
  };

  handleDeleteTodo = (id) => {
    this.setState(state =>({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  };

  removeAllCompleteTodo = () => {
    this.setState(state => ({
      todos: state.todos.filter((todo) => !todo.complete),
    }));
  };

  render() {
    let todos = [];

    if (this.state.todosToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todosToShow === "active") {
      todos = this.state.todos.filter((todo) => !todo.complete);
    } else if (this.state.todosToShow === "complete") {
      todos = this.state.todos.filter((todo) => todo.complete);
    }
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexFlow: "column wrap",
          alignContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <TodoForm addTodo={this.addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={() => this.handleDeleteTodo(todo.id)}
            toggleComplete={() => this.toggleComplete(todo.id)}
          />
        ))}
        <div>
          todos left: {this.state.todos.filter((todo) => !todo.complete).length}
        </div>
        <div>
          <button onClick={() => this.updateTodoToShow("all")}>All</button>
          <button onClick={() => this.updateTodoToShow("active")}>
            Active
          </button>
          <button onClick={() => this.updateTodoToShow("complete")}>
            Complete
          </button>
        </div>
        {this.state.todos.some((todo) => todo.complete) ? (
          <button onClick={this.removeAllCompleteTodo}>
            Delete all completed
          </button>
        ) : null}
        <div>
          <button
            onClick={() =>
              this.setState(state => ({
                todos: state.todos.map((todo) => ({
                  ...todo,
                  complete: state.toggleAllComplete,
                })),
                toggleAllComplete: !state.toggleAllComplete,
              }))
            }
          >
            Toggle {this.state.toggleAllComplete}
          </button>
        </div>
      </div>
    );
  }
}
