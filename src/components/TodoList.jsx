import React, { Component } from "react";
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";
import axios from "axios";

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      tasks: []
    };
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }
  async componentDidMount() {
    try {
      const { data } = await axios.get("https://petya-to-do-api.herokuapp.com/api/v1/tasks");
      this.setState({
        isLoaded: true,
        tasks: data
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error
      });
    }
  }
  handleNewTask(task) {
    let { tasks } = this.state;
    tasks.push(task);
    this.setState({ tasks: tasks });
  }

  handleDeleteTask(task) {
    let { tasks } = this.state;
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    this.setState({ tasks: tasks });
  }

  render() {
    const { error, isLoaded, tasks } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <AddTaskForm tasks={tasks} handleNewTask={this.handleNewTask} />
          <ul className="todoList">
            {tasks.map((task, key) => (
              <Task task={task} key={task._id} handleDeleteTask={this.handleDeleteTask} />
            ))}
          </ul>
        </div>
      );
    }
  }
}
export default TodoList;
