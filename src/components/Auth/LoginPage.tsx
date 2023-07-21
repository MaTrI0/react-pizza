import React from 'react'
import style from './AdminAuth.module.scss'

const LoginModule: React.FC = () => {
	const [email, setEmail] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [emailDirty, setEmailDirty] = React.useState<boolean>(false)
	const [passwordDirty, setPasswordDirty] = React.useState<boolean>(false)
	const [emailError, setEmailError] = React.useState<string>(
		'Email не может быть пустым'
	)
	const [passwordError, setPasswordError] = React.useState<string>(
		'Пароль не может быть пустым'
	)
	const [formValid, setFormValid] = React.useState<boolean>(false)

	React.useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [emailError, passwordError])

	const emailHandler = (e: any) => {
		setEmail(e.target.value)
		if (e.target.value !== 'test@mail.ru') {
			setEmailError('Некорректный email')
		} else {
			setEmailError('')
		}
	}

	const passwordHandler = (e: any) => {
		setPassword(e.target.value)
		if (e.target.value !== 'Qwerty123') {
			setPasswordError('Пароли не совподают')
			if (!e.target.value) {
				setPasswordError('Пароль не может быть пустым')
			}
		} else {
			setPasswordError('')
		}
	}

	const blurHandler = (e: any) => {
		switch (e.target.name) {
			case 'email':
				setEmailDirty(true)
				break
			case 'password':
				setPasswordDirty(true)
				break
		}
	}

	return (
		<form className={style.box}>
			<h1>Login</h1>
			{emailDirty && emailError && (
				<div style={{ color: 'red', fontSize: '14px' }}>{emailError}</div>
			)}
			<input
				onChange={e => emailHandler(e)}
				onBlur={e => blurHandler(e)}
				name='email'
				type='text'
				placeholder='Введите ваш email'
			/>
			{passwordDirty && passwordError && (
				<div style={{ color: 'red', fontSize: '14px' }}>{passwordError}</div>
			)}
			<input
				onChange={e => passwordHandler(e)}
				onBlur={e => blurHandler(e)}
				name='password'
				type='password'
				placeholder='Введите ваш пароль'
			/>
			<button disabled={!formValid} type='submit' formAction='/admin'>
				Войти
			</button>
		</form>
	)
}

export default LoginModule
