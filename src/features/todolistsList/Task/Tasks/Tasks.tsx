import {Task} from "features/todolistsList/Task/Task";
import React, {FC} from "react";
import {TaskStatuses} from "common/enums";
import {TodolistDomainType} from "features/todolistsList/Todolist/todolists.reducer";
import {TaskType} from "features/todolistsList/Todolist/todolists.api";

type PropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Tasks:FC<PropsType> = ({tasks, todolist})=>{
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return (
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}/>)
            }
        </div>
    )
}