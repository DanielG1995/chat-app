import { Link, useNavigate } from 'react-router-dom';
import useChatStore from '../store/store';


export const Register = () => {
  const navigate = useNavigate()
  const { setLoading } = useChatStore()
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    evt.preventDefault()
    setTimeout(() => {
      navigate('/')
      setLoading(false)

    }, 5000);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <section className="w-[500px] rounded-3xl shadow-lg flex flex-col gap-5 p-5">
          <span>Register</span>
          <p>Name</p>
          <input />
          <p>Email</p>
          <input />
          <p>Password</p>
          <input />
          <button type='submit' className="shadow-lg rounded-[20px] bg-slate-300 py-5">Register</button>
          <Link className='text-blue-400 underline text-center cursor-pointer'  to={'/login'} >Login</Link>
        </section>
      </form>
    </div>
  )
}
