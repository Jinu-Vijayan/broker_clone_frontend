import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {DELETE_USER_FAIL, DELETE_USER_START, DELETE_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_START, UPDATE_USER_SUCCESS} from '../redux/slice/userSlice.js'

const Profile = () => {

  const {currentUser, loading, error} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [updateSuccess , setUpdateSuccess] = useState(false);

  async function submitHanlder(e){
    e.preventDefault();
    const newData = {
      userName : userNameRef.current.value,
      email : emailRef.current.value
    }

    if(passwordRef.current.value !== ""){
      newData.password = passwordRef.current.value
    }

    console.log(newData);

    try{
      dispatch(UPDATE_USER_START());

      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method : 'POST',
        headers : {
          "content-type" : 'application/json'
        },
        body : JSON.stringify(newData)
      });

      const data = await res.json();

      if(data.success === false) {
        dispatch(UPDATE_USER_FAIL(data.message));
        return;
      }

      dispatch(UPDATE_USER_SUCCESS(data));
      setUpdateSuccess(true);

    }catch(err){
      dispatch(UPDATE_USER_FAIL(err.message));
    }

  }

  async function handleDeleteUser(){
    try{
      
      dispatch(DELETE_USER_START());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method : "DELETE",
      });

      const data = await res.json();

      if(data.success === false){
        dispatch(DELETE_USER_FAIL(data.message));
        return;
      }

      dispatch(DELETE_USER_SUCCESS(data));
      
    }catch(err){
      dispatch(DELETE_USER_FAIL(err.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form onSubmit={submitHanlder} className='flex flex-col gap-4'>
        <input ref={userNameRef} type='text' className='p-3 border rounded-lg' placeholder='userName' id='userName' defaultValue={currentUser.userName}/>
        <input ref={emailRef} type='email' className='p-3 border rounded-lg' placeholder='email' id='email' defaultValue={currentUser.email}/>
        <input ref={passwordRef} type='password' className='p-3 border rounded-lg' placeholder='password' id='password' defaultValue={""}/>
        <button disabled = {loading} className='bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:opacity-85'>
          {
            loading ? "Loading..." : "Update"
          }
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete account</span>
        <span className="text-red-700 cursor-pointer">sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ""}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? "User is updated successfully" : ""}</p>
    </div>
  )
}

export default Profile