
/**todos =[
 * {
 *  title :"go to gym",
 * description:""
 * }
] */

export function Todos({ todos, setTodos }) {

    const markAsCompleted = (id) => {
        fetch(`http://localhost:4999/completed/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async function (res) {
                if (res.ok) {
                    // Update the state to reflect the change in the UI instantly
                    setTodos(currentTodos =>
                        currentTodos.map(todo =>
                            todo._id === id ? { ...todo, completed: true } : todo
                        )
                    );
                    alert("Todo marked as completed!");
                }
            });
        };

    return (
        <div>
            {todos.map(function (todo) {
                return <div key={todo._id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={() => markAsCompleted(todo._id)}>{todo.completed == true ? "Completed" : "Mark as Complete"}</button>
                </div> 
            })}
           
        </div>
    )
}
