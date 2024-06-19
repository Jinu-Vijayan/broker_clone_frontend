import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const {currentUser} = useSelector(state => state.user);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' className='p-3 border rounded-lg' placeholder='userName' id='userName'/>
        <input type='email' className='p-3 border rounded-lg' placeholder='email' id='email'/>
        <input type='text' className='p-3 border rounded-lg' placeholder='password' id='password'/>
        <button className='bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:opacity-85'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">sign out</span>
      </div>
    </div>
  )
}

export default Profile