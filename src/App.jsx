import { useEffect, useState } from "react"
import AddTask from "./components/AddTask"
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";
import Completed from "./components/Completed";

function App() {
  // State to manage the list of tasks to be done
  const [taskList, setTaskList] = useState([]);
  // State to manage the list of completed tasks
  const [completed, setCompleted] = useState([]);

  // useDrop hook to handle dropping tasks into the `Completed` section
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'todo',
    drop: (item) => addToComponent(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }));

  // Function to add a task to the completed list when dropped
  const addToComponent = (item) => {
    // Retrieve the current list of completed tasks from local storage
    let tempList = JSON.parse(localStorage.getItem('completedTasks'));

    tempList.push({
      projectName: item.projectName,
      taskDescription: item.taskDescription,
      timeStamp: item.timeStamp,
      duration: item.duration
    });

    // Update the local storage
    localStorage.setItem('completedTasks', JSON.stringify(tempList));

    // Remove the tasl from the task list
    const updatedTaskList = JSON.parse(localStorage.getItem('taskList')).filter((task) => task.timeStamp !== item.timeStamp);

    // Update the local storage
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    window.location.reload();

  };

  // Load tasks and completed tasks from localStorage when the app loads
  useEffect(() => {
    let storedTaskList = localStorage.getItem('taskList');
    let storedCompleted = localStorage.getItem('completedTasks');

    if (storedTaskList) {
      setTaskList(JSON.parse(storedTaskList));
    }
    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, []);

  return (
    <div className="bg-amber-100 min-h-screen p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold py-4 pl-6">Task Tracker</h1>
      <p className="text-xl pl-6">Hi there!</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click</p>
        {/* Add task component to add new tasks */}
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-2">to add a new task</p>
      </div>

      <div className="flex flex-wrap justify-evenly items-start border-t-2 border-black py-4 mt-4">
        <div className="min-w-[350px]">
          <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg my-2 py-1 px-4 bg-gray-200">To Do:</h2>
          {/* Mapping over taskList to render each todo component */}
          {
            taskList.map((task, index) => (
              <div key={index}>
                <ToDo task={task} taskList={taskList} />
              </div>
            ))
          }
        </div>

        {/* Completed tasks section */}
        <div className="min-w-[350px]" ref={drop} style={{ backgroundColor: isOver ? '#e0e7ff' : 'transparent' }}>
          <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg my-2 py-1 px-4 bg-gray-200">Completed:</h2>
          {/* Mapping over completed tasks to render each completed component */}
          {
            completed.map((completedTask, index) => (
              <div key={index}>
                <Completed task={completedTask} taskList={completed} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App;
