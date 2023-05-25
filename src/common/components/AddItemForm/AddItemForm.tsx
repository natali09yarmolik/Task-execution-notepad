import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import { IconButton, TextField } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import {RejectValueType} from "common/utils/create-app-async-thunk";

type PropsType = {
	addItem: (title: string) => Promise<any>
	disabled?: boolean
}

export const AddItemForm:FC<PropsType> = memo( ({addItem, disabled = false})=> {

	let [title, setTitle] = useState('')
	let [error, setError] = useState<string | null>(null)

	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title)
				.then(() => {
					setTitle('')
				})
				.catch((err: RejectValueType) => {
					if (err.data) {
						const message = err.data.messages
						setError(message.length ? message[0] : 'Some error occurred')
					}
				})
		} else {
			setError('Title is required');
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null);
		}

		if (e.key === 'Enter') {
			addItemHandler();
		}
	}

	return <div>
		<TextField variant="outlined"
				   disabled={disabled}
				   error={!!error}
				   value={title}
				   onChange={onChangeHandler}
				   onKeyDown={onKeyPressHandler}
				   label="Title"
				   helperText={error}
		/>
		<IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
			<AddBox/>
		</IconButton>
	</div>
})
