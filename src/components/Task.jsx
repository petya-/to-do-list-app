import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.task.completed,
      description: this.props.task.description
    };
    this.markTaskComplete = this.markTaskComplete.bind(this);
    this.updateTaskDescription = this.updateTaskDescription.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  async updateTask(task) {
    await axios.put(`https://petya-to-do-api.herokuapp.com/api/v1/tasks/${task._id}`, task);
  }
  async markTaskComplete() {
    let { task } = this.props;
    task.completed = !task.completed;
    this.setState({
      checked: task.completed
    });
    await this.updateTask(task);
  }
  async updateTaskDescription(event) {
    let { task } = this.props;
    task.description = event.target.value;
    this.setState({
      description: task.description
    });
    await this.updateTask(task);
  }

  async deleteTask() {
    let { task } = this.props;
    await axios.delete(`https://petya-to-do-api.herokuapp.com/api/v1/tasks/${task._id}`);
    this.props.handleDeleteTask(task);
  }
  render() {
    const { id } = this.props;
    const { checked, description } = this.state;

    return (
      <ul>
        <StyledLabel htmlFor={id}>
          <input type="checkbox" id={id} checked={checked} onChange={this.markTaskComplete} />
          <StyledInput type="text" value={description} onChange={this.updateTaskDescription} />
        </StyledLabel>
        <StyledButton type="button" onClick={this.deleteTask}>
          Delete
        </StyledButton>
      </ul>
    );
  }
}

export default Task;

const StyledLabel = styled.label`
  float: left;
  cursor: pointer;
`;
const StyledInput = styled.input`
  outline: none;
  font-size: 13px;
  padding: 3px;
`;
const StyledButton = styled.button`
  float: right;
  background: palevioletred;
  color: #fff;
  border-radius: 3px;
  border: 2px solid palevioletred;
  margin-top: 3px;
  outline: none;
  cursor: pointer;
`;
