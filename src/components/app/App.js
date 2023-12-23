import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

class App extends Component {
  state = {
    todoData: [],
    filteredData: 'all',
  };

  addTask = (text) => {
    this.setState(({ todoData }) => {
      const newTask = this.createTodo(text);
      return {
        todoData: [...todoData, newTask],
      };
    });
  };

  createTodo(text) {
    return {
      id: uuidv4(),
      textTask: text,
      taskCreationTime: new Date(),
      completed: false,
      editing: false,
      secondTimer: 0,
      isPaused: false,
      saveDate: 0,
    };
  }

  updateSecondTimer = (task) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === task.id);
      const newArr = todoData.toSpliced(index, 1, task);
      return { todoData: newArr };
    });
  };

  taskSelection = (tasks, id, propName, valueTask) => {
    const index = tasks.findIndex((el) => el.id === id);
    let newValueTask = valueTask;
    const oldEl = tasks[index];
    if (propName === 'textTask') {
      newValueTask = valueTask || oldEl[propName];
    } else {
      newValueTask = !oldEl[propName];
    }
    const newEl = { ...oldEl, [propName]: newValueTask };
    const newArr = tasks.toSpliced(index, 1, newEl);
    return newArr;
  };

  onToggleCompletedTask = (id) => {
    this.setState(({ todoData }) => {
      const newArr = this.taskSelection(todoData, id, 'completed');
      return { todoData: newArr };
    });
  };

  deleteTask = (id) => {
    console.log('delete');
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => id === el.id);
      const newArr = todoData.toSpliced(index, 1);
      return { todoData: newArr };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => !el.completed);
      return { todoData: newArr };
    });
  };

  filtred = (status) => {
    this.setState({ filteredData: status });
  };

  onToggleFilter = (filterName, items) => {
    switch (filterName) {
      case 'all':
        return items;

      case 'completed':
        return items.filter((el) => el.completed);

      case 'active':
        return items.filter((el) => !el.completed);
      default:
        return null;
    }
  };

  onToggleEditing = (id) => {
    this.setState(({ todoData }) => {
      const newArr = this.taskSelection(todoData, id, 'editing');
      return { todoData: newArr };
    });
  };

  editingTask = (newTextTask, id) => {
    this.setState(({ todoData }) => {
      const newArr = this.taskSelection(todoData, id, 'textTask', newTextTask);
      return { todoData: newArr };
    });
    this.onToggleEditing(id);
  };

  render() {
    const { todoData, filteredData } = this.state;

    const countCompletedTask = this.state.todoData.filter((el) => el.completed).length;
    const actualTodo = this.onToggleFilter(filteredData, todoData);
    const countActiveTask = todoData.length - countCompletedTask;

    return (
      <div className="App">
        {/* <body> */}
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm addTask={this.addTask} />
          </header>
          <section className="main">
            <TaskList
              tasks={actualTodo}
              deleteTask={this.deleteTask}
              onToggleCompletedTask={this.onToggleCompletedTask}
              onToggleEditing={this.onToggleEditing}
              editingTask={this.editingTask}
              updateSecondTimer={this.updateSecondTimer}
            />
            <Footer
              countActiveTask={countActiveTask}
              clearCompleted={this.clearCompleted}
              filtred={this.filtred}
              filteredData={filteredData}
            />
          </section>
        </section>
        {/* </body> */}
      </div>
    );
  }
}

export default App;
