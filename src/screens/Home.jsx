import React, { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Home = () => {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(()=>{

    async function fetchOfferListings(){

      try{

        const res = await fetch(`/api/listing/get?limit=4&offer=true`);
        const data = await res.json();
        setOfferListings(data.data);

        fetchRentListings();

      }catch(err){
        console.log(err);
      }
    }

    async function fetchRentListings(){

      try {
        
        const res = await fetch(`/api/listing/get?limit=4&type=rent`);
        const data = await res.json();
        setRentListings(data.data);

        fetchSaleListings();

      } catch (err) {
        console.log(err);
      }
    }

    async function fetchSaleListings(){

      try {
        
        const res = await fetch(`/api/listing/get?limit=4&type=sell`);
        const data = await res.json();
        setSaleListings(data.data);

      } catch (err) {
        console.log(err);
      }
    }

    fetchOfferListings()

  },[])

  return (
    <div>
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span> <br/> place with ease</h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let,s get started
        </Link>
      </div>

      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 && (
            offerListings.map((listItem)=>{
              return (
                <SwiperSlide>
                  <div className='h-[500px]' key={listItem._id} style={{
                    background : `url(${listItem.imageUrls[0]}) center no-repeat`,
                    backgroundSize : `cover`
                  }}></div>
                </SwiperSlide>
              )
            })
          )
        }
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                <Link to={`/search?offer=true`} className='text-sm text-blue-800 hover:underline'>
                  Show more offers
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  offerListings.map((listItem)=>{
                    return (
                      <ListingCard key={listItem._id} listItem={listItem}/>
                    )
                  })
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link to={`/search?type=rent`} className='text-sm text-blue-800 hover:underline'>
                  Show more places for rent
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  rentListings.map((listItem)=>{
                    return (
                      <ListingCard key={listItem._id} listItem={listItem}/>
                    )
                  })
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                <Link to={`/search?type=sell`} className='text-sm text-blue-800 hover:underline'>
                  Show more places for sale
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  saleListings.map((listItem)=>{
                    return (
                      <ListingCard key={listItem._id} listItem={listItem}/>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home