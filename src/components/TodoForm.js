import React from "react";
import shortid from "shortid";

class TodoForm extends React.Component {
  state = {
    text: "",
  };

  handlChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addTodo({
      id: shortid.generate(),
      text: this.state.text,
      complete: false,
    });

    this.setState({
      text: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="text"
          value={this.state.text}
          onChange={this.handlChange}
          placeholder="what do you wanna do?"
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default TodoForm;
