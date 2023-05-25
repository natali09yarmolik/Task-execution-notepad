import React, {FC, memo, useEffect} from 'react'
import {TodolistDomainType} from 'features/todolistsList/Todolist/todolists.reducer'
import { tasksThunks } from 'features/todolistsList/Task/tasks.reducer';
import { TaskType } from 'features/todolistsList/Todolist/todolists.api';
import { useActions } from 'common/hooks';
import { AddItemForm} from 'common/components'
import {FilterTasksButtons} from "features/todolistsList/Todolist/FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "features/todolistsList/Task/Tasks/Tasks";
import {TodolistTitle} from "features/todolistsList/Todolist/TodolistTitle/TodolistTitle";

type PropsType = {
	todolist: TodolistDomainType
	tasks: TaskType[]
}

export const Todolist: FC<PropsType> = memo(({todolist, tasks}) => {

	const {fetchTasks, addTask} = useActions(tasksThunks)

	useEffect(() => {
		fetchTasks(todolist.id)
	}, [])

	const addTaskCallback = (title: string) => {
		return addTask({title, todolistId: todolist.id}).unwrap()
	}

	return (<div>

		<TodolistTitle todolist={todolist}/>
		<AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
		<div>
			<Tasks todolist={todolist} tasks={tasks}/>
		</div>
		<div style={{paddingTop: '10px'}}>
			<FilterTasksButtons todolist={todolist}/>
		</div>
	</div>)
})


