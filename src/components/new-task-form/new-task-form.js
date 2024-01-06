import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

const NewTaskForm = ({ addTask }) => {
  const [state, setState] = useState({ text: '', min: '', sec: '' });

  const onChangeText = (e) => {
    setState({ ...state, text: e.target.value });
  };
  const onChangeMin = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setState({ ...state, min: value });
    }
  };
  const onChangeSec = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setState({ ...state, sec: value });
    }
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const secondTimer = Number(state.min) * 60 + Number(state.sec);
    addTask(state.text, secondTimer);
    setState({ text: '', min: '', sec: '' });
  };

  return (
    <form onKeyDown={onKeyPress} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={state.text}
        onChange={onChangeText}
        autoFocus
      />
      <input className="new-todo-form__timer" placeholder="Min" value={state.min} onChange={onChangeMin} />
      <input className="new-todo-form__timer" placeholder="Sec" value={state.sec} onChange={onChangeSec} />
    </form>
  );
};

export default NewTaskForm;

NewTaskForm.defaultProps = {
  addTask: () => {
    alert('Упс, что-то пошло не так');
  },
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};
