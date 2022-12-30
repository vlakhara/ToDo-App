import { useRef, useState } from "react";
import style from "./AddTask.module.css";

const AddTask = (props) => {
  const taskRef = useRef();
  const [isValid, setIsValid] = useState(true);
  const taskChangeHandler = (event) => {
    event.preventDefault();
    let taskText;
    if (taskRef.current.value.trim().length > 0) {
      taskText = taskRef.current.value;
    } else {
      setIsValid(false);
      taskRef.current.focus();
      return;
    }
    props.setNewTask(taskText);
    taskRef.current.value = "";
  };
  const setValid = (event) => {
    if (
      event.target.value.trim().length > 0 ||
      event.target.value.trim() === ""
    ) {
      setIsValid(true);
    }
  };
  const taskValid = (event) => {
    if (event.target.value.trim() === "") {
      setIsValid(false);
    }
  };

  return (
    <form
      className={style.addTask}
      onSubmit={taskChangeHandler}
      onClick={() => taskRef.current.focus()}
    >
      <div className={style.formControls}>
        <input
          type="text"
          ref={taskRef}
          className={style.input}
          onChange={setValid}
          onBlur={taskValid}
        />
        <button type="submit" className={`${style.button} `}>
          Add
        </button>
      </div>
      {!isValid && (
        <div className={style.error}>
          <p className={style.errorText}>* Task must not be empty</p>
        </div>
      )}
    </form>
  );
};

export default AddTask;
