import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Storeから受けとったStateを定義するI/F
 * @interface State
 */
interface State {
  auth: {
    userName: string;
  };
}

function Todolist(): JSX.Element {
  /* state */
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  /* maoStateToProps */
  const useName: string = useSelector(
    (state: State): string => state.auth.userName
  );

  const handleChange = (value: string): void => {
    setTodo(value);
  };

  const handleSubmit = (): void => {
    setTodos([...todos, todo]);
    setTodo("");
  };

  // postデータをそのまま返すAPI
  const postTodoData = async (): Promise<object> => {
    const dataBody: TodoList = { name: "", todos: [] };
    dataBody.name = useName;
    dataBody.todos = todos;

    const url = "http://localhost:9000/api/index";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataBody)
    }).then((res: Response): object => res.json());
    return response;
  };

  useEffect((): void => {
    // ローカルストレージへ保存
    postTodoData().then((res: TodoList): void => {
      localStorage.setItem(res.name, res.todos.join(","));
    });
  }, [todos]);

  useEffect((): void => {
    // ローカルストレージから取得
    const todoslist: string = localStorage.getItem(useName);
    setTodos(todoslist.split(","));
  }, []);

  return (
    <div>
      <ul>
        {todos.map(
          (value, index): JSX.Element => {
            const element =
              value !== "" ? <li key={index.toString()}>{value}</li> : null;
            return element;
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
