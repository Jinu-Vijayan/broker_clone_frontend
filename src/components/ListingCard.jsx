import React from 'react'
import { MdLocationOn } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ListingCard = ({listItem}) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <Link to={`/listing/${listItem._id}`}>
            <img src={listItem.imageUrls[0]} alt='listItem image' className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='text-lg font-semibold text-slate-700 truncate w-' >{listItem.name}</p>
                <div className='flex items-center gap-1'>
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className='truncate text-sm text-gray-600 w-full'>{listItem.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>{listItem.description}</p>
                <p className='text-slate-500 mt-2 font-semibold'>
                    $
                    {
                        listItem.offer ? listItem.discountedPrice : listItem.regularPrice
                    }
                    {
                        listItem.type === "rent" && '/month'
                    }
                </p>
                <div className='text-slate-700 flex gap-4'>
                    <div className='font-bold text-xs '>
                        {
                            listItem.bedRooms > 1 ? `${listItem.bedRooms} beds` : `${listItem.bedRooms} bed`
                        }
                    </div>
                    <div className='font-bold text-xs '>
                        {
                            listItem.bathRooms > 1 ? `${listItem.bathRooms} baths` : `${listItem.bathRooms} bath`
                        }
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ListingCard