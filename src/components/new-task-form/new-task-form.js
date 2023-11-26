import React from "react";
import PropTypes from "prop-types";
import "./new-task-form.css";

class NewTaskForm extends React.Component {
    static defaultProps = {
        addTask: () => {
            alert("Упс, что-то пошло не так");
        },
    };
    static propTypes = {
        addTask: PropTypes.func,
    };
    state = { label: "" };

    onLabelChange = (e) => {
        this.setState({ label: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTask(this.state.label);
        this.setState({ label: "" });
    };
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    value={this.state.label}
                    onChange={this.onLabelChange}
                />
            </form>
        );
    }
}

export default NewTaskForm;
