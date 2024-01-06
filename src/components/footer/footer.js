import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.css';

const Footer = ({ countActiveTask, clearCompleted, filtred, filteredData }) => {
  const [state] = useState({
    buttonFilter: [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ],
  });

  const buttons = state.buttonFilter.map((el) => {
    const active = filteredData === el.name;
    const className = active ? 'selected' : '';
    return <TasksFilter key={el.name} className={className} nameButton={el.label} onClick={() => filtred(el.name)} />;
  });
  return (
    <footer className="footer">
      <span className="todo-count">{countActiveTask} items left</span>
      <ul className="filters">{buttons}</ul>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  countActiveTask: 1,
  clearCompleted: () => {},
  filtred: () => {},
  filteredData: 'all',
};
Footer.propTypes = {
  countActiveTask: PropTypes.number,
  clearCompleted: PropTypes.func,
  filtred: PropTypes.func,
  filteredData: PropTypes.oneOf(['all', 'active', 'completed']),
};
export default Footer;
