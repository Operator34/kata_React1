import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

class Task extends Component {
  state = { localStateText: '', secondTimer: 0 };
  static defaultProps = {
    task: {
      id: 'xxx',
      textTask: 'Список дел не пришел с сервера',
      taskCreationTime: new Date(),
      completed: false,
      editing: false,
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
    }),
    deleteTask: PropTypes.func,
    onToggleEditing: PropTypes.func,
    onToggleCompletedTask: PropTypes.func,
  };
  componentDidMount() {
    this.onPlayClick();
  }
  componentWillUnmount() {
    this.onPauseClick();
  }
  onPlayClick() {
    this.interval = setInterval(() => {
      console.log(new Date());
      this.setState((prevState) => ({ secondTimer: prevState.secondTimer + 1 }));
    }, 1000);
  }
  onPauseClick() {
    clearInterval(this.interval);
  }
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

    const { localStateText, secondTimer } = this.state;
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
                  this.onPlayClick();
                  e.stopPropagation();
                }}
              ></button>
              <button
                className="icon icon-pause"
                onClick={(e) => {
                  this.onPauseClick();
                  e.stopPropagation();
                }}
              ></button>
              {/* {`${task.timer.h}:${task.timer.m}:${task.timer.s}`} */}
              {this.transformTime(secondTimer)}
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
