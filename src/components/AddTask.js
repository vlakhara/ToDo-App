import { useRef, useState } from "react";
import style from "./AddTask.module.css";

const AddTask = (props) => {
  const taskRef = useRef();
  const [isValid, setIsValid] = useState(true);
  const taskChangeHandler = (event) => {
    let task;
    event.preventDefault();
    if (taskRef.current.value.trim().length > 0) {
      task = {
        title: taskRef.current.value,
      };
    } else {
      setIsValid(false);
      taskRef.current.focus();
      return;
    }
    props.setNewTask(task);
    taskRef.current.value = "";
  };
  const setValid = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
  };
  const classes = `${style.input} ${!isValid ? style.invalid : ""}`;
  const button = `${style.button} ${!isValid ? style.invalidBtn : ""}`;
  return (
    <form className={style.addTask} onSubmit={taskChangeHandler}>
      <div className={style.formControls}>
        <input
          type="text"
          ref={taskRef}
          className={classes}
          onChange={setValid}
        />
        <button type="submit" className={button}>
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTask;
