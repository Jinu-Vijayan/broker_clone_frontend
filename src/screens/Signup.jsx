import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

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
                userName : userNameRef.current.value,
                email : emailRef.current.value,
                password : passwordRef.current.value
            };
    
            setLoading(true);
    
            const res = await fetch("/api/auth/signup",{
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
            navigate("/signin");

        }catch(error){

            setError(error.message);
            setLoading(false);

        }
    }

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>SignUP</h1>
        <form onSubmit={submitHanler} className='flex flex-col gap-4 '>
            <input type='text' placeholder='userName' className='border rounded-lg p-3' id='userName' ref={userNameRef} />
            <input type='email' placeholder='email' className='border rounded-lg p-3' id='email' ref={emailRef} />
            <input type='password' placeholder='password' className='border rounded-lg p-3' id='password' ref={passwordRef} />
            <button disabled = {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>
                {loading ? "loading..." : "Sign up"}
            </button>
        </form>
        <div className='flex gap-2 mt-5'>
            <p>Have an account?</p>
            <Link to={'/signin'}>
                <span className='text-blue-700'>Sign in</span>
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

export default Signup