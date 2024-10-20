import React, { useState } from 'react';

const AddTask = ({ taskList }) => {
    // State to control the visibility of the modal
    const [addModal, setAddModal] = useState(false);
    // State to store the input value for project name
    const [projectName, setProjectName] = useState('');
    // State to store the input value for task description
    const [taskDescription, setTaskDescription] = useState('');
    // State to handle and display the error message
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle input field changes and update the respective state
    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === 'projectName') {
            setProjectName(value);
            setErrorMessage('');
        }

        if (name === 'projectName' && value === '') {
            setErrorMessage('Enter project name to continue')
        }

        if (name === 'taskDescription') setTaskDescription(value);
    }

    // Funtion to handle the addition of a new task to the task list
    const handleAdd = (e) => {
        e.preventDefault();

        if (!projectName) {
            setErrorMessage('Enter project name to continue')
        } else {
            let timeStamp = new Date();

            // Copy the existing tasl list and add the new with provided details
            let tempList = taskList;
            tempList.push({
                projectName,
                taskDescription,
                timeStamp: timeStamp,
                duration:0
            });
            
            // Save the updated task to local storage
            localStorage.setItem('taskList', JSON.stringify(tempList));
            window.location.reload();

            // Close the modal and reset input fields
            setAddModal(false);
            setProjectName('');
            setTaskDescription('');
        }
    }

    return (
        <div>
            {/* Button to open the modal */}
            <button
                onClick={() => setAddModal(true)}
                className='bg-blue-600 text-white uppercase text-sm font-semibold py-1 shadow-md 
                mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70'>
                New
            </button>
            {/* Render the modal only when addModal is true */}
            {
                addModal ? (
                    <div className='flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black bg-opacity-60'>
                        <div className='w-9/12 max-w-lg bg-white rounded-lg shadow-lg relative flex flex-col'>
                            <div className='flex justify-between p-5 bg-white border-b border-slate-200 rounded-t'>
                                <h3 className='bg-white text-3xl font-semibold'>Add New Task</h3>
                                <button
                                    onClick={() => setAddModal(false)}
                                    className='px-1 text-gray-400 float-right text-3xl leading-none font-semibold block'>
                                    &times;
                                </button>
                            </div>
                            
                            {/* Modal form with input fields */}
                            <form className='px-4 pt-6 pb-4'>
                                {/* Project name input field */}
                                <div>
                                    <label htmlFor="project-name"
                                        className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2'>
                                        Project Name
                                    </label>
                                    <input
                                        className='w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2
                                        leading-tight focus:outline-none focus:bg-white'
                                        id='project-name'
                                        placeholder='Project name'
                                        type="text"
                                        required
                                        name='projectName'
                                        value={projectName}
                                        onChange={handleInput} />
                                    <p className='text-red-500 text-sm mt-2 mb-5'>{errorMessage}</p>
                                </div>
                                {/* Task description input field */}
                                <div>
                                    <label htmlFor="task-description"
                                        className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2'>
                                        Task Description
                                    </label>
                                    <textarea
                                        className='w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 mb-5
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
                                        onClick={handleAdd}
                                        className='bg-blue-600 text-white font-semibold uppercase text-sm
                                    px-6 py-3 rounded hover:opacity-70'>
                                        Add Task
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

export default AddTask;