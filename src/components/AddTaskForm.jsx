import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async addTask(event) {
    event.preventDefault();
    const { description } = this.state;
    const { data } = await axios.post("https://petya-to-do-api.herokuapp.com/api/v1/tasks/", { description });
    this.props.handleNewTask(data);
    this.setState({
      description: ""
    });
  }
  handleChange(event) {
    this.setState({ description: event.target.value });
  }

  render() {
    const { description } = this.state;

    return (
      <form onSubmit={event => this.addTask(event)}>
        <FormInput focus="true" type="text" value={description} onChange={this.handleChange} placeholder="Today I want to..." />
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </form>
    );
  }
}
export default AddTaskForm;

const FormInput = styled.input`
  width: 235px;
  outline: none;
  font-size: 13px;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
`;
