import React from 'react';
import PropTypes from 'prop-types';
import './tasks-filter.css';

class TasksFilter extends React.Component {
  static propTypes = {
    nameButton: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    const { nameButton, className, onClick } = this.props;
    return (
      <li>
        <button className={className} onClick={onClick}>
          {nameButton}{' '}
        </button>
      </li>
    );
  }
}

export default TasksFilter;
