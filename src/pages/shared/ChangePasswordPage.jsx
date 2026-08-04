import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import logo from '../../assets/images/portal-logo.png';
import { changePasswordRequest } from '../../api/auth';
import { useAuth } from '../../context/useAuth';
import { getErrorMessage } from '../../utils/getErrorMessage';

/**
 * The gate a temporary password lands on.
 *
 * `must_change_password` is set on every account an admin creates or resets, and
 * this is what finally reads it — previously the flag was written and never
 * checked, so a temporary password handed out in person stayed valid forever.
 *
 * Changing the password revokes every token server-side, so there is no session
 * left to continue with: the only honest thing to do afterwards is send the user
 * back to log in with the credentials they just chose.
 */
export default function ChangePasswordPage() {
	const { user, logout } = useAuth();

	const [values, setValues] = useState({
		currentPassword: '',
		password: '',
		passwordConfirmation: '',
	});
	const [mismatch, setMismatch] = useState(false);

	// Deliberately no `onSuccess: logout()`. Clearing the session here would
	// unmount this page through the route guard before the confirmation could
	// render, so the local session is dropped when the user acknowledges it.
	// The server-side token is already revoked either way.
	const { mutate, isPending, isSuccess, error } = useMutation({
		mutationFn: changePasswordRequest,
	});

	const handleChange = (event) => {
		setValues((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
		setMismatch(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (values.password !== values.passwordConfirmation) {
			setMismatch(true);
			return;
		}

		mutate(values);
	};

	if (isSuccess) {
		return (
			<div className='m-auto flex h-screen max-w-96 flex-col items-center justify-center gap-6 px-5 text-center font-body'>
				<img
					src={logo}
					alt='School Logo'
					className='h-22.75 w-22.5 object-cover'
				/>
				<div
					role='status'
					className='flex flex-col gap-2 rounded-[10px] bg-green-50 px-4 py-4 text-sm text-green-800'
				>
					<p className='font-semibold'>Password updated</p>
					<p>Please sign in again with your new password.</p>
				</div>
				<button
					type='button'
					onClick={logout}
					className='w-full rounded-sm bg-brand-red py-3.5 text-sm text-white'
				>
					Go to login
				</button>
			</div>
		);
	}

	return (
		<div className='m-auto flex min-h-screen max-w-96 flex-col items-center justify-center gap-8 px-5 py-12 font-body'>
			<div className='flex flex-col items-center gap-6'>
				<img
					src={logo}
					alt='School Logo'
					className='h-22.75 w-22.5 object-cover'
				/>
				<div className='flex flex-col gap-2 text-center'>
					<h1 className='text-xl font-semibold text-black'>
						Choose a new password
					</h1>
					<p className='text-sm text-label'>
						You are signed in with a temporary password
						{user?.email ? ` for ${user.email}` : ''}. Set your own
						before continuing.
					</p>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className='flex w-full flex-col gap-6'
			>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-1.5'>
						<label
							htmlFor='current-password'
							className='text-xs font-medium text-dark'
						>
							Temporary password
						</label>
						<input
							id='current-password'
							name='currentPassword'
							type='password'
							required
							autoComplete='current-password'
							value={values.currentPassword}
							onChange={handleChange}
							className='rounded-sm border-brand bg-brand px-6 py-3 text-sm placeholder:text-[#808080] focus:border-brand-border'
						/>
					</div>

					<div className='flex flex-col gap-1.5'>
						<label
							htmlFor='new-password'
							className='text-xs font-medium text-dark'
						>
							New password
						</label>
						<input
							id='new-password'
							name='password'
							type='password'
							required
							autoComplete='new-password'
							value={values.password}
							onChange={handleChange}
							aria-describedby='new-password-help'
							className='rounded-sm border-brand bg-brand px-6 py-3 text-sm placeholder:text-[#808080] focus:border-brand-border'
						/>
						<p
							id='new-password-help'
							className='text-xs text-label'
						>
							At least 8 characters, and different from your
							temporary one.
						</p>
					</div>

					<div className='flex flex-col gap-1.5'>
						<label
							htmlFor='confirm-password'
							className='text-xs font-medium text-dark'
						>
							Confirm new password
						</label>
						<input
							id='confirm-password'
							name='passwordConfirmation'
							type='password'
							required
							autoComplete='new-password'
							value={values.passwordConfirmation}
							onChange={handleChange}
							className='rounded-sm border-brand bg-brand px-6 py-3 text-sm placeholder:text-[#808080] focus:border-brand-border'
						/>
					</div>

					{mismatch && (
						<p role='alert' className='text-xs text-red-500'>
							The two passwords do not match.
						</p>
					)}

					{error && !mismatch && (
						<p role='alert' className='text-xs text-red-500'>
							{getErrorMessage(error)}
						</p>
					)}
				</div>

				<button
					type='submit'
					disabled={isPending}
					className='w-full rounded-sm bg-brand-red py-3.5 text-sm text-white disabled:opacity-50'
				>
					{isPending ? 'Saving…' : 'Set new password'}
				</button>
			</form>

			<button
				type='button'
				onClick={logout}
				className='text-sm font-semibold text-brand-orange'
			>
				Sign out instead
			</button>
		</div>
	);
}
