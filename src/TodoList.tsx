import React, { useRef, useEffect, useState} from "react";

import Todo from "Todo";

const LOCAL_STOGAE_KEY = 'todoApp.todos';


const TodoList: React.FC = () =>{

    const [todoList, setTodos] = useState([]);

    useEffect(() =>{
        console.log("iniciando")
        const storageTodos = localStorage.getItem(LOCAL_STOGAE_KEY);
        console.log(storageTodos);
        if (storageTodos){
            setTodos(JSON.parse(storageTodos));
        }
    }, []);

    useEffect( () => {
        console.log('mudando alguma coisa')
        localStorage.setItem(LOCAL_STOGAE_KEY, JSON.stringify(todoList));
    }, [todoList]);

    const inputRef = useRef<HTMLInputElement>(null);

    function addTodo(){
        if (inputRef.current.value){
            const newTodo = {name: `todo#${Math.floor(Math.random() * 100)}`, checked: false, todoMsg: inputRef.current.value};
            const newTodos = [...todoList, newTodo];
            inputRef.current.value = '';
            setTodos(newTodos);
        }
    }

    function clearComplete(){
        const todosNotComplete = todoList.filter(todo => !todo.checked);
        setTodos(todosNotComplete);
    }

    function toggleTodo(name){
        const newTodos = [...todoList];
        const todo = newTodos.find(todo => todo.name === name);
        todo.checked = !todo.checked;
        setTodos(newTodos)
    }

    return(
        <div>
            <header>
                {todoList.map(todo => {
                    return(
                        <Todo name={todo.name} checked={todo.checked} toggleTodo={toggleTodo} key={todo.name}>{todo.todoMsg}</Todo>
                    );
                })}
            </header>
            <footer>
                <input ref={inputRef} type="text" placeholder='Adicione um novo item'/>
                <button onClick={addTodo}>Adicionar</button>
                <button onClick={clearComplete}>Limpar os completos</button>
            </footer>

        </div>
    );
}

export default TodoList;