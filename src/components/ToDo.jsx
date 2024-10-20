import React, { useEffect, useState } from 'react';
import EditTask from './EditTask';
import { useDrag } from 'react-dnd';

const ToDo = ({ task, taskList }) => {
    // State to keep track of the task's elasped time
    const [time, setTime] = useState(task.duration);
    // State to track the timer is running or paused
    const [running, setRunning] = useState(false);

    // useDrag hook to enable drag and drop functionality
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'todo',
        item: {
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            timeStamp: task.timeStamp,
            duration: task.duration
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    // Effect to handle the timer logic when the task is runnig
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

    // Function to handle stopping the timer and updating the task's duration
    const handleStop = () => {
        setRunning(false);

        let taskIndex = taskList.indexOf(task);

        taskList.splice(taskIndex, 1, {
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            timeStamp: task.timeStamp,
            duration: time
        });

        // Update the local storage
        localStorage.setItem('taskList', JSON.stringify(taskList));
        window.location.reload();
    }

    // Function to handle deleting the task from the taskList
    const handleDelete = () => {

        let removeIndex = taskList.indexOf(task);
        taskList.splice(removeIndex, 1);

        // Update the local storage
        localStorage.setItem('taskList', JSON.stringify(taskList));
        window.location.reload();
    }
    return (
        <>
            <div
                ref={drag}
                style={{
                    backgroundColor: '#0079bf', 
                    boxShadow: '12px 12px 0px -6px rgba(0,0,0,0.6)'
                }}
                className='flex flex-col items-start justify-start bg-green-600
                my-4 ml-6 px-6 py-4 w-3/4 max-w-lg min-w-[320px] cursor-move'>
                {/* Task header with project name and edit button */}
                <div className='w-full flex justify-between'>
                    <p className='font-semibold text-xl'>{task.projectName}</p>
                    <EditTask task={task} taskList={taskList} />
                </div>
                <p className='text-lg py-2'>{task.taskDescription}</p>
                {/* Timer display and control buttons */}
                <div className='w-full flex justify-evenly items-center'>
                    <div className='text-xl font-semibold py-4'>
                        <span>{('0' + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
                        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                        <span className='text-sm'>{('0' + (time / 10) % 100).slice(-2)}</span>
                    </div>
                    {/* Control buttons */}
                    <div className='w-1/3 max-w-sm flex justify-evenly gap-2'>
                        {running ? (<button
                            onClick={handleStop}
                            className='border rounded-lg py-1 px-3 bg-gray-300 hover:bg-gray-400'>
                            Stop
                        </button>) : (<button
                            onClick={() => { setRunning(true) }}
                            className='border rounded-lg py-1 px-3 bg-gray-300 hover:bg-gray-400'>
                            Start
                        </button>)}
                        <button
                            onClick={() => { setTime(0) }}
                            className='border rounded-lg py-1 px-3 bg-gray-300 hover:bg-gray-400'>Reset</button>
                    </div>
                </div>
                {/* Delete button */}
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