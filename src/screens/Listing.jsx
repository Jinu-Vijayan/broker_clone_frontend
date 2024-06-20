import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';

const Listing = () => {

    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
                </>
            )
        }
    </main>
  )
}

export default Listing