import React from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

class NewTaskForm extends React.Component {
  static defaultProps = {
    addTask: () => {
      alert('Упс, что-то пошло не так');
    },
  };

  static propTypes = {
    addTask: PropTypes.func,
  };

  state = { text: '', min: '', sec: '' };

  validator = (value) => {};
  onChangeText = (e) => {
    this.setState({ text: e.target.value });
  };
  onChangeMin = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      this.setState({ min: value });
    }
  };
  onChangeSec = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      this.setState({ sec: value });
    }
  };
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text, min, sec } = this.state;
    const secondTimer = Number(min) * 60 + Number(sec);
    this.props.addTask(text, secondTimer);
    this.setState({ text: '', min: '', sec: '' });
  };

  render() {
    return (
      <form onKeyDown={this.onKeyPress} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.text}
          onChange={this.onChangeText}
          autoFocus
        />
        <input className="new-todo-form__timer" placeholder="Min" value={this.state.min} onChange={this.onChangeMin} />
        <input className="new-todo-form__timer" placeholder="Sec" value={this.state.sec} onChange={this.onChangeSec} />
      </form>
    );
  }
}

export default NewTaskForm;
