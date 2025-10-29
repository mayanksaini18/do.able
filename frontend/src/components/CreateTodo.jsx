import { useState } from 'react';

export function CreateTodo(props) {
    // Use array destructuring for useState
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div>
            <input id='title' style={{
                padding: 10, margin: 10
            }} type="text" placeholder="title" onChange={function (e) {
                setTitle(e.target.value);
            }}
            /> <br />
            <input id='description' style={{
                padding: 10, margin: 10
            }} type="text" placeholder="description" onChange={function (e) {
                setDescription(e.target.value);
            }}
            /> <br />

            <br /> <br />
            <button style={{
                padding: 10, margin: 10
            }} onClick={() => {
                // Corrected URL and endpoint
                fetch("http://localhost:4999/todo", {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(async function (res) {
                        await res.json();
                        alert("Todo added");
                        // A simple way to refresh the list: re-fetch all todos
                        fetch("http://localhost:4999/todo")
                            .then(async function (res) {
                                const json = await res.json();
                                props.setTodos(json);
                            })
                    })

            }}>
                Add a todo
            </button>
        </div>
    )

}
