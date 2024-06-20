import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {DELETE_USER_FAIL, DELETE_USER_START, DELETE_USER_SUCCESS, SIGN_OUT_USER_FAIL, SIGN_OUT_USER_START, SIGN_OUT_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_START, UPDATE_USER_SUCCESS} from '../redux/slice/userSlice.js'
import { Link } from 'react-router-dom';

const Profile = () => {

  const {currentUser, loading, error} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [updateSuccess , setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingError] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [userList, setUserList] = useState([]);

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

  async function handleSignout(){
    try{

      dispatch(SIGN_OUT_USER_START())

      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if(data.success === false){

        dispatch(SIGN_OUT_USER_FAIL(data.message))
        return;

      }

      dispatch(SIGN_OUT_USER_SUCCESS())
    }catch(err){
      dispatch(SIGN_OUT_USER_FAIL(data.message))
    }
  }

  async function handleShowListings(){
    try{
      setListLoading(true);
      setShowListingError(false);

      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();

      if(data.success === false){
        setListLoading(false);
        setShowListingError(true);
        return;
      }

      setListLoading(false);
      setUserList(data.data);

    }catch(err){
      setShowListingError(true);
      setListLoading(false);
    }
  }

  async function handleListingDelete(id){
    try{


      const res = await fetch(`/api/listing/delete/${id}`,{
        method : "DELETE"
      });

      const data = await res.json();
      // console.log(data);
      if(data.success === false){
        console.log(data.message);
        return;
      }

      setUserList((prev) => prev.filter(elem => {

        return elem._id != id;

      }));

    }catch(err){
      console.log(err.message);
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
        <Link to={'/createListing'} className='text-white bg-green-700 p-3 rounded-lg uppercase text-center hover:opacity-95'>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete account</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ""}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? "User is updated successfully" : ""}</p>
      <button className='text-green-700 w-full' onClick={handleShowListings}>Show Listings</button>
      <p className='text-green-700 mt-5 w-full text-sm text-center'>{listLoading && "Loading..."}</p>
      <p className='text-red-700 text-sm mt-5'>{showListingsError && "Error showing list data"}</p>

      {
        userList.length > 0 && (
          <div className='flex flex-col gap-4'>
            <h2 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h2>
            {
              userList.map((elem)=>{
                return(
                  <div key={elem._id} className='flex border rounded-lg p-3 justify-between items-center gap-4'>
                    <Link to={`/listing/${elem._id}`}>
                      <img className='h-16 w-16 object-contain' src={elem.imageUrls[0]} alt='image of the property'/>
                    </Link>
                    <Link className='flex-1 text-slate-700 font-semibold hover:underline truncate' to={`/listing/${elem._id}`}>
                      <p>{elem.name}</p>
                    </Link>
                    <div className='flex flex-col items-center'>
                      <button className='text-red-700 uppercase' onClick={(e)=>{
                        handleListingDelete(elem._id);
                      }} >Delete</button>
                      <button className='text-green-700 uppercase' >Edit</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default Profile