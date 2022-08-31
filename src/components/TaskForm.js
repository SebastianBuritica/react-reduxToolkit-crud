import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// We import our reducers
import { addTask, editTask } from "../features/tasks/tasksSlice";
import { v4 as uuid } from "uuid";

function TaskForm() {
  // We will use the useState hook to add a new task.
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  // We use the dispatch hook to dispatch the actions from our reducers.
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  // When we enter the values in the form we will use our handleChange function to update the state with the new values entered.
  const handleChange = (e) => {
    setTask({
      // We use the spread operator to copy all of the values that we already have in the state.
      ...task,
      // If we type in the input title then the name will be title and the value will be the value of the input.
      [e.target.name]: e.target.value,
    });
  };

  // In our handleSubmit we want to execute our addTask action and pass in the task we created in the state.
  const handleSubmit = (e) => {
    // We use e.preventDefault to prevent the page from refreshing when we submit the form.
    e.preventDefault();

    if (params.id) {
      dispatch(editTask({ ...task, id: params.id }));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    // We use navigate so that after adding or editing a task we will be redirected to the tasks page.
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params, tasks]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label className="block text-sm font-bold">Task:</label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        placeholder="Write a title"
        autoFocus
      />
      <label>
        Description:
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          value={task.description}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          placeholder="Write a description"
        />
      </label>
      <button type="submit" className="bg-indigo-600 px-2 py-1">Submit</button>
    </form>
  );
}

export default TaskForm;
