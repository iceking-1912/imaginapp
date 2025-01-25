import React from 'react'

const Card = ({ labelName, type, name, placeholder, value, doWhat, handleChange, isSurpriseMe, handleSurpriseMe, dospecify }) => {

  const Specification = {
    width: 0,
    height: 0,
    seed: Math.floor(Math.random() * 100000000000)
  }


  return (
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
            flex-grow border sm:min-h-[200px] lg:min-h-96 w-full xs:h-20 border-gray-300 px-3 py-2 rounded-md focus:border-[#150dff]'
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
        {/* <div className='grid grid-flow-col gap-10 p-5' > */}
        {/* <div> */}
          {dospecify && (
            (Object.keys(Specification).forEach((key) => {
              <input
                // key={key}
                type='text'
                name='specify'
                // id={key}
                placeholder="hi"
                value={key}
                className='border w-full mt-5 border-gray-300 px-3 py-2
                    rounded-md focus:border-[#150dff] backdrop-blur-lg text-black
                    placeholder:text-gray-700 bg-white bg-opacity-25 shadow-xl'
              />
            }))
          )}
        {/* </div> */}
        {doWhat && (
          <button
            type='submit'
            className='bg-[#0e16ff] hover:shadow-white active:bg-[black] text-white px-4 py-2 rounded-md'
          >
            {doWhat}
          </button>
        )}
      </div>
    </div >
  )
}

export default Card