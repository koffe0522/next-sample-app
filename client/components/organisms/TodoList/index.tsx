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

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataBody)
    }).then((res: Response): object => res.json());
    return response;
  };

  const deleteTodo = (key: number): void => {
    setTodos(
      todos
        .filter((_, index): unknown => index !== key)
        .map((value): string => {
          return value;
        })
    );
  };

  useEffect((): void => {
    // ローカルストレージへ保存
    postTodoData().then((res: object): void => {
      localStorage.setItem(
        (res as TodoList).name,
        (res as TodoList).todos.join(",")
      );
    });
  }, [todos]);

  useEffect((): void => {
    // ローカルストレージから取得
    const todoslist = localStorage.getItem(useName);
    if (typeof todoslist === "string") {
      setTodos(todoslist.split(","));
    }
  }, []);

  return (
    <div>
      <ul>
        {todos.map(
          (value, index): JSX.Element => {
            const element = value !== "" && (
              <li key={index.toString()}>
                {value}
                <button type="button" onClick={(): void => deleteTodo(index)}>
                  x
                </button>
              </li>
            );
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
