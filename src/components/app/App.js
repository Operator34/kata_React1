import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

const App = () => {
  const [state, setState] = useState({
    todoData: [],
    filteredData: 'all',
  });

  const addTask = (text, secondTimer) => {
    if (text) {
      setState(({ todoData }) => {
        const newTask = createTodo(text, secondTimer);
        return { ...state, todoData: [...todoData, newTask] };
      });
    }
  };

  const createTodo = (text, secondTimer) => {
    secondTimer = secondTimer ? secondTimer : 0;
    return {
      id: uuidv4(),
      textTask: text,
      taskCreationTime: new Date(),
      completed: false,
      editing: false,
      secondTimer: secondTimer,
      isPaused: true,
      saveDate: 0,
    };
  };

  const changePaused = (id, status) => {
    setState((prev) => {
      const newObj = { ...prev, todoData: [...prev.todoData] };
      newObj.todoData.filter((el) => id === el.id)[0].isPaused = status;
      return newObj;
    });
  };

  useEffect(() => {
    localStorage.setItem('starttimer', Date.now());
    const endTime = Number(localStorage.getItem('endtimer'));
    const StartTime = Number(localStorage.getItem('starttimer'));
    const delay = (StartTime - endTime) / 1000;
    const timeout = setTimeout(() => {
      setState((prev) => {
        const todoData = prev.todoData.map((element) => {
          if (element.secondTimer <= 0) {
            element.isPaused = true;
            element.secondTimer = 0;
          }
          if (!element.isPaused) {
            element.secondTimer -= delay;
          }
          return { ...element };
        });
        return { ...prev, todoData: [...todoData] };
      });
    }, 1000);
    localStorage.setItem('endtimer', Date.now());
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const updateSecondTimer = (updatedProperties) => {
    setState(({ todoData }) => {
      const updatedTodoData = todoData.map((todo) => {
        if (todo.id === updatedProperties.id) {
          return {
            ...todo,
            secondTimer: updatedProperties.secondTimer,
            saveDate: updatedProperties.saveDate,
            isPaused: updatedProperties.isPaused,
          };
        }
        return todo;
      });
      return { ...state, todoData: updatedTodoData };
    });
  };

  const taskSelection = (tasks, id, propName, valueTask) => {
    const index = tasks.findIndex((el) => el.id === id);
    let newValueTask = valueTask;
    const oldEl = tasks[index];
    if (propName === 'textTask') {
      newValueTask = valueTask || oldEl[propName];
    } else {
      newValueTask = !oldEl[propName];
    }
    const newEl = { ...oldEl, [propName]: newValueTask };
    const newArr = tasks.toSpliced(index, 1, newEl);
    return newArr;
  };

  const onToggleCompletedTask = (id) => {
    setState(({ todoData }) => {
      const newArr = taskSelection(todoData, id, 'completed');
      return { ...state, todoData: newArr };
    });
  };

  const deleteTask = (id) => {
    setState((prevState) => {
      const updatedTodoData = prevState.todoData.filter((el) => el.id !== id);
      return { ...state, todoData: updatedTodoData };
    });
  };

  const clearCompleted = () => {
    setState(({ todoData }) => {
      const newArr = todoData.filter((el) => !el.completed);
      return { ...state, todoData: newArr };
    });
  };

  const filtred = (status) => {
    setState({ ...state, filteredData: status });
  };

  const onToggleFilter = (filterName, items) => {
    switch (filterName) {
      case 'all':
        return items;

      case 'completed':
        return items.filter((el) => el.completed);

      case 'active':
        return items.filter((el) => !el.completed);
      default:
        return null;
    }
  };

  const onToggleEditing = (id) => {
    setState(({ todoData }) => {
      const newArr = taskSelection(todoData, id, 'editing');
      return { ...state, todoData: newArr };
    });
  };

  const editingTask = (newTextTask, id) => {
    setState(({ todoData }) => {
      const newArr = taskSelection(todoData, id, 'textTask', newTextTask);
      return { ...state, todoData: newArr };
    });
    onToggleEditing(id);
  };

  const countCompletedTask = state.todoData.filter((el) => el.completed).length;
  const actualTodo = onToggleFilter(state.filteredData, state.todoData);
  const countActiveTask = state.todoData.length - countCompletedTask;

  return (
    <div className="App">
      {/* <body> */}
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={actualTodo}
            deleteTask={deleteTask}
            onToggleCompletedTask={onToggleCompletedTask}
            onToggleEditing={onToggleEditing}
            editingTask={editingTask}
            updateSecondTimer={updateSecondTimer}
            onChangePaused={changePaused}
          />
          <Footer
            countActiveTask={countActiveTask}
            clearCompleted={clearCompleted}
            filtred={filtred}
            filteredData={state.filteredData}
          />
        </section>
      </section>
      {/* </body> */}
    </div>
  );
};

export default App;
