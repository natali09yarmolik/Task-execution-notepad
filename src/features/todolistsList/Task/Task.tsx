import React, {ChangeEvent, FC, memo} from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { TaskType } from 'features/todolistsList/Todolist/todolists.api'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums';
import {useActions} from "common/hooks";
import {tasksThunks} from "features/todolistsList/Task/tasks.reducer";
import s from './style.module.css'

type PropsType = {
	task: TaskType
	todolistId: string
}


export const Task:FC<PropsType> = memo(({task, todolistId}) => {

	const {removeTask, updateTask} = useActions(tasksThunks)

	const removeTaskHandler = () =>  removeTask({
		taskId:task.id,
		todolistId})

	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		updateTask({taskId: task.id,
			domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
			todolistId})
	};

	const changeTaskTitleHandler =(newValue: string) => {
		updateTask({taskId: task.id, domainModel: {title: newValue}, todolistId})}


	return <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ''}>
		<Checkbox
			checked={task.status === TaskStatuses.Completed}
			color="primary"
			onChange={changeTaskStatusHandler}
		/>

		<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
		<IconButton onClick={removeTaskHandler}>
			<Delete/>
		</IconButton>
	</div>
})
