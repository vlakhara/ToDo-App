import useHttp from "../hooks/useHttp";
import AddTask from "./AddTask";

const NewTask = (props) => {
  const { sendRequest: addNewTask, isLoading } = useHttp();

  const createTask = (taskText, data) => {
    const task = {
      id: data.name,
      title: taskText,
    };
    props.onAddTask(task);
  };
  const getNewTaskHandler = async (taskText) => {
    addNewTask(
      {
        url: "https://todo-327b6-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { title: taskText },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <div>
      <AddTask setNewTask={getNewTaskHandler} />
    </div>
  );
};
export default NewTask;
