import React, { useState } from "react";

function Todolist(): JSX.Element {
  /* state */
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  const handleChange = (value: string): void => {
    setTodo(value);
  };

  const handleSubmit = (): void => {
    setTodos([...todos, todo]);
    setTodo("");
  };

  return (
    <div>
      <ul>
        {todos.map(
          (value, index): JSX.Element => {
            return <li key={index.toString()}>{value}</li>;
          }
        )}
      </ul>
      <label>
        Todo:
        <input
          type="text"
          value={todo}
          onChange={(e): void => handleChange(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSubmit}>
        ADD
      </button>
    </div>
  );
}

export default Todolist;
