import React from 'react';

interface Props {
    children: React.ReactNode;
    name: string;
    checked: boolean;
    toggleTodo: (name: string) => void;
}

const Todo: React.FC<Props> = ({name, checked, children, toggleTodo}) =>{

    function handleChange(){
        toggleTodo(name);
    }
    
    return(
        <label htmlFor={name} style={{display: 'block'}}>
            <input onChange={handleChange} type="checkbox" name={name} id={name} checked={checked}/>
            <span>
                {children}
            </span>
        </label>
    );
}

export default Todo;