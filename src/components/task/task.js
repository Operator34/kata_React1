import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

class Task extends Component {
  state = { todo: {}, localStateText: '' };

  static defaultProps = {
    task: {
      id: 'xxx',
      textTask: 'Список дел не пришел с сервера',
      taskCreationTime: new Date(),
      completed: false,
      editing: false,
      secondTimer: 120,
      isPaused: false,
      saveDate: 0,
    },
    deleteTask: () => {},
    onToggleEditing: () => {},
    onToggleCompletedTask: () => {},
  };

  static propTypes = {
    task: PropTypes.shape({
      id: PropTypes.string,
      textTask: PropTypes.string,
      taskCreationTime: PropTypes.instanceOf(Date),
      completed: PropTypes.bool,
      editing: PropTypes.bool,
      secondTimer: PropTypes.number,
      isPaused: PropTypes.bool,
      saveDate: PropTypes.number,
    }),
    deleteTask: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onToggleCompletedTask: PropTypes.func,
    updateSecondTimer: PropTypes.func,
  };

  componentDidMount() {
    console.log('componentDidMount');
    const { task } = this.props;
    const newTask = { ...task };
    if (newTask.saveDate !== 0 && !newTask.isPaused) {
      newTask.secondTimer = newTask.secondTimer + Math.round((Date.now() - newTask.saveDate) / 1000);
    }
    this.setState({ todo: newTask });
    if (!newTask.isPaused) {
      this.setState({ todo: newTask });
      this.onPlayClick();
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    const { todo } = this.state;
    const newTodo = { ...todo, saveDate: Date.now() };
    if (Object.keys(todo).length !== 0) {
      this.transferSecondTimer(newTodo);
    }
    clearInterval(this.interval);
  }
  onPlayClick() {
    console.log('onPlayClick');
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        todo: { ...prevState.todo, secondTimer: prevState.todo.secondTimer - 1, isPaused: false },
      }));
    }, 1000);
  }
  onPauseClick() {
    console.log('onPauseClick task');
    clearInterval(this.interval);
    this.setState((prevState) => ({
      todo: { ...prevState.todo, isPaused: true },
    }));
  }
  transferSecondTimer = (todo) => {
    console.log('transferSecond todo');
    const { updateSecondTimer } = this.props;
    updateSecondTimer(todo);
  };
  onChange = (e) => {
    this.setState({ localStateText: e.target.value });
    e.stopPropagation();
  };

  onSubmit = (id, event) => {
    event.preventDefault();
    this.props.editingTask(this.state.localStateText, id);
  };
  transformTime(second) {
    const minutes = Math.floor(second / 60);
    const hours = Math.floor(minutes / 60);
    const remainingSeconds = second % 60;
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  }
  render() {
    const { task, deleteTask, onToggleEditing, onToggleCompletedTask } = this.props;

    const { localStateText, todo } = this.state;

    const formInput = (
      <form
        onSubmit={(event) => {
          this.onSubmit(task.id, event);
        }}
      >
        <input
          autoFocus
          type="text"
          className="edit"
          value={localStateText || task.textTask}
          onChange={(e) => {
            this.onChange(e);
          }}
        />
      </form>
    );
    return (
      <>
        <div className="view" onClick={() => onToggleCompletedTask(task.id)}>
          <input className="toggle" type="checkbox" checked={task.completed} onChange={() => {}} />
          <label>
            <span className="title">{task.textTask}</span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={(e) => {
                  this.onPlayClick(task.id);
                  e.stopPropagation();
                }}
              ></button>
              <button
                className="icon icon-pause"
                onClick={(e) => {
                  this.onPauseClick(todo);
                  e.stopPropagation();
                }}
              ></button>
              {this.transformTime(todo.secondTimer)}
            </span>
            <span className="description">
              created{' '}
              {formatDistanceToNow(task.taskCreationTime, {
                includeSeconds: true,
              })}{' '}
              ago
            </span>
          </label>
          <button
            className="icon icon-edit"
            onClick={(e) => {
              onToggleEditing(task.id);
              e.stopPropagation();
            }}
          ></button>
          <button
            className="icon icon-destroy"
            onClick={(e) => {
              deleteTask(task.id);
              e.stopPropagation();
            }}
          ></button>
        </div>
        {task.editing ? formInput : null}
      </>
    );
  }
}

export default Task;
