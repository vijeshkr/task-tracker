import React, { useEffect, useState } from 'react'

const EditTask = ({ task, index, taskList, setTaskList }) => {
    const [editModal, setEditModal] = useState(false);
    // State to store the input value for project name and task description
    const [projectName, setProjectName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    useEffect(() => {
        setProjectName(task.projectName);
        setTaskDescription(task.taskDescription);
    }, []);

    // Handle input function to update state as user types in input fields
    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'projectName') setProjectName(value);
        if (name === 'taskDescription') setTaskDescription(value);
    }

    // Handle update function to add the new task to the task list and close the modal
    const handleUpdate = (e) => {
        e.preventDefault();

        let taskIndex = taskList.indexOf(task);
        taskList.splice(taskIndex, 1, {
            projectName: projectName,
            taskDescription: taskDescription,
            timeStamp: task.timeStamp,
            duration: task.duration
        });

        localStorage.setItem('taskList', JSON.stringify(taskList));
        window.location.reload();
        setEditModal(false);
    }
    
    return (
        <div>
            <button
                onClick={() => setEditModal(true)}
                className='bg-gray-400 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded'>
                Edit
            </button>
            {
                editModal ? (
                    <div className='flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50'>
                        <div className='w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col'>
                            <div className='flex justify-between p-5 bg-white border-b border-slate-200 rounded-t'>
                                <h3 className='bg-white text-3xl font-semibold'>Edit Task</h3>
                                <button
                                    onClick={() => setEditModal(false)}
                                    className='px-1 text-gray-400 float-right text-3xl leading-none font-semibold block'>
                                    &times;
                                </button>
                            </div>
                            {/* Modal form with input fields */}
                            <form className='px-6 pt-6 pb-4'>
                                {/* Project name input field */}
                                <div>
                                    <label htmlFor="project-name"
                                        className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2'>
                                        Project Name
                                    </label>
                                    <input
                                        className='w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5
                                        leading-tight focus:outline-none focus:bg-white'
                                        id='project-name'
                                        placeholder='Project name'
                                        type="text"
                                        required
                                        name='projectName'
                                        value={projectName}
                                        onChange={handleInput} />
                                </div>
                                {/* Task description input field */}
                                <div>
                                    <label htmlFor="task-description"
                                        className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2'>
                                        Task Description
                                    </label>
                                    <textarea
                                        className='w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5
                                        leading-tight focus:outline-none focus:bg-white resize-none'
                                        id='task-description'
                                        rows='4'
                                        placeholder='Task description'
                                        type="text"
                                        required
                                        name='taskDescription'
                                        value={taskDescription}
                                        onChange={handleInput} />
                                </div>
                                <div className='flec justify-end p-6 border-t border-slate-200 rounded-b'>
                                    <button
                                        onClick={handleUpdate}
                                        className='bg-blue-500 text-white font-semibold uppercase text-sm
                                    px-6 py-3 rounded hover:opacity-70'>
                                        Update Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default EditTask;