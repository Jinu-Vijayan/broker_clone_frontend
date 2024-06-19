import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { SIGNIN_START, SIGNIN_FAILE, SIGNIN_SUCCESS } from '../redux/slice/userSlice';

const Signin = () => {

    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const {loading, error} = useSelector(state => state.user)
    const navigate = useNavigate();

    const dispatch = useDispatch();

    async function submitHanler(e){
        e.preventDefault();

        try{

            const newUser = {
                email : emailRef.current.value,
                password : passwordRef.current.value
            };
    
            dispatch(SIGNIN_START());
    
            const res = await fetch("/api/auth/Signin",{
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(newUser)
            })
    
            const data = await res.json();
            
            if(data.success === false){
                dispatch(SIGNIN_FAILE(data.message));
                return;
            }
    
            dispatch(SIGNIN_SUCCESS(data))
            navigate("/");

        }catch(error){

            dispatch(SIGNIN_FAILE(error.message));
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