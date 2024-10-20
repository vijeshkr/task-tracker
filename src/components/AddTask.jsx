import React, { useState } from 'react'

const AddTask = ({taskList, setTaskList}) => {
    const [addModal, setAddModal] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'projectName') setProjectName(value);
        if (name === 'taskDescription') setTaskDescription(value);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        setTaskList(
            [...taskList, {projectName, taskDescription}]
        )
        setAddModal(false);
        setProjectName('');
        setTaskDescription('');
    }

    return (
        <div>
            <button
                onClick={() => setAddModal(true)}
                className='bg-blue-500 text-white uppercase text-sm font-semibold py-1 
                mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70'>
                +New
            </button>
            {
                addModal ? (
                    <div className='flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50'>
                        <div className='w-9/12 max-w-lg bg-white rounded-lg shadow-md relative flex flex-col'>
                            <div className='flex justify-between p-5 bg-white border-b border-slate-200 rounded-t'>
                                <h3 className='bg-white text-3xl font-semibold'>Add New Task</h3>
                                <button
                                    onClick={() => setAddModal(false)}
                                    className='px-1 text-gray-400 float-right text-3xl leading-none font-semibold block'>
                                    &times;
                                </button>
                            </div>
                            <form className='px-6 pt-6 pb-4'>
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
                                        onClick={handleAdd}
                                        className='bg-blue-500 text-white font-semibold uppercase text-sm
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

export default AddTask