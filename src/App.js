
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import Footer from "./components/Footer";
import About from "./components/About";

function App () {
    const [showFormState, setShowFormState] = useState(false);
    const [filledTaskFormState, setFilledTaskFormState] = useState({
        id: 0,
        title: '',
        date: '',
        is_completed: false,
    });
    const [tasksState, setTasksState] = useState([]);
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks");
        return await res.json();
    }

    useEffect(() => {
        fetchTasks()
            .then(tasks => {
                setTasksState(tasks);
            })
            .catch(err => console.log(err));
    }, [
        // This is the dependency array. If this array changes, the useEffect will run again
    ]);

    const deleteTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        });
        // const tasks = await res.json();

        setTasksState(() => {
            return tasksState.filter(task => task.id !== id);
        });
    }

    const changeStatus = async (id) => {
        const currentTask = tasksState.find(task => task.id === id);

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                is_completed: !currentTask.is_completed,
            }),
        });
        const updatedTask = await res.json();

        setTasksState(() => {
            return tasksState.map(task => {
                return task.id === id ? updatedTask : task;
            });
        });
    }

    const toggleForm = () => {
        setShowFormState(!showFormState);
    }

    const fillForm = (id) => {
        const task = tasksState.find(task => task.id === id);
        if (task) {
            setShowFormState(true);
            setFilledTaskFormState(task);
        }
    }
    const submitForm = async (task) => {
        let newTasksState;
        if (task.id === 0) { // create a new task
            const createdTask = await createTaskHelper(task);
            newTasksState = [...tasksState, createdTask];
        } else { // update an existing task
            const updatedTask = await updateTaskHelper(task);
            newTasksState = tasksState.map(currentTask => {
                return currentTask.id === updatedTask.id ? updatedTask : currentTask;
            });
        }

        setTasksState(newTasksState);
    }
    const createTaskHelper = async (task) => {
        const res = await fetch("http://localhost:5000/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        return await res.json();
    }
    const updateTaskHelper = async (task) => {
        const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        return await res.json();
    }

    return (
        <Router>
            <div className='container'>
                <Header title='Tasks' tasksCount={tasksState.length} toggleForm={toggleForm} showFormState={showFormState} />

                <Routes>
                    <Route path='/' element={
                        <>
                            {showFormState && <TaskForm submitForm={submitForm} filledTaskForm={filledTaskFormState} />}
                            {
                                tasksState.length ?
                                    <Tasks tasks={tasksState} deleteTask={deleteTask} editTask={fillForm} changeStatus={changeStatus} /> :
                                    <p>No tasks to show</p>
                            }
                        </>
                    } />
                    <Route path='/about' element={<About />} />
                    <Route path='/tasks/:id' element={<TaskDetails />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
