import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import './task.css';

const Task = ({
  task,
  deleteTask,
  onChangePaused,
  onToggleEditing,
  onToggleCompletedTask,
  editingTask,
  updateSecondTimer,
}) => {
  const [localStateText, setLocalStateText] = useState('');

  const onPlayClick = (id) => {
    onChangePaused(id, false);
  };
  const onPauseClick = (id) => {
    onChangePaused(id, true);
  };

  const onChange = (e) => {
    setLocalStateText(e.target.value);
    e.stopPropagation();
  };

  const onSubmit = (id, event) => {
    event.preventDefault();
    editingTask(localStateText, id);
  };

  const transformTime = (second) => {
    second = Math.round(second);
    const minutes = Math.floor(second / 60);
    const hours = Math.floor(minutes / 60);
    const remainingSeconds = second % 60;
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  const formInput = (
    <form
      onSubmit={(event) => {
        onSubmit(task.id, event);
      }}
    >
      <input
        autoFocus
        type="text"
        className="edit"
        value={localStateText || task.textTask}
        onChange={(e) => {
          onChange(e);
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
                onPlayClick(task.id);
                e.stopPropagation();
              }}
            ></button>
            <button
              className="icon icon-pause"
              onClick={(e) => {
                onPauseClick(task.id);
                e.stopPropagation();
              }}
            ></button>
            {transformTime(task.secondTimer)}
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
};

export default Task;

Task.defaultProps = {
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

Task.propTypes = {
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
