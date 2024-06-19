import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {

    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error,setError] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    async function submitHanler(e){
        e.preventDefault();

        try{

            const newUser = {
                email : emailRef.current.value,
                password : passwordRef.current.value
            };
    
            setLoading(true);
    
            const res = await fetch("/api/auth/Signin",{
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(newUser)
            })
    
            const data = await res.json();
            
            if(data.success === false){
                setError(data.message);
                setLoading(false);
                return;
            }
    
            setLoading(false);
            setError(null);
            navigate("/");

        }catch(error){

            setError(error.message);
            setLoading(false);

        }
    }

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Signin</h1>
        <form onSubmit={submitHanler} className='flex flex-col gap-4 '>
            <input type='email' placeholder='email' className='border rounded-lg p-3' id='email' ref={emailRef} />
            <input type='password' placeholder='password' className='border rounded-lg p-3' id='password' ref={passwordRef} />
            <button disabled = {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>
                {loading ? "loading..." : "Sign up"}
            </button>
        </form>
        <div className='flex gap-2 mt-5'>
            <p>Dont have an account?</p>
            <Link to={'/signup'}>
                <span className='text-blue-700'>Sign up</span>
            </Link>
        </div>
        {
            error && (
                <p className='text-red-500 mt-5'>{error}</p>
            )
        }
    </div>
  )
}

export default Signin