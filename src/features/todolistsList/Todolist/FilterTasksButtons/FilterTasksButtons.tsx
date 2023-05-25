import {useActions} from "common/hooks";
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from "features/todolistsList/Todolist/todolists.reducer";
import React, {FC} from "react";
import {Button} from "@mui/material";
import s from './filterTaskButtons.module.css'
type Props = {
    todolist: TodolistDomainType
}
export const FilterTasksButtons: FC<Props> = ({todolist}) => {
    const {changeTodolistFilter} = useActions(todolistsActions)

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({filter, id: todolist.id})
    }

    return (
        <div className={s.filterBlock}>
            <Button variant={"outlined"}
                    style={{width: '100px'}}
                    onClick={() => changeFilterHandler('all')}
                    color={todolist.filter === 'all' ? 'secondary' : 'inherit'}
            >All
            </Button>
            <Button variant={"outlined"}
                    style={{width: '100px'}}
                    onClick={() => changeFilterHandler('active')}
                    color={todolist.filter === 'active' ? 'secondary' : 'inherit'}
                    >Active
            </Button>
            <Button variant={"outlined"}
                    style={{width: '100px'}}
                    onClick={() => changeFilterHandler('completed')}
                    color={todolist.filter === 'completed' ? 'secondary' : 'inherit'}
                    >Completed
            </Button>
        </div>
    )
}
