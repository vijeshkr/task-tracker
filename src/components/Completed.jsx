const Completed = ({ task, taskList }) => {

    // Function to handle the deletion of completed task
    const handleDelete = () => {
        let removeIndex = taskList.indexOf(task);

        taskList.splice(removeIndex, 1);

        // Update the local storage and reload
        localStorage.setItem('completedTasks', JSON.stringify(taskList));
        window.location.reload();
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(task.duration / 3600000);
    const minutes = Math.floor((task.duration % 3600000) / 60000);
    const seconds = Math.floor((task.duration % 60000) / 1000);

    // Format with leading zeros for hours, minutes, and seconds
    const formattedHours = ('0' + hours).slice(-2);
    const formattedMinutes = ('0' + minutes).slice(-2);
    const formattedSeconds = ('0' + seconds).slice(-2);

    return (
        <>
            <div
                style={{
                    backgroundColor: '#168437',
                    boxShadow: '12px 12px 0px -6px rgba(0,0,0,0.6)'
                }}
                className='flex flex-col items-start justify-start bg-white
                my-4 ml-6 px-6 py-4 w-3/4 max-w-lg min-w-[320px]'>
                <p className='font-semibold text-xl'>{task.projectName}</p>
                <p className='text-lg py-2'>{task.taskDescription}</p>
                <div>
                    <strong>Task Duration : </strong>
                    <span>{formattedHours}<strong>h</strong> {formattedMinutes}<strong>m</strong> {formattedSeconds}<strong>s</strong></span>
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

export default Completed;