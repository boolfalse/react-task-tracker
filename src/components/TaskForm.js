
import {useEffect, useState} from 'react';

const TaskForm = ({ submitForm, filledTaskForm }) => {
    const [idState, setIdState] = useState(filledTaskForm.id);
    const [titleState, setTitleState] = useState(filledTaskForm.title);
    const [dateState, setDateState] = useState(filledTaskForm.date);
    const [isCompletedState, setIsCompletedState] = useState(filledTaskForm.is_completed);

    useEffect(() => {
        setIdState(filledTaskForm.id);
        setTitleState(filledTaskForm.title);
        setDateState(filledTaskForm.date);
        setIsCompletedState(filledTaskForm.is_completed);
    }, [filledTaskForm]);

    const onSubmit = (e) => {
        e.preventDefault();

        // some validation
        if (!titleState || !dateState) {
            alert("Please fill the required fields!");
            return;
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateState)) {
            alert("Please enter the date in 'YYYY-MM-DD' format!");
            return;
        }

        submitForm({
            id: idState,
            title: titleState,
            date: dateState,
            is_completed: isCompletedState,
        });

        setIdState(0);
        setTitleState('');
        setDateState('');
        setIsCompletedState(false);
    }

    return (
        // we don't have to call submitForm function directly, instead we will call onSubmit function
        // because we don't need to refresh the page to submit the form
        <form className='task-form' onSubmit={onSubmit}>
            <input type='hidden' value={idState} />
            <div className='form-control'>
                <label htmlFor='title'>* Title</label>
                <input type='text'
                       id='title'
                       value={titleState}
                       onChange={(e) => setTitleState(e.target.value)}
                       autoComplete='off'
                       placeholder='Type title...' />
            </div>
            <div className='form-control'>
                <label htmlFor='date'>* Date</label>
                <input type='text'
                       id='date'
                       value={dateState}
                       onChange={(e) => setDateState(e.target.value)}
                       autoComplete='off'
                       placeholder='YYYY-DD-MM' />
            </div>
            <div className='form-control form-control-check'>
                <label htmlFor='is_completed'>Completed</label>
                <input type='checkbox'
                       id='is_completed'
                       onChange={(e) => setIsCompletedState(e.currentTarget.checked)}
                       checked={isCompletedState}
                       // defaultChecked={isCompletedState}
                />
            </div>
            <button className='btn btn-block' type='submit'>Save</button>
        </form>
    );
}

export default TaskForm;
