import Task from "./Task";
import style from "./Tasks.module.css";

const Tasks = (props) => {
  const allTasks = props.tasks;
  return (
    <div className={style.tasks}>
      {allTasks.map((item, i) => (
        <Task
          task={item}
          key={`${item.id}_${i}`}
          onTaskRemove={props.onRemove}
        />
      ))}
    </div>
  );
};

export default Tasks;
