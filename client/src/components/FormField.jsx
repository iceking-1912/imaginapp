import React from 'react'

const Card = ({ prompt ,labelName, type, name, placeholder, value, doWhat, handleChange, isSurpriseMe, handleSurpriseMe, dospecify, width, height, seed }) => {


  return (
    <>
      {prompt ? (
      <div>
        <div className='flex item-center gap-3 mb-5'>
          <label htmlFor={name} className='block py-2 font-semibold text-md text-gray-800'>
            {labelName}
          </label>
          {isSurpriseMe && (
            <button
              type='button'
              onClick={handleSurpriseMe}
              className='ml-5 font-semibold text-[#150dff] px-2 rounded-[5px] bg-gray-200 active:bg-green-500 hover:bg-[red] hover:text-white'
            >
              Surprise Me
            </button>
          )}
        </div>
        <div className='flex-row gap-5 h-15'>
          {type === 'textarea' ? (
            <textarea
              name={name}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              required
              className='backdrop-blur-lg bg-white bg-opacity-25 shadow-xl text-black placeholder:text-gray-800
            flex-grow border sm:min-h-[200px] lg:min-h-46 w-full xs:h-20 border-gray-300 px-3 py-2 rounded-md focus:border-[#150dff]'
            />
          ) : (
            <input
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              required
              className='backdrop-blur-lg text-black placeholder:text-gray-700 bg-white bg-opacity-25 shadow-xl border w-[calc(100%-110px)]
            xs:min-w-[calc(100%-110px)] mr-4 border-gray-100 px-3 py-2 rounded-md focus:border-[#150dff]'
            />
          )}
          {doWhat && (
            <button
              type='submit'
              className='bg-[#0e16ff] hover:shadow-white active:bg-[black] text-white px-4 py-2 rounded-md'
            >
              {doWhat}
            </button>
          )}
        </div></div >
      ) : (<></>)
      }

      {
        dospecify && (
          // (Object.keys(Specification).forEach((key) => {
          <div className='grid grid-cols-2 gap-5' >
            
            <div className='col-span-1'><label htmlFor={name} className='w-full'>
              Width
            </label>
            <input
              type='Number'
              name="width"
              id="width"
              placeholder={width}
              value={width}
              onChange={handleChange}
              className='border w-full mt-4 border-gray-300 px-3 py-2
                    rounded-md focus:border-[#150dff] backdrop-blur-lg text-black
                    placeholder:text-gray-700 bg-white bg-opacity-25 shadow-2xl'
              />
            </div>
            <div className='col-span-1'>
              <label htmlFor={name} className='w-full'>
                Height
              </label>
            <input
              type='Number'
              name="height"
              id="height"
              placeholder={height}
              value={height}
              onChange={handleChange}
              className='border w-full mt-5 border-gray-300 px-3 py-2
                      rounded-md focus:border-[#150dff] backdrop-blur-lg text-black
                      placeholder:text-gray-700 bg-white bg-opacity-25 shadow-2xl'
              />
              </div>
            <div className='col-span-2'>
              <label htmlFor={name} className='w-full'>
                Seed
              </label>
            <input
              type='number'
              name='seed'
              id="seed"
              placeholder={seed}
              value={seed}
              onChange={handleChange}
              className='border w-full mt-5 border-gray-300 px-3 py-2
                    rounded-md focus:border-[#150dff] backdrop-blur-lg text-black
                    placeholder:text-gray-700 bg-white bg-opacity-25 shadow-2xl'
              />
              </div>
          </div>
        )
      }
    </>
  )
}

export default Card

