
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";

const TaskDetails = () => {
    const [loadingState, setLoadingState] = useState(true);
    const [taskState, setTaskState] = useState({
        title: "N/A",
        date: "N/A",
        is_completed: false,
    });
    const [errorState, setErrorState] = useState(null);

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`http://localhost:5000/tasks/${params.id}`);
            const task = await res.json();

            if (res.status !== 200) {
                navigate('/');
            }

            setTaskState(task);
            setLoadingState(false);
        }

        fetchTask().then(r => console.log(r)).catch(err => setErrorState(err));
    }); // , [params.id]

    return loadingState ? <h3>Loading</h3> : (
        <div>
            <h4><b>URI:</b> {location.pathname}</h4>
            <br />
            <h2>Task Details (ID: {taskState.id})</h2>
            <p><b>Title:</b> {taskState.title}</p>
            <p><b>Date</b> {taskState.date}</p>
            <p><b>Status:</b> {taskState.is_completed ? 'Completed' : 'Not completed'}</p>
            <Link to='/'>Home</Link>
            <br />
            <Button onClick={() => { navigate(-1) }} text={'Go Back'} />
        </div>
    );
}

export default TaskDetails;
