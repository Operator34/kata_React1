import React from "react";
import TasksFilter from "../tasks-filter";
import PropTypes from "prop-types";
import "./footer.css";

class Footer extends React.Component {
    static defaultProps = {
        countActiveTask: 1,
        clearCompleted: () => {},
        filtred: () => {},
        filteredData: "all",
    };
    static propTypes = {
        countActiveTask: PropTypes.number,
        clearCompleted: PropTypes.func,
        filtred: PropTypes.func,
        filteredData: PropTypes.oneOf(["all", "active", "completed"]),
    };
    state = {
        buttonFilter: [
            { name: "all", label: "All" },
            { name: "active", label: "Active" },
            { name: "completed", label: "Completed" },
        ],
    };

    render() {
        const { countActiveTask, clearCompleted, filtred, filteredData } =
            this.props;
        const { buttonFilter } = this.state;
        const buttons = buttonFilter.map((el) => {
            const active = filteredData === el.name;
            const className = active ? "selected" : "";
            return (
                <TasksFilter
                    key={el.name}
                    className={className}
                    nameButton={el.label}
                    onClick={() => filtred(el.name)}
                />
            );
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
    }
}

export default Footer;
