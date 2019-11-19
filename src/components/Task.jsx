import React, { Component } from "react";
import axios from "axios";

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
    this.props.handleCompletedTask();
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
        <label htmlFor={id}>
          <input type="checkbox" id={id} checked={checked} onChange={this.markTaskComplete} />
          <input type="text" value={description} onChange={this.updateTaskDescription} />
        </label>
        <button type="button" onClick={this.deleteTask}>
          Delete
        </button>
      </ul>
    );
  }
}

export default Task;
