import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/portal-logo.png';
import { useLogin } from '../../hooks/useLogin';
import { getErrorMessage } from '../../utils/getErrorMessage';

const ROLE_REDIRECTS = {
	student: '/student/dashboard',
	lecturer: '/lecturer/dashboard',
	admin: '/admin/dashboard',
};

export default function LoginPage() {
	const [values, setValues] = useState({ email: '', password: '' });
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { mutate, isPending, error } = useLogin();

	const handleChange = (e) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		mutate(values, {
			onSuccess: (data) => {
				// ProtectedRoute stashes the attempted URL in location.state.
				const intended = location.state?.from?.pathname;
				const fallback = ROLE_REDIRECTS[data.user.role] ?? '/login';

				navigate(intended ?? fallback, { replace: true });
			},
		});
	};

	const errorMessage = getErrorMessage(error, {
		401: 'Invalid email or password.',
	});

	return (
		<div className='flex flex-col h-screen justify-center items-center max-w-80 px-5 py-12 m-auto font-body gap-11'>
			<div className='flex flex-col gap-8 items-center'>
				<img
					src={logo}
					alt='School Logo'
					className='w-22.5 h-22.75 object-cover'
				/>
				<h2 className='text-xl text-center font-semibold text-black'>
					Welcome back, we've missed you!
				</h2>
			</div>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-8 w-full'
			>
				<div className='flex flex-col gap-3'>
					<div className='flex flex-col gap-7'>
						<label htmlFor='email' className='sr-only'>
							Email address
						</label>
						<input
							id='email'
							type='email'
							name='email'
							placeholder='Email'
							required
							autoComplete='email'
							aria-invalid={Boolean(errorMessage)}
							aria-describedby={
								errorMessage ? 'login-error' : undefined
							}
							value={values.email}
							onChange={handleChange}
							className='text-sm placeholder:text-[#808080] bg-brand border-brand focus:border-brand-border rounded-sm px-6 py-3'
						/>
						<div className='relative'>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								id='password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								placeholder='Password'
								required
								autoComplete='current-password'
								aria-invalid={Boolean(errorMessage)}
								aria-describedby={
									errorMessage ? 'login-error' : undefined
								}
								value={values.password}
								onChange={handleChange}
								className='w-full text-sm placeholder:text-[#808080] bg-brand border-brand focus:border-brand-border rounded-sm px-6 py-3 pr-11'
							/>
							<button
								type='button'
								onClick={() => setShowPassword((prev) => !prev)}
								aria-label={
									showPassword
										? 'Hide password'
										: 'Show password'
								}
								className='absolute right-3 top-1/2 -translate-y-1/2 text-[#808080]'
							>
								{showPassword ? <EyeOffIcon /> : <EyeIcon />}
							</button>
						</div>
					</div>
					{errorMessage && (
						<p
							id='login-error'
							role='alert'
							className='text-red-500 text-xs text-center'
						>
							{errorMessage}
						</p>
					)}
					{/*
						Password reset is not implemented end to end yet � there is
						no /auth/forgot-password route on the API. Rendering this
						as disabled with an explanation is honest; a button that
						silently does nothing is not.
					*/}
					<button
						type='button'
						disabled
						title='Password reset is not available yet � please contact your department administrator.'
						className='text-right text-sm font-semibold text-brand-orange disabled:cursor-not-allowed disabled:opacity-50'
					>
						Forgot Password?
					</button>
				</div>
				<button
					type='submit'
					disabled={isPending}
					className='w-full py-3.5 bg-brand-red rounded-sm text-white text-sm'
				>
					{isPending ? 'Logging in...' : 'Log In'}
				</button>
			</form>
		</div>
	);
}

function EyeIcon() {
	return (
		<svg
			width='18'
			height='18'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z'
				stroke='currentColor'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<circle
				cx='12'
				cy='12'
				r='3'
				stroke='currentColor'
				strokeWidth='1.8'
			/>
		</svg>
	);
}

function EyeOffIcon() {
	return (
		<svg
			width='18'
			height='18'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.3 20.3 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a20.3 20.3 0 0 1-2.88 3.88M1 1l22 22'
				stroke='currentColor'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M9.53 9.53a3 3 0 0 0 4.24 4.24'
				stroke='currentColor'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
