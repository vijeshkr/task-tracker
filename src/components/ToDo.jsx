import React, { useEffect, useState } from 'react'
import EditTask from './EditTask';
import { useDrag } from 'react-dnd';

const ToDo = ({ task, index, taskList, setTaskList }) => {

    const [time, setTime] = useState(task.duration);
    const [running, setRunning] = useState(false);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'todo',
        item: {
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            timeStamp: task.timeStamp,
            duration: task.duration
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            }, 10)
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    const handleStop = () => {
        setRunning(false);

        let taskIndex = taskList.indexOf(task);
        taskList.splice(taskIndex, 1, {
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            timeStamp: task.timeStamp,
            duration: time
        });

        localStorage.setItem('taskList', JSON.stringify(taskList));
        window.location.reload();
    }

    const handleDelete = () => {
        let removeIndex = taskList.indexOf(task);
        taskList.splice(removeIndex, 1);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        window.location.reload();
    }
    return (
        <>
            <div
                ref={drag}
                className='flex flex-col items-start justify-start bg-white
                my-4 ml-6 px-6 py-4 w-3/4 max-w-lg'>
                <div className='w-full flex justify-between'>
                    <p className='font-semibold text-xl'>{task.projectName}</p>
                    <EditTask task={task} index={index} taskList={taskList} setTaskList={setTaskList} />
                </div>
                <p className='text-lg py-2'>{task.taskDescription}</p>
                <div className='w-full flex justify-evenly items-center'>
                    <div className='text-xl font-semibold py-4'>
                        <span>{('0' + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
                        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                        <span className='text-sm'>{('0' + (time / 10) % 100).slice(-2)}</span>
                    </div>
                    <div className='w-1/3 max-w-sm flex justify-evenly gap-2'>
                        {running ? (<button
                            onClick={handleStop}
                            className='border rounded-lg py-1 px-3'>
                            Stop
                        </button>) : (<button
                            onClick={() => { setRunning(true) }}
                            className='border rounded-lg py-1 px-3'>
                            Start
                        </button>)}
                        <button
                            onClick={() => { setTime(0) }}
                            className='border rounded-lg py-1 px-3'>Reset</button>
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <button
                        onClick={handleDelete}
                        className='bg-red-500 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded mt-6'>
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default ToDo;