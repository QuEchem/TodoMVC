import React, { Component } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";

/**
 * 1. add todo
 * 2. display todos
 * 3. cross off todos
 * 4. show number of active todos
 * 5. filter all/active/complete
 * 6. delete todo
 * 7. delete all complete
 * 7.1 only show if atleast one is complete
 * 8. button to toggle all on/off
 */

export default class App extends Component {
  state = {
    todos: [],
    todosToShow: "all",
  };

  addTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  };

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      }),
    });
  };

  updateTodoToShow = (optionSelect) => {
    this.setState({
      todosToShow: optionSelect,
    });
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
      <div>
        <TodoForm addTodo={this.addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
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
        {console.log(this.state.todos)}
      </div>
    );
  }
}

//   state = {
//     todos: [],
//     todo: "",
//     isChecked: false,
//     name: "",
//   };

//   handleChange = (event) => {
//     this.setState({ todo: event.target.value });
//     console.log(this.state.todo);
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();

//     this.setState({
//       todo: "",
//       todos: [...this.state.todos, this.state.todo],
//     });

//     console.log(this.state);
//   };

//   handleToggle = (event) => {
//     this.setState({
//       isChecked: event.target.checked,
//     });
//     console.log(this.state.isChecked);
//   };

//   handleFilter = (event) => {
//     const check = this.state.isChecked;
//     const allTodos = this.state.todos;
//     if (([event.target.name] = "active")) {
//       allTodos.map((todo, i) => {
//         return (
//           <div>
//             {check &&
//               `
//           <Todo
//           todo=${todo}
//           key=${i}
//           handleToggle=${this.handleToggle}
//           isChecked=${this.state.isChecked}
//         />`}
//           </div>
//         );
//       });
//     } else if (([event.target.name] = "complete")) {
//       allTodos.map((todo, i) => {
//         return (
//           <div>
//             {!check &&
//               `
//           <Todo
//           todo=${todo}
//           key=${i}
//           handleToggle=${this.handleToggle}
//           isChecked=${this.state.isChecked}
//         />`}
//           </div>
//         );
//       });
//     } else {
//       console.log(this.state);
//     }
//   };

//   render() {
//     return (
//       <div className="App">
//         <h1 className="Header">todo</h1>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             value={this.state.todo}
//             onChange={this.handleChange}
//             type="text"
//             placeholder="What needs to be done?"
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <ul className="todos">
//           {this.state.todos.map((todo, i) => {
//             return (
//               <Todo
//                 todo={todo}
//                 key={i}
//                 handleToggle={this.handleToggle}
//                 isChecked={this.state.isChecked}
//               />
//             );
//           })}
//         </ul>
//         <section>
//           <button name="all">All</button>
//           <button name="active" onChange={this.handleFilter}>
//             Active
//           </button>
//           <button name="complete" onChange={this.handleFilter}>
//             Complete
//           </button>
//         </section>
//       </div>
//     );
//   }
// }
