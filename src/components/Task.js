
import { FaTimes } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Task = ({ task, deleteTask, editTask, changeStatus }) => {
    return (
        <div className={`task ${task.is_completed ? 'reminder' : ''}`} onDoubleClick={() => { changeStatus(task.id) }}>
            <h3>
                {task.title}
            </h3>
            <span className='task-action'>
                <FaTimes onClick={() => { deleteTask(task.id) }} style={{ color: 'red', cursor: 'pointer' }} />
            </span>
            <span className='task-action'>
                <FaEdit onClick={() => { editTask(task.id) }} style={{ color: 'green', cursor: 'pointer' }} />
            </span>
            <p>{task.date}</p>
            <p>
                <Link to={`/tasks/${task.id}`}>View Details</Link>
            </p>
        </div>
    );
}

export default Task;
