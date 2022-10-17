import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";


const Movie = ({ url, name, rating }) => {

    let [ratingArr, setRatingArr] = useState([])

    useEffect(() => {
        let tempRatingArr = []

        for (var i = 0; i < rating; i++) {
            tempRatingArr.push(1)
        }

        for (var i = 0; i < (5 - rating); i++) {
            tempRatingArr.push(0)
        }

        setRatingArr(tempRatingArr)
    }, [])

    return (
        <div>
            <div className='relative h-0 pb-3/2'>
                <img className='absolute inset-0 w-full h-full' src={url} />
            </div>
            <div className='bg-slate-700 pb-4 pt-2 px-4 rounded-b'>
                <p className='text-xl font-semibold text-gray-200 mb-1'>{name}</p>
                <div className='flex mb-4'>
                    {
                        ratingArr.map((star, index) => {
                            if (star == 1) {
                                return (
                                    <FaStar
                                        color="orange" size={20} />
                                )
                            } else {
                                return (
                                    <FaStar
                                        color="lightgray" size={20} />
                                )
                            }
                        })
                    }
                </div>
                <div className='border border-gray-200 text-center text-blue-400 text-semibold rounded mt-2 cursor-pointer py-2 hover:bg-gray-200 hover:text-slate-700'>
                    <p>Watchlist</p>
                </div>
            </div>
        </div>
    )
}

export default Movie