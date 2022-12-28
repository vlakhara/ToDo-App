import { useCallback, useEffect, useState } from "react";
import style from "./App.module.css";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";

const App = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getTasks = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://todo-327b6-default-rtdb.firebaseio.com/tasks.json"
    );
    const data = await response.json();
    const loadedTasks = [];
    for (const key in data) {
      loadedTasks.push({
        id: key,
        title: data[key].title,
      });
    }
    setAllTasks(loadedTasks);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const getNewTaskHandler = async (newTask) => {
    await fetch("https://todo-327b6-default-rtdb.firebaseio.com/tasks.json", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getTasks();
  };
  const taskRemoveHandler = async (task) => {
    console.log({ task });
    await fetch(`https://todo-327b6-default-rtdb.firebaseio.com/tasks.json/`, {
      method: "DELETE",
    });
    getTasks();
  };
  return (
    <div className={style.app}>
      <AddTask setNewTask={getNewTaskHandler} />
      {allTasks.length && (
        <Tasks tasks={allTasks} onRemove={taskRemoveHandler} />
      )}
    </div>
  );
};

export default App;
