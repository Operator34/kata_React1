import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';
import './task-list.css';

const TaskList = ({
  tasks,
  deleteTask,
  onToggleCompletedTask,
  onToggleEditing,
  editingTask,
  updateSecondTimer,
  onChangePaused,
}) => {
  const elements = tasks.map((task) => {
    let className = '';
    const { id, completed, editing } = task;
    if (completed) {
      className = 'completed';
    }
    if (editing) {
      className = 'editing';
    }

    return (
      <li key={id} className={className}>
        <Task
          task={task}
          deleteTask={deleteTask}
          onToggleEditing={onToggleEditing}
          editingTask={editingTask}
          onToggleCompletedTask={onToggleCompletedTask}
          updateSecondTimer={updateSecondTimer}
          onChangePaused={onChangePaused}
        />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;

TaskList.defaultProps = {
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

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  deleteTask: PropTypes.func,
  onToggleEditing: PropTypes.func,
  onToggleCompletedTask: PropTypes.func,
  updateSecondTimer: PropTypes.func,
  editingTask: PropTypes.func,
};
