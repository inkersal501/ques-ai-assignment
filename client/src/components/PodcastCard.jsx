import React from 'react'

function PodcastCard({title, icon, onClick}) {
  return (
    <div className='w-xs p-[10px] md:p-[20px] flex justify-between items-center gap-4 bg-white shadow-lg border border-[#ccc] rounded-lg'>
        <div className='w-[60%]'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
        </div> 
        <div className='w-[40%] flex justify-end'>
            <div onClick={onClick}>
                {icon}
            </div>
        </div>
    </div>
  )
}

export default PodcastCard;