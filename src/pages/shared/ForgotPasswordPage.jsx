import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import logo from '../../assets/images/portal-logo.png';
import { requestPasswordReset } from '../../api/auth';
import { getErrorMessage } from '../../utils/getErrorMessage';

/**
 * Password recovery without a mail service.
 *
 * The portal cannot send a reset link, so this does not pretend to. Submitting
 * flags the account for an administrator, who issues a new temporary password
 * and passes it on through whatever channel the school already uses. Saying so
 * plainly matters: a user told to "check your email" would wait for a message
 * that is never coming.
 */
export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('');

	const { mutate, isPending, isSuccess, error } = useMutation({
		mutationFn: requestPasswordReset,
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		mutate(email);
	};

	return (
		<div className='m-auto flex h-screen max-w-96 flex-col items-center justify-center gap-8 px-5 py-12 font-body'>
			<div className='flex flex-col items-center gap-6'>
				<img
					src={logo}
					alt='School Logo'
					className='h-22.75 w-22.5 object-cover'
				/>
				<div className='flex flex-col gap-2 text-center'>
					<h1 className='text-xl font-semibold text-black'>
						Forgot your password?
					</h1>
					<p className='text-sm text-label'>
						Password resets are handled by your department
						administrator. Enter your school email and they will be
						asked to issue you a new one.
					</p>
				</div>
			</div>

			{isSuccess ? (
				<div
					role='status'
					className='flex w-full flex-col gap-3 rounded-[10px] bg-green-50 px-4 py-4 text-sm text-green-800'
				>
					<p className='font-semibold'>Request sent</p>
					<p>
						If that email matches an account, your administrator has
						been notified. They will give you a temporary password —
						you will be asked to change it as soon as you sign in.
					</p>
					<p className='text-xs'>
						You will not receive an email. If you need this
						urgently, contact your department office directly.
					</p>
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					className='flex w-full flex-col gap-6'
				>
					<div className='flex flex-col gap-3'>
						<label htmlFor='email' className='sr-only'>
							Email address
						</label>
						<input
							id='email'
							name='email'
							type='email'
							required
							autoComplete='email'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder='Email'
							aria-describedby={error ? 'reset-error' : undefined}
							className='rounded-sm border-brand bg-brand px-6 py-3 text-sm placeholder:text-[#808080] focus:border-brand-border'
						/>

						{error && (
							<p
								id='reset-error'
								role='alert'
								className='text-center text-xs text-red-500'
							>
								{getErrorMessage(error, {
									429: 'Too many requests. Please wait a minute and try again.',
								})}
							</p>
						)}
					</div>

					<button
						type='submit'
						disabled={isPending}
						className='w-full rounded-sm bg-brand-red py-3.5 text-sm text-white disabled:opacity-50'
					>
						{isPending ? 'Sending…' : 'Request password reset'}
					</button>
				</form>
			)}

			<Link
				to='/login'
				className='text-sm font-semibold text-brand-orange'
			>
				Back to login
			</Link>
		</div>
	);
}
