import { useEffect, useReducer, useRef, useState, useTransition } from "react";
import Todo from "./Todo";

export const Actions = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  DELETE_TODO: "DELETE_TODO",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.ADD_TODO:
      return [
        ...state,
        { id: Date.now(), name: payload.name, complete: false },
      ];
    case Actions.TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case Actions.DELETE_TODO:
      return state.filter((todo) => todo.id !== payload.id);
    default:
      return state;
  }
}

function App() {
  // for useRef
  // const [name, setName] = useState("");
  // // const [count, setCount] = useState(0);
  // const count = useRef(1);
  // const inputRef = useRef();

  // useEffect(() => {
  //   // setCount((prev) => prev + 1); // Cause the re-render
  //   count.current = count.current + 1;
  // });

  // const focus = () => {
  //   inputRef.current.focus();
  // };

  // for useReducer
  // const [name, setName] = useState("");
  // const [todos, dispatch] = useReducer(reducer, []);
  // function addTodo(e) {
  //   e.preventDefault();
  //   dispatch({ type: Actions.ADD_TODO, payload: { name: name } });
  //   setName("");
  // }
  // console.log(todos);

  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  function handleChange(e) {
    setName(e.target.value);
    startTransition(() => {
      const l = []
      for (let i = 0; i < 20000; i++) {
        l.push(e.target.value )
      }
      setList(l)
    })
  }

  return (
    // <div className="App">
    //   <input
    //     ref={inputRef}
    //     type="text"
    //     onChange={(e) => setName(e.target.value)}
    //   />
    //   <div>My name is {name}</div>
    //   <div>I rendered {count.current}</div>
    //   <button onClick={focus}>Focus</button>
    // </div>

    // <div>
    //   <form onSubmit={addTodo}>
    //     <input
    //       type="text"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     ></input>
    //   </form>
    //   {todos.map((todo) => {
    //     return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
    //   })}
    // </div>

    <div>
      <input onChange={handleChange} />
      {isPending
        ? "Loading..."
        : list.map((l) => {
            return <div>{l}</div>;
          })}
    </div>
  );
}

export default App;
