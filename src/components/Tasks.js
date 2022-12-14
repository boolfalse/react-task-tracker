
import Task from './Task';

const Tasks = ({ tasks, deleteTask, editTask, changeStatus }) => {
    return (
        <>
            {tasks.map((task, index) => (
                // <Task key={task.id} task={task} />
                <Task key={index} task={task} deleteTask={deleteTask} editTask={editTask} changeStatus={changeStatus} />
            ))}
        </>
    );
}

export default Tasks;
