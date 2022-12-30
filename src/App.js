import { useEffect, useState } from "react";
import style from "./App.module.css";
import Tasks from "./components/Tasks";
import useHttp from "./hooks/useHttp";
import NewTask from "./components/NewTask";

const App = () => {
  const [allTasks, setAllTasks] = useState([]);
  const { sendRequest: getTasks, isLoading } = useHttp();
  useEffect(() => {
    const tasks = (tasksObj) => {
      const loadedTasks = [];
      for (const key in tasksObj) {
        loadedTasks.push({
          id: key,
          title: tasksObj[key].title,
        });
      }
      setAllTasks(loadedTasks);
    };
    getTasks(
      {
        url: "https://todo-327b6-default-rtdb.firebaseio.com/tasks.json",
        method: "GET",
      },
      tasks
    );
  }, [getTasks]);

  const newTaskHandler = (task) => {
    setAllTasks((prevTasks) => [task, ...prevTasks]);
  };

  const { sendRequest: onDelete, isDeleting } = useHttp();

  const taskRemoveHandler = async (task) => {
    const updatedTasks = () => {
      const newTasks = allTasks.filter((item) => item.id !== task.id);
      setAllTasks(newTasks);
    };
    onDelete(
      {
        url: `https://todo-327b6-default-rtdb.firebaseio.com/tasks/${task.id}.json`,
        method: "DELETE",
      },
      updatedTasks
    );
  };

  return (
    <div className={style.app}>
      <NewTask onAddTask={newTaskHandler} />

      {!isLoading && allTasks.length > 0 && (
        <Tasks tasks={allTasks} onRemove={taskRemoveHandler} />
      )}
      {allTasks.length === 0 && !isLoading && (
        <h1 style={{ textAlign: "center" }}>Add some tasks!!</h1>
      )}
    </div>
  );
};

export default App;
