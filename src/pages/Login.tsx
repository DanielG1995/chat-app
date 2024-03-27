import { Link, useNavigate } from 'react-router-dom';
import useChatStore from '../store/store';
import { privateApi, publicApi } from '../api/api';
import { useEffect, useRef } from 'react';
import { getTokenFromCookie, saveTokenToCookie } from '../utlis/helpers';


export const Login = () => {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)
  const { setLoading } = useChatStore()
  const { setUserId } = useChatStore()
  useEffect(() => {
    if (getTokenFromCookie() === '') return
    const checkToken = async () => {
      setLoading(true);
      try {
        const hasAuth = await privateApi('/auth/verify-token');
        if (hasAuth.data === true) return navigate('/')
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    checkToken();
  }, [])

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    evt.preventDefault()
    try {
      const formData = new FormData(formRef.current!)

      const resp = await publicApi('/auth/login',
        {
          email: formData.get('email') as string,
          password: formData.get('password') as string
        })
      if (resp?.data?.token) {
        saveTokenToCookie(resp?.data?.token)
        setUserId(resp?.data?.id)
        navigate('/')
      }
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form ref={formRef} onSubmit={handleSubmit}>
        <section className="w-[500px] rounded-3xl shadow-lg flex flex-col gap-5 p-5">
          <span>Login</span>
          <p>Email</p>
          <input name='email' />
          <p>Password</p>
          <input type='password' name='password' />
          <button type='submit' className="shadow-lg rounded-[20px] bg-slate-300 py-5">Login</button>
          <Link className='text-blue-400 underline text-center cursor-pointer' to={'/register'} >Registrarse</Link>
        </section>
      </form>
    </div>
  )
}
