import React from 'react'

const Card = ({ labelName, type, name, placeholder, value, doWhat, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex item-center gap-3 mb-5'>
        <label htmlFor={name} className='block py-2  font-semibold text-md text-gray-800'>
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            className=' ml-5 font-semibold text-[#150dff] px-2 rounded-[5px] bg-gray-200 active:bg-green-500 hover:bg-[red] hover:text-white'
          >Surprise Me</button>
        )}
      </div>
      <div className='flex gap-5 h-15'>
        
        {type === 'textarea' ? (
          <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required
            className='flex-grow border min-h-[100px] w-full xs:h-20 border-gray-300 px-3 py-2 rounded-md focus:border-[#150dff]'
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
            className='flex-grow border w-full  border-gray-300 px-3 py-2 rounded-md focus:border-[#150dff]'
          />
        )}
        {doWhat ? (<button
          type='submit'
          className='bg-[#4b51ff]  hover:bg-[#3239ff] active:bg-[black] text-white px-4 py-2 rounded-md'
        >{doWhat}</button>) : (<></>)}
      </div>
    </div>
  )
}

export default Card