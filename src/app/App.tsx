import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
	CircularProgress,
	Container,
	LinearProgress,
} from '@mui/material';
import { Login } from 'features/auth/Login/Login'
import 'app/App.module.css'
import { TodolistsList } from 'features/todolistsList/TodolistsList'
import { ErrorSnackbar } from 'common/components'
import { useActions } from 'common/hooks';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { selectAppStatus, selectIsInitialized } from 'app/app.selectors';
import { authThunks } from 'features/auth/auth.reducer';
import s from './App.module.css'
import style from '../container.module.css'

function App() {
	const status = useSelector(selectAppStatus)
	const isInitialized = useSelector(selectIsInitialized)
	const isLoggedIn = useSelector(selectIsLoggedIn)

	const {initializeApp, logout} = useActions(authThunks)

	useEffect(() => {
		initializeApp({})
	}, [])

	const logoutHandler = () => logout({})

	if (!isInitialized) {
		return <div
			style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
			<CircularProgress/>
		</div>
	}

	return (
		<BrowserRouter>
			<div className="App">
				<ErrorSnackbar/>
				<header className={s.headerBlock}>
					<div className={`${s.headerInfo} ${style.container}`}>
						<h2>Task execution notepad</h2>
						{isLoggedIn && <button className={s.headerButton} onClick={logoutHandler}>Log out</button>}
					</div>
					{status === 'loading' && <LinearProgress/>}
				</header>
				{/*<TodolistsList/>*/}
				<Container fixed>
					<Routes>
						<Route path={'/'} element={<TodolistsList/>}/>
						<Route path={'/login'} element={<Login/>}/>
					</Routes>
				</Container>
			</div>
		</BrowserRouter>
	)
}

export default App
