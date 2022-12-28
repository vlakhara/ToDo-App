import style from "./Task.module.css";

const Task = (props) => {
  return (
    <div className={style.task}>
      <h1>{props.task.title}</h1>
      <button onClick={() => props.onTaskRemove(props.task)}>x</button>
    </div>
  );
};

export default Task;
