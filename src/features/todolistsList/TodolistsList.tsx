import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { todolistsThunks } from 'features/todolistsList/Todolist/todolists.reducer'
import { Grid, Paper } from '@mui/material'
import { AddItemForm } from 'common/components'
import { Todolist } from './Todolist/Todolist'
import { Navigate } from 'react-router-dom'
import { useActions } from 'common/hooks';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { selectTasks } from 'features/todolistsList/Task/tasks.selectors';
import { selectTodolists } from 'features/todolistsList/Todolist/todolists.selectors';
import s from './todolislList.module.css'
import style from '../../container.module.css'

export const TodolistsList = () => {
	const todolists = useSelector(selectTodolists)
	const tasks = useSelector(selectTasks)
	const isLoggedIn = useSelector(selectIsLoggedIn)

	const {
		addTodolist: addTodolistThunk,
		fetchTodolists,
	} = useActions(todolistsThunks)


	useEffect(() => {
		if (!isLoggedIn) {
			return;
		}
		fetchTodolists({})
	}, [])

	const addTodolist = (title: string) => {
		return addTodolistThunk(title).unwrap()
	}

	if (!isLoggedIn) {
		return <Navigate to={'/login'}/>
	}

	return <>
		<main className={s.mainBlock}>
			<div className={`${s.titleTask} ${style.container}`}>
				<span>Enter the title of the task</span>
				<Grid>
					<AddItemForm addItem={addTodolist}/>
				</Grid>
			</div>
			<div className={s.tasksBlock}>
				<Grid container
					  direction="row"
					  justifyContent="flex-start"
					  gap='25px'
				>
					{
						todolists.map(tl => {
							let allTodolistTasks = tasks[tl.id]
							return <Grid item key={tl.id} spacing={3}>

								<Paper style={{padding: '10px'}}>
									<Todolist
										todolist={tl}
										tasks={allTodolistTasks}
									/>
								</Paper>
							</Grid>
						})
					}
				</Grid>
			</div>

		</main>

	</>
}
