import React from "react";
import Task from "../task";
import PropTypes from "prop-types";
import "./task-list.css";
class TaskList extends React.Component {
    static defaultProps = {
        tasks: [
            {
                id: "xxx",
                textTask: "Список дел не пришел с сервера",
                taskCreationTime: new Date(),
                completed: false,
                editing: false,
            },
        ],
        deleteTask: () => {},
        onToggleCompletedTask: () => {},
        onToggleEditing: () => {},
        editingTask: () => {},
    };
    static propTypes = {
        tasks: PropTypes.arrayOf(PropTypes.object),
        deleteTask: PropTypes.func,
        onToggleCompletedTask: PropTypes.func,
        onToggleEditing: PropTypes.func,
        editingTask: PropTypes.func,
    };
    render() {
        const {
            tasks,
            deleteTask,
            onToggleCompletedTask,
            onToggleEditing,
            editingTask,
        } = this.props;

        const elements = tasks.map((task) => {
            let className = "";
            const { id, completed, editing } = task;
            if (completed) {
                className = "completed";
            }
            if (editing) {
                className = "editing";
            }

            return (
                <li key={id} className={className}>
                    <Task
                        task={task}
                        deleteTask={deleteTask}
                        onToggleEditing={onToggleEditing}
                        editingTask={editingTask}
                        onToggleCompletedTask={onToggleCompletedTask}
                    />
                </li>
            );
        });
        return <ul className="todo-list">{elements}</ul>;
    }
}

export default TaskList;
