import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

const TasksFilter = ({ nameButton, className, onClick }) => {
  return (
    <li>
      <button className={className} onClick={onClick}>
        {nameButton}{' '}
      </button>
    </li>
  );
};

export default TasksFilter;

TasksFilter.propTypes = {
  nameButton: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
