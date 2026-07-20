import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();
	const { mutate, isPending, error } = useLogin();

	const handleChange = (e) => {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		mutate(values, {
			onSuccess: (data) => {
				const destination = ROLE_REDIRECTS[data.user.role] ?? '/login';
				navigate(destination, { replace: true });
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
						<input
							type='email'
							name='email'
							placeholder='Email'
							value={values.email}
							onChange={handleChange}
							className='text-sm placeholder:text-[#808080] bg-brand border-brand focus:border-brand-border rounded-sm px-6 py-3'
						/>
						<input
							type='password'
							name='password'
							placeholder='Password'
							value={values.password}
							onChange={handleChange}
							className='text-sm placeholder:text-[#808080] bg-brand border-brand focus:border-brand-border rounded-sm px-6 py-3'
						/>
					</div>
					{errorMessage && (
						<p className='text-red-500 text-xs text-center'>
							{errorMessage}
						</p>
					)}
					<button
						type='button'
						className='text-right text-sm font-semibold text-brand-orange'
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
