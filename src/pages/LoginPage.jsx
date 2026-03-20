import { useState } from 'react'
import logo from '../assets/images/portal-logo.png'

export default function LoginPage(){
    const [values, setValues] = useState({ sid: '', password: '' })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // const res = await api.post('/api/login', values)
            // localStorage.setItem('token', res.data.token)
            navigate('/')
        } catch (err) {
            setError('Invalid email or password.')
        } finally {
            setLoading(false)
        }
    }
    return(
        <main className='flex flex-col items-center max-w-80 px-5 py-12 m-auto font-body gap-11'>
            <div className='flex flex-col gap-8 items-center'>
                <img 
                    src={logo} 
                    alt='School Logo' 
                    className='w-22.5 h-22.75'
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
                            type='text'
                            name='sid'
                            placeholder='Student ID'
                            value={values.sid}
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
                    {error && (
                        <p className="text-red-500 text-xs text-center">{error}</p>
                    )}
                    <button className='text-right text-sm font-semibold text-[#FE6201]'>Forgot Password?</button>
                </div>
                <button 
                    type='submit'
                    disabled={loading}
                    className='w-full py-3.5 bg-[#940002] rounded-sm text-white text-sm'
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
        </main> 
    )
}