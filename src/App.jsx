import { useEffect, useState } from "react"
import AddTask from "./components/AddTask"
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";
import Completed from "./components/Completed";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'todo',
    drop: (item) => addToComponent(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }));

  const addToComponent = (item) => {
    let tempList = JSON.parse(localStorage.getItem('completedTasks'));
    tempList.push({
      projectName: item.projectName,
      taskDescription: item.taskDescription,
      timeStamp: item.timeStamp,
      duration: item.duration
    });
    localStorage.setItem('completedTasks', JSON.stringify(tempList));

    const updatedTaskList = JSON.parse(localStorage.getItem('taskList')).filter((task) => task.timeStamp !== item.timeStamp);
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
    <>
      <h1 className="text-2xl font-bold py-4 pl-6">Task Tracker</h1>
      <p className="text-xl pl-6">Hi there!</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-2">to add a new task</p>
      </div>
      <div className="flex">
        <div className="w-full">
          <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg my-2 py-1 px-4 bg-gray-300">To Do:</h2>
          {
            taskList.map((task, index) => (
              <div key={index}>
                <ToDo task={task} index={index} taskList={taskList} setTaskList={setTaskList} />
              </div>
            ))
          }
        </div>
        <div className="w-full" ref={drop}>
          <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg my-2 py-1 px-4 bg-gray-300">Completed:</h2>
          {
            completed.map((completedTask, index) => (
              <div key={index}>
                <Completed task={completedTask} taskList={completed} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
