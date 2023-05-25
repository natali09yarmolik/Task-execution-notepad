import {EditableSpan} from "common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import React, {FC} from "react";
import {TodolistDomainType, todolistsThunks} from "features/todolistsList/Todolist/todolists.reducer";
import {useActions} from "common/hooks";

type PropsType={
    todolist: TodolistDomainType
}
export const TodolistTitle:FC<PropsType> = ({todolist}) => {
    const {changeTodolistTitle, removeTodolist} = useActions(todolistsThunks)

    const removeTodolistCallback = () => {
        removeTodolist(todolist.id)
    }

    const changeTodolistTitleCallback = (title: string) => {
        changeTodolistTitle({id: todolist.id, title})
    }
    return (
        <div>
            <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback}/>
                <IconButton onClick={removeTodolistCallback} disabled={todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
        </div>
    )
}