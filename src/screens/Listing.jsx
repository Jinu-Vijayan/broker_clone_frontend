import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

const Listing = () => {

    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const {currentUser} = useSelector(state => state.user);

    useEffect(()=>{

        async function fetchListing(){
    
            try{

                setLoading(true);

                const listingId = params.id;
            
                const res = await fetch(`/api/listing/get/${listingId}`);
                const data = await res.json();
        
                if(data.success === false){
                    setLoading(false);
                    setError(true);
                    return console.log(data.message);
                }
        
                setListing(data.data);
                setLoading(false);
                setError(false);

            } catch(err){

                setError(true);
                setLoading(false);

            }
    
        }
    
        fetchListing();
    
      },[params.id])

  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl text-red-700'>Something went wrond</p>}
        {
            listing && !loading && !error && (
                <>
                    <Swiper navigation>
                        {
                            listing.imageUrls.map((url, index) => {
                                return(
                                    <SwiperSlide key={index}>
                                        <div className='h-[500px]' style={{
                                            background : `url(${url}) center no-repeat`,
                                            backgroundSize : "cover"
                                        }}>

                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                        <FaShare
                        className='text-slate-500'
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => {
                            setCopied(false);
                            }, 2000);
                        }}
                        />
                    </div>
                    {copied && (
                        <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                        Link copied!
                        </p>
                    )}
                    <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                        <p className='text-2xl font-semibold'>
                            {listing.name} - ${' '}
                            {
                                listing.offer
                                    ? listing.discountedPrice
                                    : listing.regularPrice
                            }
                            {listing.type === 'rent' && ' / month'}
                        </p>
                        <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                            <FaMapMarkerAlt className='text-green-700' />
                            {listing.address}
                        </p>
                        <div className='flex gap-4'>
                            <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                            </p>
                            {listing.offer && (
                                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                ${+listing.regularPrice - +listing.discountedPrice} OFF
                                </p>
                            )}
                        </div>
                        <p className='text-slate-500'> <span className='font-semibold text-black '>Description - {" "}</span>
                            {
                                listing.description
                            }
                        </p>
                        <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaBed className='text-lg'/>
                                {
                                    listing.bedRooms > 1 ? <p>{listing.bedRooms} beds</p> : <p>{listing.bedRooms} bed</p>
                                }
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaBath className='text-lg'/>
                                {
                                    listing.bathRooms > 1 ? <p>{listing.bathRooms} bath rooms</p> : <p>{listing.bathRooms} bath</p>
                                }
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaParking className='text-lg'/>
                                {
                                    listing.parking ? "Parking spot" : "No parking spot"
                                }
                            </li>
                            <li className='flex items-center gap-1 whitespace-nowrap '>
                                <FaChair className='text-lg'/>
                                {
                                    listing.furnished > 1 ? "Furnished" : "Not Furnished"
                                }
                            </li>
                        </ul>
                        {
                            // !contact && (
                            //     <button onClick={()=>{
                            //         setContact(true)
                            //     }} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>Contact Landlord</button>
                            // )
                            currentUser && listing.userRef !== currentUser._id && !contact && (
                                <button onClick={()=>{
                                    setContact(true)
                                }} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>Contact Landlord</button>
                            )
                        }
                        {
                            contact && <Contact listing = {listing} />
                        }
                    </div>
                </>
            )
        }
    </main>
  )
}

export default Listing