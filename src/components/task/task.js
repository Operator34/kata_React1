import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

class Task extends Component {
  state = { localStateText: '', secondTimer: null, isPaused: null, saveDate: null };

  static defaultProps = {
    task: {
      id: 'xxx',
      textTask: 'Список дел не пришел с сервера',
      taskCreationTime: new Date(),
      completed: false,
      editing: false,
      secondTimer: 0,
      isPaused: false,
      saveDate: 0,
    },
    deleteTask: () => {},
    onToggleEditing: () => {},
    onToggleCompletedTask: () => {},
    editingTask: () => {},
    updateSecondTimer: () => {},
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
    editingTask: PropTypes.func,
  };

  componentDidMount() {
    const {
      task: { secondTimer, saveDate, isPaused },
    } = this.props;
    let calcTimer = secondTimer;
    if (saveDate > 0 && secondTimer !== 0 && !isPaused) {
      calcTimer = secondTimer - Math.round((Date.now() - saveDate) / 1000);
    }
    this.setState({ secondTimer: calcTimer, isPaused: isPaused });
    if (!isPaused) {
      this.onPlayClick();
    }
  }

  componentWillUnmount() {
    const { task } = this.props;
    const { secondTimer, isPaused } = this.state;
    const newTodo = {
      ...task,
      secondTimer: secondTimer,
      saveDate: secondTimer && Date.now(),
      isPaused: secondTimer === 0 ? true : isPaused,
    };
    this.transferSecondTimer(newTodo);
    clearInterval(this.interval);
  }

  onPlayClick() {
    console.log('onPlayClick');
    if (!this.state.timer) {
      this.interval = setInterval(() => {
        const { secondTimer } = this.state;
        if (secondTimer < 1) {
          clearInterval(this.interval);
        }
        if (secondTimer > 0) {
          this.setState((prevState) => ({
            secondTimer: prevState.secondTimer - 1,
            isPaused: false,
            timer: true,
          }));
        }
      }, 1000);
    }
  }

  onPauseClick() {
    clearInterval(this.interval);
    this.setState({ isPaused: true, timer: false });
  }

  transferSecondTimer = (todo) => {
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
                  this.onPlayClick(task.id);
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
              e.stopPropagation();
              deleteTask(task.id);
            }}
          ></button>
        </div>
        {task.editing ? formInput : null}
      </>
    );
  }
}

export default Task;
