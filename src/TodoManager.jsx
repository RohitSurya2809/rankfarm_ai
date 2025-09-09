import V0Task from "./V0Task" // Assuming V0Task is a component that needs to be imported

const TodoManager = () => {
  return (
    <div>
      <V0Task
        name="TodoManager"
        taskNameActive="Completing todo list"
        taskNameComplete="Completed todo list"
        input={{ action: "mark_all_done" }}
      />
    </div>
  )
}

export default TodoManager
