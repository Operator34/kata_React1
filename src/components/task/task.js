import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

class Task extends Component {
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

  state = { localStateText: '' };

  onChange = (e) => {
    this.setState({ localStateText: e.target.value });
    e.stopPropagation();
  };

  onSubmit = (id, event) => {
    event.preventDefault();
    this.props.editingTask(this.state.localStateText, id);
  };

  render() {
    const { task, deleteTask, onToggleEditing, onToggleCompletedTask } = this.props;

    const { localStateText } = this.state;
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
            <span className="description">{task.textTask}</span>
            <span className="created">
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
