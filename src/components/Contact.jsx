import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {

    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState("")

    useEffect(()=>{

        async function fetchData(){
            
            try{
                
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();

                if(data.success === false){
                    console.log(data.message);
                }

                setLandlord(data.userData);

            }catch(err){
                console.log(err)
            }

        }

        fetchData();

    },[listing.userRef])

    function handleChange(e){
        setMessage(e.target.value);
    }

  return (
    <>
        {
            landlord && (
                <div className='flex flex-col gap-2'>
                    <p>Contact <span className='font-semibold'>{landlord.userName}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                    <textarea name='message' id='message' rows={2} value={message} onChange={handleChange} placeholder='Enter your message here...' className='w-full border p-3 rounded-lg'></textarea>
                    <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-center text-white p-3 uppercase rounded-lg hover:opacity-95' >Send Message</Link>
                </div>
            )
        }
    </>
  )
}

export default Contact