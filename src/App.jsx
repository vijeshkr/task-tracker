import { useState } from "react"
import AddTask from "./components/AddTask"
import ToDo from "./components/ToDo";

function App() {
  const [taskList, setTaskList] = useState([]);
  return (
    <>
      <h1 className="text-2xl font-bold py-4 pl-6">Task Tracker</h1>
      <p className="text-xl pl-6">Hi there!</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-2">to add a new task</p>
      </div>
      <div>
        <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg my-2 py-1 px-4 bg-gray-300">To Do:</h2>
        {
          taskList.map((task, index) => (
            <>
              <ToDo key={index} task={task} />
            </>
          ))
        }
      </div>
    </>
  )
}

export default App
